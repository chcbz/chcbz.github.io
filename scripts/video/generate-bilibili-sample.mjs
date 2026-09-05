import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { EdgeTTS, Constants } from "@andresaya/edge-tts";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const articleId = "202608170000";
const cacheDir = path.join(root, ".cache/video", articleId);
const outputDir = path.join(root, "output/video", articleId);
const fontPath = path.join(root, ".cache/video/fonts/NotoSansCJKsc-Regular.otf");
const coverPath = path.join(root, `docs/article/2026/assets/${articleId}/wechat-cover.jpg`);
const videoPath = path.join(outputDir, `${articleId}-bilibili-sample.mp4`);
const subtitlePath = path.join(outputDir, `${articleId}-bilibili-sample.srt`);
const bilibiliCoverPath = path.join(outputDir, `${articleId}-bilibili-cover.jpg`);
const metadataPath = path.join(outputDir, `${articleId}-bilibili-metadata.json`);

const scenes = [
  {
    eyebrow: "网络工程实践",
    title: "从 ipset 到 Xray",
    subtitle: "vpn.chcbz.net 抗干扰网络的演进",
    narration: "一套可靠的远程接入网络，从来不只是选择一个所谓最强协议。域名、TLS、反向代理、传输层、客户端、DNS、路由和运维，共同决定它能否长期稳定。今天用两分钟，回顾 vpn.chcbz.net 从 ipset 到 Xray 的演进。",
    kind: "cover",
  },
  {
    eyebrow: "演进主线",
    title: "每一代方案，都在回答一个新问题",
    narration: "最初使用 ipset，是为了解决哪些流量需要分流。随后采用 L2TP，获得系统级接入体验。strongSwan 带来了更标准的认证体系，WireGuard 则追求简单和高性能。最后选择 Xray，是为了在复杂网络里获得更灵活的传输外观和策略编排能力。",
    kind: "timeline",
  },
  {
    eyebrow: "方案取舍",
    title: "没有全能协议，只有场景匹配",
    narration: "IPsec 的优势是标准、安全和企业生态，但协议特征明显，配置也较复杂。WireGuard 性能优秀、漫游体验好，却依赖 UDP，缺少传输伪装。Xray 的运维成本更高，但协议、传输、路由和 DNS 都可以组合，更适合需要持续演进的复杂环境。",
    kind: "comparison",
  },
  {
    eyebrow: "当前拓扑",
    title: "HTTPS 入口与 Xray 解耦",
    narration: "当前链路由客户端访问四四三端口，Nginx 负责 TLS 和 HTTP 入口，再通过 WebSocket 转发到本机 Xray。Xray 使用 VLESS 入站，并根据规则选择 direct 或 block 出站。这样既能复用现有证书和日志体系，也为后续替换传输层保留空间。",
    kind: "topology",
  },
  {
    eyebrow: "核心价值",
    title: "Xray 更像一个可组合的网络框架",
    narration: "Xray 的关键不是单一协议，而是可组合。协议层可以切换 VLESS、Trojan 或 Shadowsocks；传输层可以使用 WebSocket、gRPC、XHTTP 或其他方案；路由、DNS 和多出口也可以独立演进。变化发生在局部，而不是每次推翻整套系统。",
    kind: "layers",
  },
  {
    eyebrow: "工程边界",
    title: "灵活性会带来新的复杂度",
    narration: "选择 Xray 并不意味着问题消失。证书续期、客户端兼容、DNS 泄漏、路由规则、日志轮转、密钥管理和版本升级，都需要持续维护。真正可靠的系统，依靠的是可观察、可回滚和可替换，而不是一次性的配置成功。",
    kind: "tradeoffs",
  },
  {
    eyebrow: "运维清单",
    title: "把稳定性落实到日常检查",
    narration: "日常运维至少要检查证书有效期、服务状态、监听端口、访问和错误日志、客户端连通性、DNS 解析路径以及配置备份。升级前保留旧版本和配置，先验证再切换。密钥和用户标识也应该定期轮换，避免长期不变。",
    kind: "checklist",
  },
  {
    eyebrow: "结论",
    title: "架构演进，比追逐最强协议更重要",
    subtitle: "完整文章：blog.chcbz.net",
    narration: "从 ipset 到 Xray，这条路线体现的不是新技术取代旧技术，而是目标不断变化。先明确场景，再选择协议，并为下一次变化保留空间，才是网络架构长期稳定的关键。完整实践文章可以在 blog.chcbz.net 查看。",
    kind: "outro",
  },
];

await fs.mkdir(cacheDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });
await fs.access(fontPath);
await configureFont();

const segments = [];
const subtitleCues = [];
let subtitleOffset = 0;

