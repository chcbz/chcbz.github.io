import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const root = process.cwd();
const articleId = "202608170000";
const fps = 10;
const duration = 30;
const frameCount = fps * duration;
const cacheDir = path.join(root, ".cache/video", articleId);
const outputDir = path.join(root, "output/video", articleId);
const fontPath = path.join(root, ".cache/video/fonts/NotoSansCJKsc-Regular.otf");
const sourceCover = path.join(root, `docs/article/2026/assets/${articleId}/wechat-cover.jpg`);
const audioOne = path.join(cacheDir, "01-narration.mp3");
const audioTwo = path.join(cacheDir, "02-narration.mp3");
const videoPath = path.join(outputDir, `${articleId}-bilibili-motion-sample.mp4`);
const subtitlePath = path.join(outputDir, `${articleId}-bilibili-motion-sample.srt`);
const previewPath = path.join(outputDir, `${articleId}-bilibili-motion-preview.jpg`);

await fs.mkdir(outputDir, { recursive: true });
await Promise.all([fontPath, sourceCover, audioOne, audioTwo].map((file) => fs.access(file)));
await configureFont();

const coverBackground = await sharp(sourceCover)
  .resize(1280, 720, { fit: "cover" })
  .blur(5)
  .modulate({ brightness: 0.42, saturation: 0.95 })
  .png()
  .toBuffer();

const ffmpeg = spawn(ffmpegPath, [
  "-y",
  "-f", "image2pipe",
  "-framerate", String(fps),
  "-vcodec", "mjpeg",
  "-i", "pipe:0",
  "-i", audioOne,
  "-i", audioTwo,
  "-filter_complex", "[1:a][2:a]concat=n=2:v=0:a=1,atrim=duration=30,apad=pad_dur=0.2[a]",
  "-map", "0:v:0",
  "-map", "[a]",
  "-t", String(duration),
  "-vf", "scale=1920:1080:flags=lanczos",
  "-r", "30",
  "-c:v", "libx264",
  "-preset", "medium",
  "-crf", "18",
  "-pix_fmt", "yuv420p",
  "-c:a", "aac",
  "-b:a", "160k",
  "-ar", "48000",
  "-movflags", "+faststart",
  videoPath,
], { stdio: ["pipe", "inherit", "pipe"] });

let ffmpegError = "";
ffmpeg.stderr.on("data", (chunk) => {
  ffmpegError += chunk;
  const line = String(chunk).match(/frame=\s*\d+[^\r\n]*/)?.[0];
  if (line) process.stdout.write(`\r${line.slice(0, 100)}`);
});

for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
  const time = frameIndex / fps;
  const svg = renderFrame(time);
  const base = time < 23.04 ? coverBackground : undefined;
  const image = base
    ? sharp(base).composite([{ input: Buffer.from(svg) }])
    : sharp(Buffer.from(svg));
  const frame = await image.jpeg({ quality: 88, chromaSubsampling: "4:4:4" }).toBuffer();
  if (!ffmpeg.stdin.write(frame)) await onceDrain(ffmpeg.stdin);
  if (frameIndex % fps === 0) process.stdout.write(`\r渲染动画: ${Math.round(frameIndex / frameCount * 100)}%`);
}
ffmpeg.stdin.end();
await waitForProcess(ffmpeg, () => ffmpegError);
process.stdout.write("\r渲染动画: 100%\n");

await sharp(Buffer.from(renderFrame(25.8))).resize(1920, 1080).jpeg({ quality: 90 }).toFile(previewPath);
await fs.writeFile(subtitlePath, buildSubtitles());

console.log(`动画样片: ${videoPath}`);
console.log(`动画预览: ${previewPath}`);
console.log(`样片字幕: ${subtitlePath}`);

