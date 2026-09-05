import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import qrcode from "qrcode-terminal";

const root = process.cwd();
const cacheDir = path.join(root, ".cache/bilibili");
const profileDir = path.join(cacheDir, "profile");
const statePath = path.join(cacheDir, "storage-state.json");

await fs.mkdir(cacheDir, { recursive: true });
const context = await chromium.launchPersistentContext(profileDir, {
  headless: true,
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
  locale: "zh-CN",
});

try {
  const page = context.pages()[0] || await context.newPage();

  if (await isLoggedIn(context)) {
    await saveState(context);
    console.log("B站登录状态仍然有效。");
    process.exitCode = 0;
  } else {
    const generated = await bilibiliJson("https://passport.bilibili.com/x/passport-login/web/qrcode/generate");
    const loginUrl = generated.data?.url;
    const qrcodeKey = generated.data?.qrcode_key;
    if (!loginUrl || !qrcodeKey) throw new Error("B站未返回二维码登录信息");

    console.log("请使用哔哩哔哩手机客户端扫描以下字符二维码：\n");
    qrcode.generate(loginUrl, { small: true });
    console.log(`\n手机无法扫描终端时，可在手机浏览器打开一次性链接：\n${loginUrl}\n`);

    for (let attempt = 0; attempt < 180; attempt += 1) {
      const polled = await bilibiliJson(`https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${encodeURIComponent(qrcodeKey)}`);
      const status = polled.data?.code;

      if (status === 0 && polled.data?.url) {
        const cookies = (polled.setCookies || []).map(parseSetCookie).filter(Boolean);
        if (cookies.length > 0) await context.addCookies(cookies);
        await page.goto("https://www.bilibili.com", { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.waitForTimeout(2000);
        if (!await isLoggedIn(context)) throw new Error("B站已确认扫码，但浏览器会话未建立");
        await saveState(context);
        await page.goto("https://member.bilibili.com/platform/home", { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
        console.log("B站扫码登录成功，会话已安全保存到本机缓存。");
        break;
      }

      if (status === 86038) throw new Error("二维码已过期，请重新运行登录命令");
      if (status === 86090 && attempt % 5 === 0) console.log("已扫码，等待手机端确认……");

      if (attempt === 179) throw new Error("等待扫码登录超时，请重新运行登录命令");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
} finally {
  await context.close();
}

async function isLoggedIn(context) {
  const cookies = await context.cookies("https://www.bilibili.com");
  return cookies.some((cookie) => cookie.name === "SESSDATA" && cookie.value);
}

async function saveState(context) {
  await context.storageState({ path: statePath });
}

async function bilibiliJson(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
      referer: "https://passport.bilibili.com/login",
    },
  });
  const data = await response.json();
  if (!response.ok || data.code !== 0) throw new Error(`B站登录接口失败: ${data.message || response.status}`);
  return { ...data, setCookies: response.headers.getSetCookie?.() || [] };
}

function parseSetCookie(value) {
  const parts = value.split(";").map((part) => part.trim());
  const separator = parts[0].indexOf("=");
  if (separator <= 0) return null;
  const cookie = {
    name: parts[0].slice(0, separator),
    value: parts[0].slice(separator + 1),
    domain: ".bilibili.com",
    path: "/",
  };

  for (const attribute of parts.slice(1)) {
    const [rawName, ...rawValue] = attribute.split("=");
    const name = rawName.toLowerCase();
    const attributeValue = rawValue.join("=");
    if (name === "domain" && attributeValue) cookie.domain = attributeValue.startsWith(".") ? attributeValue : `.${attributeValue}`;
    if (name === "path" && attributeValue) cookie.path = attributeValue;
    if (name === "expires" && attributeValue) cookie.expires = Math.floor(new Date(attributeValue).getTime() / 1000);
    if (name === "secure") cookie.secure = true;
    if (name === "httponly") cookie.httpOnly = true;
    if (name === "samesite" && /^(Strict|Lax|None)$/i.test(attributeValue)) {
      cookie.sameSite = `${attributeValue[0].toUpperCase()}${attributeValue.slice(1).toLowerCase()}`;
    }
  }

  return cookie;
}