for (const [index, scene] of scenes.entries()) {
  const number = String(index + 1).padStart(2, "0");
  const slidePath = path.join(cacheDir, `${number}-slide.png`);
  const audioBasePath = path.join(cacheDir, `${number}-narration`);
  const segmentPath = path.join(cacheDir, `${number}-segment.mp4`);

  let sceneDuration;
  if (/^(?:1|true|yes)$/i.test(process.env.BILIBILI_REUSE_MEDIA || "") && await fileExists(segmentPath)) {
    sceneDuration = await probeDuration(segmentPath);
  } else {
    await renderSlide(scene, slidePath);
    const tts = new EdgeTTS();
    await tts.synthesize(scene.narration, process.env.BILIBILI_TTS_VOICE || "zh-CN-YunxiNeural", {
      rate: process.env.BILIBILI_TTS_RATE || "-4%",
      volume: "100%",
      outputFormat: Constants.OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3,
    });
    const audioPath = await tts.toFile(audioBasePath);
    const audioDuration = await probeDuration(audioPath);
    sceneDuration = audioDuration + 0.7;

    await runFfmpeg([
      "-y",
      "-loop", "1",
      "-framerate", "30",
      "-i", slidePath,
      "-i", audioPath,
      "-vf", `scale=1920:1080,format=yuv420p,fade=t=in:st=0:d=0.35,fade=t=out:st=${Math.max(0, sceneDuration - 0.35).toFixed(3)}:d=0.35`,
      "-af", "apad=pad_dur=0.7",
      "-t", sceneDuration.toFixed(3),
      "-c:v", "libx264",
      "-preset", "medium",
      "-crf", "19",
      "-tune", "stillimage",
      "-c:a", "aac",
      "-b:a", "160k",
      "-ar", "48000",
      "-movflags", "+faststart",
      segmentPath,
    ]);
  }

  segments.push(segmentPath);
  subtitleCues.push(...createSubtitleCues(scene.narration, subtitleOffset, sceneDuration));
  subtitleOffset += sceneDuration;
  console.log(`[${index + 1}/${scenes.length}] ${scene.title} (${sceneDuration.toFixed(1)}s)`);
}

const concatPath = path.join(cacheDir, "concat.txt");
await fs.writeFile(concatPath, segments.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join("\n"));
await runFfmpeg([
  "-y",
  "-f", "concat",
  "-safe", "0",
  "-i", concatPath,
  "-c", "copy",
  "-movflags", "+faststart",
  videoPath,
]);

await fs.writeFile(subtitlePath, subtitleCues.map((cue, index) => (
  `${index + 1}\n${formatSrtTime(cue.start)} --> ${formatSrtTime(cue.end)}\n${wrapSubtitle(cue.text)}\n`
)).join("\n"));

await fs.writeFile(metadataPath, JSON.stringify({
  title: "从 ipset 到 Xray：一套抗干扰网络如何持续演进？",
  description: "用 3 分钟梳理 vpn.chcbz.net 从 ipset、L2TP、IPsec、WireGuard 到 Xray 的网络架构演进，介绍当前 Nginx TLS + WebSocket + VLESS 拓扑、方案取舍和日常运维清单。\n\n完整文章：https://blog.chcbz.net/article/2026/202608170000.html",
  tags: ["Xray", "WireGuard", "网络工程", "VPN", "运维", "架构设计"],
  original: true,
  sourceUrl: "https://blog.chcbz.net/article/2026/202608170000.html",
}, null, 2));

await sharp(path.join(cacheDir, "01-slide.png")).jpeg({ quality: 92 }).toFile(bilibiliCoverPath);
const totalDuration = await probeDuration(videoPath);
console.log(`视频: ${videoPath}`);
console.log(`字幕: ${subtitlePath}`);
console.log(`封面: ${bilibiliCoverPath}`);
console.log(`投稿信息: ${metadataPath}`);
console.log(`时长: ${totalDuration.toFixed(1)} 秒`);