function renderFrame(time) {
  const transition = smoothstep(22.5, 23.5, time);
  const firstOpacity = 1 - transition;
  const secondOpacity = transition;
  return `<svg width="1280" height="720" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06111e"/><stop offset="0.55" stop-color="#0b2138"/><stop offset="1" stop-color="#102f4c"/></linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#35e3ff"/><stop offset="1" stop-color="#5b75ff"/></linearGradient>
      <radialGradient id="pulse"><stop stop-color="#60eaff" stop-opacity="0.8"/><stop offset="1" stop-color="#60eaff" stop-opacity="0"/></radialGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <clipPath id="titleReveal"><rect x="0" y="0" width="${Math.round(1920 * smoothstep(1.2, 4.3, time))}" height="1080"/></clipPath>
    </defs>
    ${time < 23.04 ? '<rect width="1920" height="1080" fill="#04101c" opacity="0.36"/>' : '<rect width="1920" height="1080" fill="url(#bg)"/>'}
    ${grid(time)}
    ${networkParticles(time)}
    <g font-family="Noto Sans CJK SC, sans-serif" opacity="${firstOpacity.toFixed(3)}">
      ${openingScene(time)}
    </g>
    <g font-family="Noto Sans CJK SC, sans-serif" opacity="${secondOpacity.toFixed(3)}">
      ${timelineScene(time)}
    </g>
    ${transition > 0 && transition < 1 ? `<rect x="${Math.round(-500 + transition * 2600)}" y="0" width="420" height="1080" fill="#4bdfff" opacity="${(0.16 * Math.sin(Math.PI * transition)).toFixed(3)}" transform="skewX(-12)"/>` : ""}
    <g font-family="Noto Sans CJK SC, sans-serif">
      <text x="90" y="1020" fill="#7895ac" font-size="22">布衣云水客 · blog.chcbz.net</text>
      <text x="1830" y="1020" text-anchor="end" fill="#7895ac" font-size="22">动态图解样片 · 00:${String(Math.floor(time)).padStart(2, "0")}</text>
      <rect x="90" y="1045" width="1740" height="4" rx="2" fill="#183750"/><rect x="90" y="1045" width="${1740 * time / duration}" height="4" rx="2" fill="url(#accent)"/>
    </g>
  </svg>`;
}

function openingScene(time) {
  const eyebrow = easeOutBack(clamp((time - 0.3) / 1.1));
  const subtitle = smoothstep(3.5, 5.2, time);
  const topology = smoothstep(6.2, 7.4, time);
  const keywords = ["域名", "TLS", "反向代理", "路由", "DNS", "运维"];
  return `<text x="110" y="125" font-size="29" font-weight="650" letter-spacing="5" fill="#5fe2ff" opacity="${clamp(eyebrow).toFixed(3)}" transform="translate(${((1 - eyebrow) * -40).toFixed(1)} 0)">网络工程实践</text>
    <g clip-path="url(#titleReveal)">
      <text x="110" y="310" font-size="92" font-weight="850" fill="#ffffff">从 ipset 到 Xray</text>
      <text x="114" y="385" font-size="40" font-weight="500" fill="#bad9ed" opacity="${subtitle.toFixed(3)}">抗干扰网络如何持续演进？</text>
      <rect x="112" y="430" width="${Math.round(650 * smoothstep(2.4, 5.5, time))}" height="7" rx="4" fill="url(#accent)" filter="url(#glow)"/>
    </g>
    <g opacity="${topology.toFixed(3)}" transform="translate(0 ${((1 - topology) * 60).toFixed(1)})">
      ${topologyFlow(time)}
    </g>
    ${keywords.map((word, index) => {
      const start = 11.5 + index * 1.35;
      const amount = smoothstep(start, start + 0.75, time) * (1 - smoothstep(21.4, 22.5, time));
      const x = 120 + index * 285;
      const y = 850 + Math.sin(time * 1.4 + index) * 8;
      return `<g opacity="${amount.toFixed(3)}" transform="translate(${x} ${y}) scale(${(0.82 + amount * 0.18).toFixed(3)})"><rect width="235" height="78" rx="24" fill="#0b2944" stroke="#3c7ca0" stroke-width="2"/><circle cx="34" cy="39" r="8" fill="#4ee2ff" filter="url(#glow)"/><text x="58" y="50" font-size="28" fill="#e8f7ff">${word}</text></g>`;
    }).join("")}`;
}

function topologyFlow(time) {
  const nodes = [
    { x: 120, label: "客户端", detail: "远程接入" },
    { x: 470, label: "HTTPS :443", detail: "统一入口" },
    { x: 820, label: "Nginx TLS", detail: "证书与日志" },
    { x: 1170, label: "WebSocket", detail: "传输外观" },
    { x: 1520, label: "Xray VLESS", detail: "策略编排" },
  ];
  return nodes.map((node, index) => {
    const appear = easeOutBack(clamp((time - 6.5 - index * 0.55) / 0.9));
    const pulse = 0.5 + Math.sin(time * 3.2 - index) * 0.5;
    const connector = index === 0 ? "" : `<line x1="${node.x - 105}" y1="650" x2="${node.x - 30}" y2="650" stroke="#3d7897" stroke-width="5"/><circle cx="${node.x - 92 + ((time * 95 + index * 33) % 62)}" cy="650" r="7" fill="#57e7ff" filter="url(#glow)"/>`;
    return `${connector}<g opacity="${clamp(appear).toFixed(3)}" transform="translate(${node.x} 570) scale(${(0.75 + clamp(appear) * 0.25).toFixed(3)})"><rect width="270" height="160" rx="30" fill="#0b2944" stroke="#39799d" stroke-width="3"/><rect width="270" height="8" rx="4" fill="url(#accent)"/><circle cx="225" cy="45" r="${24 + pulse * 9}" fill="url(#pulse)" opacity="0.65"/><text x="135" y="82" text-anchor="middle" font-size="31" font-weight="720" fill="#ffffff">${node.label}</text><text x="135" y="125" text-anchor="middle" font-size="23" fill="#8eb6ce">${node.detail}</text></g>`;
  }).join("");
}

function timelineScene(time) {
  const local = Math.max(0, time - 23.04);
  const title = smoothstep(23.1, 24.0, time);
  const items = [
    ["ipset", "精细分流"],
    ["L2TP", "系统接入"],
    ["IPsec", "标准认证"],
    ["WireGuard", "简单高效"],
    ["Xray", "灵活编排"],
  ];
  const progress = clamp(local / 6.7);
  return `<text x="110" y="130" font-size="29" font-weight="650" letter-spacing="5" fill="#5fe2ff" opacity="${title.toFixed(3)}">演进主线</text>
    <text x="110" y="270" font-size="66" font-weight="820" fill="#ffffff" opacity="${title.toFixed(3)}">每一代方案，都在回答一个新问题</text>
    <line x1="230" y1="610" x2="1690" y2="610" stroke="#214b68" stroke-width="10" stroke-linecap="round"/>
    <line x1="230" y1="610" x2="${230 + 1460 * progress}" y2="610" stroke="url(#accent)" stroke-width="10" stroke-linecap="round" filter="url(#glow)"/>
    ${items.map(([name, detail], index) => {
      const x = 230 + index * 365;
      const appear = easeOutBack(clamp((local - 0.35 - index * 1.05) / 0.75));
      const active = clamp(1 - Math.abs(progress * 4 - index));
      return `<g opacity="${clamp(appear).toFixed(3)}"><circle cx="${x}" cy="610" r="${22 + active * 12}" fill="#48ddff" filter="url(#glow)"/><circle cx="${x}" cy="610" r="${48 + active * 16}" fill="url(#pulse)" opacity="${(0.15 + active * 0.35).toFixed(3)}"/><text x="${x}" y="510" text-anchor="middle" font-size="${32 + active * 8}" font-weight="760" fill="#ffffff">${name}</text><text x="${x}" y="700" text-anchor="middle" font-size="27" fill="#9fc4d9">${detail}</text></g>`;
    }).join("")}
    <text x="960" y="865" text-anchor="middle" font-size="30" fill="#8eb6ce" opacity="${smoothstep(27.8, 29.1, time).toFixed(3)}">不是追逐最强协议，而是持续匹配新的网络环境</text>`;
}