async function configureFont() {
  const fontConfigPath = path.join(cacheDir, "fonts.conf");
  const fontDirectory = path.dirname(fontPath);
  const fontCache = path.join(root, ".cache/video/fontconfig");
  await fs.mkdir(fontCache, { recursive: true });
  await fs.writeFile(fontConfigPath, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${escapeXml(fontDirectory)}</dir><cachedir>${escapeXml(fontCache)}</cachedir></fontconfig>`);
  process.env.FONTCONFIG_FILE = fontConfigPath;
}

async function renderSlide(scene, destination) {
  const svg = buildSvg(scene);
  if (scene.kind !== "cover") {
    await sharp(Buffer.from(svg)).png().toFile(destination);
    return;
  }

  const background = await sharp(coverPath)
    .resize(1920, 1080, { fit: "cover" })
    .blur(4)
    .modulate({ brightness: 0.58, saturation: 0.9 })
    .png()
    .toBuffer();
  await sharp(background).composite([{ input: Buffer.from(svg) }]).png().toFile(destination);
}

function buildSvg(scene) {
  const content = sceneVisual(scene);
  return `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#07111f"/><stop offset="1" stop-color="#102943"/></linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#41d1ff"/><stop offset="1" stop-color="#4f7cff"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="10" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    ${scene.kind === "cover" ? '<rect width="1920" height="1080" fill="#06111f" opacity="0.38"/>' : '<rect width="1920" height="1080" fill="url(#background)"/>'}
    <circle cx="1690" cy="150" r="260" fill="#1e78ff" opacity="0.08"/><circle cx="170" cy="980" r="330" fill="#28d7e5" opacity="0.06"/>
    <g font-family="Noto Sans CJK SC, sans-serif">
      <text x="120" y="110" font-size="30" fill="#62dcff" font-weight="600" letter-spacing="4">${escapeXml(scene.eyebrow)}</text>
      ${content}
      <text x="120" y="1010" font-size="24" fill="#7890a8">布衣云水客 · blog.chcbz.net</text>
      <text x="1800" y="1010" text-anchor="end" font-size="22" fill="#61768c">技术文章视频样片</text>
    </g>
  </svg>`;
}

function sceneVisual(scene) {
  if (scene.kind === "cover" || scene.kind === "outro") {
    return `${multilineText(scene.title, 120, 360, 86, 104, 15, "#ffffff", 800)}
      ${multilineText(scene.subtitle || "", 125, 610, 38, 58, 28, "#b9d8ef", 500)}
      <rect x="120" y="720" width="560" height="8" rx="4" fill="url(#accent)" filter="url(#glow)"/>`;
  }

  const title = multilineText(scene.title, 120, 200, 58, 76, 24, "#ffffff", 750);
  if (scene.kind === "timeline") {
    const items = ["ipset\n精细分流", "L2TP\n系统接入", "IPsec\n标准认证", "WireGuard\n简单高效", "Xray\n灵活编排"];
    return `${title}<line x1="230" y1="610" x2="1690" y2="610" stroke="#285678" stroke-width="8"/>${items.map((item, index) => {
      const x = 230 + index * 365;
      const [top, bottom] = item.split("\n");
      return `<circle cx="${x}" cy="610" r="25" fill="#49d8ff" filter="url(#glow)"/><text x="${x}" y="525" text-anchor="middle" font-size="32" fill="#ffffff" font-weight="700">${top}</text><text x="${x}" y="690" text-anchor="middle" font-size="27" fill="#a8c5da">${bottom}</text>`;
    }).join("")}`;
  }
  if (scene.kind === "comparison") {
    return `${title}${card(120, 430, 500, 360, "IPsec", ["标准与企业生态", "认证体系成熟", "配置复杂、特征明显"], "#4776ff")}${card(710, 430, 500, 360, "WireGuard", ["性能高、配置简单", "移动网络漫游好", "依赖 UDP、伪装较弱"], "#22c98d")}${card(1300, 430, 500, 360, "Xray", ["协议与传输可组合", "路由和 DNS 可编排", "灵活但运维成本更高"], "#42d9ff")}`;
  }
  if (scene.kind === "topology") {
    const nodes = [[120, "客户端"], [455, "HTTPS :443"], [790, "Nginx TLS"], [1125, "WebSocket"], [1460, "Xray VLESS"]];
    return `${title}${nodes.map(([x, label], index) => `${index ? `<path d="M${x - 95} 600 L${x - 25} 600" stroke="#43d5ff" stroke-width="6"/><path d="M${x - 42} 585 L${x - 22} 600 L${x - 42} 615" fill="none" stroke="#43d5ff" stroke-width="6"/>` : ""}<rect x="${x}" y="520" width="240" height="160" rx="28" fill="#102f4c" stroke="#326989" stroke-width="3"/><text x="${x + 120}" y="615" text-anchor="middle" font-size="30" fill="#ffffff" font-weight="650">${label}</text>`).join("")}<text x="1580" y="760" text-anchor="middle" font-size="27" fill="#87a9c2">direct / block 出站</text>`;
  }
  if (scene.kind === "layers") {
    const layers = [["入口", "443 · TLS · Nginx"], ["传输", "WebSocket · gRPC · XHTTP"], ["协议", "VLESS · Trojan · Shadowsocks"], ["策略", "DNS · 路由 · 多出口"]];
    return `${title}${layers.map(([name, value], index) => `<rect x="260" y="${405 + index * 135}" width="1400" height="100" rx="24" fill="${index % 2 ? "#102b46" : "#123553"}" stroke="#285d7d" stroke-width="2"/><text x="330" y="${470 + index * 135}" font-size="31" fill="#57dcff" font-weight="700">${name}</text><text x="570" y="${470 + index * 135}" font-size="31" fill="#ffffff">${value}</text>`).join("")}`;
  }
  if (scene.kind === "tradeoffs") {
    const items = ["证书续期", "客户端兼容", "DNS 路径", "规则维护", "日志轮转", "密钥管理"];
    return `${title}<circle cx="960" cy="650" r="155" fill="#113957" stroke="#42d9ff" stroke-width="5"/><text x="960" y="635" text-anchor="middle" font-size="42" fill="#ffffff" font-weight="750">持续运维</text><text x="960" y="690" text-anchor="middle" font-size="28" fill="#87bdd7">可观察 · 可回滚 · 可替换</text>${items.map((item, index) => {
      const angle = (-90 + index * 60) * Math.PI / 180;
      const x = 960 + Math.cos(angle) * 390;
      const y = 650 + Math.sin(angle) * 270;
      return `<rect x="${x - 120}" y="${y - 45}" width="240" height="90" rx="24" fill="#102d48" stroke="#2f6687" stroke-width="2"/><text x="${x}" y="${y + 11}" text-anchor="middle" font-size="29" fill="#ddecf6">${item}</text>`;
    }).join("")}`;
  }
  const checks = ["证书与服务状态", "端口和客户端连通性", "访问日志与错误日志", "DNS 解析和路由路径", "配置备份与升级回滚", "密钥和用户标识轮换"];
  return `${title}${checks.map((item, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = 180 + column * 850;
    const y = 420 + row * 150;
    return `<rect x="${x}" y="${y}" width="720" height="105" rx="22" fill="#102f4c"/><circle cx="${x + 55}" cy="${y + 52}" r="23" fill="#29d49a"/><path d="M${x + 43} ${y + 52} l9 10 l18 -24" fill="none" stroke="#061b22" stroke-width="7" stroke-linecap="round"/><text x="${x + 105}" y="${y + 65}" font-size="31" fill="#ffffff">${item}</text>`;
  }).join("")}`;
}

function card(x, y, width, height, title, lines, color) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="30" fill="#0e2b47" stroke="${color}" stroke-width="3"/><rect x="${x}" y="${y}" width="${width}" height="12" rx="6" fill="${color}"/><text x="${x + 42}" y="${y + 85}" font-size="42" fill="#ffffff" font-weight="750">${title}</text>${lines.map((line, index) => `<text x="${x + 42}" y="${y + 160 + index * 70}" font-size="27" fill="#b7cede">• ${line}</text>`).join("")}`;
}

function multilineText(value, x, y, fontSize, lineHeight, maxCharacters, color, weight) {
  const lines = wrapText(value, maxCharacters);
  return `<text x="${x}" y="${y}" font-size="${fontSize}" fill="${color}" font-weight="${weight}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${escapeXml(line)}</tspan>`).join("")}</text>`;
}

function wrapText(value, maxCharacters) {
  const result = [];
  let current = "";
  for (const character of [...value]) {
    const width = /[\u0000-\u00ff]/.test(character) ? 0.55 : 1;
    const currentWidth = [...current].reduce((sum, item) => sum + (/[\u0000-\u00ff]/.test(item) ? 0.55 : 1), 0);
    if (current && currentWidth + width > maxCharacters) {
      result.push(current);
      current = character;
    } else {
      current += character;
    }
  }
  if (current) result.push(current);
  return result;
}

function createSubtitleCues(text, offset, duration) {
  const sentences = text.split(/(?<=[。！？])/).map((item) => item.trim()).filter(Boolean);
  const totalCharacters = sentences.reduce((sum, sentence) => sum + sentence.length, 0);
  let cursor = offset;
  return sentences.map((sentence, index) => {
    const share = index === sentences.length - 1 ? offset + duration - cursor : duration * sentence.length / totalCharacters;
    const cue = { start: cursor, end: cursor + share, text: sentence };
    cursor = cue.end;
    return cue;
  });
}

function wrapSubtitle(value) {
  return wrapText(value, 25).join("\n");
}

function formatSrtTime(seconds) {
  const milliseconds = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor(milliseconds % 3600000 / 60000);
  const secs = Math.floor(milliseconds % 60000 / 1000);
  const millis = milliseconds % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(millis).padStart(3, "0")}`;
}

async function probeDuration(file) {
  try {
    const result = await execFileAsync(ffmpegPath, ["-i", file, "-f", "null", "-"], { maxBuffer: 1024 * 1024 * 4 });
    const match = `${result.stderr || ""}`.match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (match) return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
  } catch (error) {
    const output = `${error.stderr || ""}`;
    const match = output.match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (match) return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
    throw error;
  }
  throw new Error(`无法读取媒体时长: ${file}`);
}

async function runFfmpeg(argumentsList) {
  await execFileAsync(ffmpegPath, argumentsList, { maxBuffer: 1024 * 1024 * 8 });
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function escapeXml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