function grid(time) {
  const offset = (time * 18) % 80;
  const vertical = Array.from({ length: 26 }, (_, index) => `<line x1="${index * 80 + offset}" y1="0" x2="${index * 80 + offset - 300}" y2="1080" stroke="#2c6684" stroke-width="1" opacity="0.08"/>`).join("");
  const horizontal = Array.from({ length: 15 }, (_, index) => `<line x1="0" y1="${index * 80}" x2="1920" y2="${index * 80}" stroke="#2c6684" stroke-width="1" opacity="0.055"/>`).join("");
  return `<g>${vertical}${horizontal}</g>`;
}

function networkParticles(time) {
  return Array.from({ length: 34 }, (_, index) => {
    const x = ((index * 173 + time * (18 + index % 5) * 3) % 2100) - 90;
    const y = 80 + ((index * 97 + Math.sin(time * 0.55 + index) * 110) % 900 + 900) % 900;
    const radius = 2 + index % 4;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius}" fill="#65e7ff" opacity="${(0.09 + index % 5 * 0.025).toFixed(3)}"/>`;
  }).join("");
}

function buildSubtitles() {
  const sections = [
    {
      start: 0,
      duration: 23.04,
      text: "一套可靠的远程接入网络，从来不只是选择一个所谓最强协议。域名、TLS、反向代理、传输层、客户端、DNS、路由和运维，共同决定它能否长期稳定。今天用两分钟，回顾 vpn.chcbz.net 从 ipset 到 Xray 的演进。",
    },
    {
      start: 23.04,
      duration: 6.96,
      text: "最初使用 ipset，是为了解决哪些流量需要分流。",
    },
  ];
  const cues = [];
  for (const section of sections) {
    const sentences = section.text.split(/(?<=[。！？])/).filter(Boolean);
    const total = sentences.reduce((sum, sentence) => sum + sentence.length, 0);
    let cursor = section.start;
    for (const sentence of sentences) {
      const cueDuration = section.duration * sentence.length / total;
      cues.push({ start: cursor, end: Math.min(duration, cursor + cueDuration), text: sentence });
      cursor += cueDuration;
    }
  }
  return cues.map((cue, index) => `${index + 1}\n${srtTime(cue.start)} --> ${srtTime(cue.end)}\n${wrap(cue.text, 24)}\n`).join("\n");
}

async function configureFont() {
  const fontConfigPath = path.join(cacheDir, "motion-fonts.conf");
  const fontCache = path.join(root, ".cache/video/fontconfig");
  await fs.mkdir(fontCache, { recursive: true });
  await fs.writeFile(fontConfigPath, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${escapeXml(path.dirname(fontPath))}</dir><cachedir>${escapeXml(fontCache)}</cachedir></fontconfig>`);
  process.env.FONTCONFIG_FILE = fontConfigPath;
}

function onceDrain(stream) {
  return new Promise((resolve, reject) => {
    const onDrain = () => {
      stream.off("error", onError);
      resolve();
    };
    const onError = (error) => {
      stream.off("drain", onDrain);
      reject(error);
    };
    stream.once("drain", onDrain);
    stream.once("error", onError);
  });
}

function waitForProcess(process, getStderr) {
  return new Promise((resolve, reject) => {
    process.once("error", reject);
    process.once("close", (code) => code === 0 ? resolve() : reject(new Error(`FFmpeg 渲染失败 (${code}): ${getStderr().slice(-2000)}`)));
  });
}

function smoothstep(start, end, value) {
  const amount = clamp((value - start) / (end - start));
  return amount * amount * (3 - 2 * amount);
}

function easeOutBack(value) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (value - 1) ** 3 + c1 * (value - 1) ** 2;
}

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function wrap(value, length) {
  const lines = [];
  for (let index = 0; index < value.length; index += length) lines.push(value.slice(index, index + length));
  return lines.join("\n");
}

function srtTime(seconds) {
  const milliseconds = Math.round(seconds * 1000);
  const hours = Math.floor(milliseconds / 3_600_000);
  const minutes = Math.floor(milliseconds % 3_600_000 / 60_000);
  const secs = Math.floor(milliseconds % 60_000 / 1000);
  const millis = milliseconds % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(millis).padStart(3, "0")}`;
}

function escapeXml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
