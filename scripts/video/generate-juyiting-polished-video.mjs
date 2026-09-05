import fs from "node:fs/promises";
import path from "node:path";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { EdgeTTS, Constants } from "@andresaya/edge-tts";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const articleId = "202607220000";
const fps = 10;
const cacheDir = path.join(root, ".cache/video", articleId);
const outputDir = path.join(root, "output/video", articleId);
const fontPath = path.join(root, ".cache/video/fonts/NotoSansCJKsc-Regular.otf");
const sourceCover = path.join(root, `docs/article/2026/assets/${articleId}/wechat-cover.png`);
const videoPath = path.join(outputDir, `${articleId}-bilibili-polished.mp4`);
const subtitlePath = path.join(outputDir, `${articleId}-bilibili-polished.srt`);
const coverPath = path.join(outputDir, `${articleId}-bilibili-cover.jpg`);
const metadataPath = path.join(outputDir, `${articleId}-bilibili-metadata.json`);

const scenes = [
  {
    kind: "hook",
    eyebrow: "前端架构实验",
    title: "当 Web 应用长得像游戏",
    subtitle: "为什么不直接使用游戏引擎？",
    narration: "大多数 Web 前端都在用 Vue 或 React 处理表单、列表和弹窗。但如果业务界面本身是一张地图，上面有角色、移动、碰撞、摄像机和实时状态呢？Juyiting 做了一个大胆选择：让 Vue 负责界面，让 melonJS 游戏引擎负责整个可交互世界。接下来，我们用两分多钟拆解这套混合架构。",
  },
  {
    kind: "architecture",
    eyebrow: "双引擎协作",
    title: "Vue 管理界面，melonJS 驱动世界",
    narration: "这套系统并没有抛弃传统前端框架。Vue 继续负责路由、菜单、弹窗和表单；游戏引擎负责地图、角色、动画、输入和摄像机。两层通过共享状态与事件总线通信，后端再通过 REST API 和 SSE 下发权威状态。关键不是谁取代谁，而是把每种工具放在最擅长的位置。",
  },
  {
    kind: "map",
    eyebrow: "地图运行时",
    title: "地图不是背景图，而是一套可计算的数据",
    narration: "地图由 Tiled 编辑器生成 TMX 文件，但运行时远不止渲染瓦片。Region 表示大厅、兵器库等逻辑区域；NavNode 和 NavEdge 构成寻路网络；Slot 决定角色最终站位；Obstacle 负责避障和点击检测。视觉地图、业务规则和导航结构因此能够使用同一套坐标体系。",
  },
  {
    kind: "camera",
    eyebrow: "移动端适配",
    title: "键盘、旋转和窗口变化必须区别处理",
    narration: "移动端最麻烦的不是缩放，而是判断视口为什么变化。软键盘弹出时，宽度几乎不变，视觉高度突然缩小；屏幕旋转时，宽高关系发生反转；普通布局变化则需要重新计算。Juyiting 会先分类 resize，再决定保持画面、重算摄像机还是调整缩放，从而避免地图闪烁和角色跳动。",
  },
  {
    kind: "movement",
    eyebrow: "移动模拟",
    title: "角色移动是一条可恢复的命令流水线",
    narration: "角色并不是从 A 点直接做 CSS transition。移动请求先进入命令队列，再通过 A 星算法计算路径，沿导航节点逐段插值前进。多个角色抵达同一区域时，槽位系统会自动分配互不重叠的位置。命令可以取消、替换和排队，模拟引擎每一帧只根据时间差更新状态。",
  },
  {
    kind: "recovery",
    eyebrow: "状态一致性",
    title: "后端权威，前端负责流畅恢复",
    narration: "最精巧的部分是断线恢复。后端通过 SSE 推送移动命令，其中包含开始时间和预计到达时间。客户端重连后，不需要重新播放整个动画，而是根据当前时间计算标准化进度，直接恢复到角色应该出现的位置。这样既保持服务端权威，又不需要每秒轮询坐标。",
  },
  {
    kind: "outro",
    eyebrow: "可复用原则",
    title: "跳出传统前端的盒子",
    narration: "这套架构留下四条可复用原则：地图与角色交给游戏引擎，表单和菜单交给 Vue；动画由时间戳驱动，而不是绑定帧率；后端维护权威状态，前端负责平滑恢复；输入统一抽象为地图坐标，让鼠标和触摸使用同一套逻辑。如果你的 Web 场景也有地图、角色和移动，游戏引擎也许比堆叠 DOM 更自然。",
  },
];

await fs.mkdir(cacheDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });
await Promise.all([fontPath, sourceCover].map((file) => fs.access(file)));
await configureFont();

const coverBackground = await sharp(sourceCover)
  .resize(1280, 720, { fit: "cover" })
  .modulate({ brightness: 0.42, saturation: 1.05 })
  .blur(1.5)
  .png()
  .toBuffer();

const segments = [];
const subtitleCues = [];
let timelineOffset = 0;

for (const [index, scene] of scenes.entries()) {
  const number = String(index + 1).padStart(2, "0");
  const audioBase = path.join(cacheDir, `${number}-narration`);
  const segmentPath = path.join(cacheDir, `${number}-polished-segment.mp4`);
  let audioPath = await findAudio(audioBase);

  if (!audioPath) {
    const tts = new EdgeTTS();
    await tts.synthesize(scene.narration, process.env.BILIBILI_TTS_VOICE || "zh-CN-YunxiNeural", {
      rate: process.env.BILIBILI_TTS_RATE || "-2%",
      volume: "100%",
      outputFormat: Constants.OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3,
    });
    audioPath = await tts.toFile(audioBase);
  }

  const audioDuration = await probeDuration(audioPath);
  const sceneDuration = audioDuration + 0.75;
  const reuse = /^(?:1|true|yes)$/i.test(process.env.BILIBILI_REUSE_MEDIA || "") && await fileExists(segmentPath);
  if (!reuse) await renderSegment(scene, index, sceneDuration, audioPath, segmentPath);
  segments.push(segmentPath);
  subtitleCues.push(...createSubtitleCues(scene.narration, timelineOffset, audioDuration));
  timelineOffset += sceneDuration;
  console.log(`[${index + 1}/${scenes.length}] ${scene.title} (${sceneDuration.toFixed(1)}s)`);
}

const concatPath = path.join(cacheDir, "polished-concat.txt");
await fs.writeFile(concatPath, segments.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join("\n"));
await runFfmpeg([
  "-y", "-f", "concat", "-safe", "0", "-i", concatPath,
  "-c", "copy", "-movflags", "+faststart", videoPath,
]);

await fs.writeFile(subtitlePath, subtitleCues.map((cue, index) => (
  `${index + 1}\n${srtTime(cue.start)} --> ${srtTime(cue.end)}\n${wrapText(cue.text, 24)}\n`
)).join("\n"));

const coverOverlay = Buffer.from(renderFrame(scenes[0], 0, 5.2, 18));
await sharp(coverBackground)
  .composite([{ input: coverOverlay }])
  .resize(1920, 1080)
  .jpeg({ quality: 92 })
  .toFile(coverPath);

await fs.writeFile(metadataPath, JSON.stringify({
  title: "用游戏引擎做 Web 应用：Vue 3 + melonJS 混合架构揭秘",
  description: "当 Web 应用拥有地图、角色、寻路、摄像机和实时状态时，游戏引擎可能比传统 DOM 更合适。本视频通过动态图解拆解 Juyiting 的 Vue 3 + melonJS 混合架构、TMX 地图运行时、A* 移动引擎、移动端摄像机和 SSE 状态恢复。\n\n完整文章：https://blog.chcbz.net/article/2026/202607220000.html",
  tags: ["前端开发", "Vue3", "melonJS", "游戏引擎", "TypeScript", "架构设计", "Web开发"],
  original: true,
  sourceUrl: "https://blog.chcbz.net/article/2026/202607220000.html",
}, null, 2));

console.log(`精制视频: ${videoPath}`);
console.log(`字幕: ${subtitlePath}`);
console.log(`封面: ${coverPath}`);
console.log(`投稿信息: ${metadataPath}`);
console.log(`总时长: ${timelineOffset.toFixed(1)} 秒`);

async function renderSegment(scene, sceneIndex, sceneDuration, audioPath, destination) {
  const frameCount = Math.ceil(sceneDuration * fps);
  const ffmpeg = spawn(ffmpegPath, [
    "-y", "-f", "image2pipe", "-framerate", String(fps), "-vcodec", "mjpeg", "-i", "pipe:0",
    "-i", audioPath,
    "-vf", "scale=1920:1080:flags=lanczos",
    "-af", "apad=pad_dur=0.75",
    "-t", sceneDuration.toFixed(3), "-r", "30",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-movflags", "+faststart",
    destination,
  ], { stdio: ["pipe", "ignore", "pipe"] });
  let stderr = "";
  ffmpeg.stderr.on("data", (chunk) => { stderr += chunk; });

  for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
    const time = frameIndex / fps;
    const svg = Buffer.from(renderFrame(scene, sceneIndex, time, sceneDuration));
    const image = scene.kind === "hook"
      ? sharp(coverBackground).composite([{ input: svg }])
      : sharp(svg);
    const frame = await image.jpeg({ quality: 87, chromaSubsampling: "4:4:4" }).toBuffer();
    if (!ffmpeg.stdin.write(frame)) await onceDrain(ffmpeg.stdin);
    if (frameIndex % Math.max(1, fps * 3) === 0) {
      process.stdout.write(`\r场景 ${sceneIndex + 1}/${scenes.length} 渲染 ${Math.round(frameIndex / frameCount * 100)}%`);
    }
  }
  ffmpeg.stdin.end();
  await waitForProcess(ffmpeg, () => stderr);
  process.stdout.write(`\r场景 ${sceneIndex + 1}/${scenes.length} 渲染 100%\n`);
}

function renderFrame(scene, sceneIndex, time, duration) {
  const enter = smoothstep(0, 0.65, time);
  const leave = 1 - smoothstep(Math.max(0, duration - 0.55), duration, time);
  const opacity = Math.min(enter, leave);
  return `<svg width="1280" height="720" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06111e"/><stop offset="0.55" stop-color="#0a2138"/><stop offset="1" stop-color="#102f4b"/></linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#37e2ff"/><stop offset="1" stop-color="#6272ff"/></linearGradient>
      <linearGradient id="warm" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#ffbb5c"/><stop offset="1" stop-color="#ff6d5c"/></linearGradient>
      <radialGradient id="pulse"><stop stop-color="#68edff" stop-opacity="0.9"/><stop offset="1" stop-color="#68edff" stop-opacity="0"/></radialGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="shadow"><feDropShadow dx="0" dy="15" stdDeviation="20" flood-color="#000000" flood-opacity="0.4"/></filter>
    </defs>
    ${scene.kind === "hook" ? '<rect width="1920" height="1080" fill="#04101c" opacity="0.28"/>' : '<rect width="1920" height="1080" fill="url(#bg)"/>'}
    ${movingGrid(time, sceneIndex)}${particles(time, sceneIndex)}
    <g font-family="Noto Sans CJK SC, sans-serif" opacity="${opacity.toFixed(3)}">
      ${sceneVisual(scene, time, duration)}
      <text x="90" y="1018" font-size="22" fill="#7793aa">布衣云水客 · blog.chcbz.net</text>
      <text x="1830" y="1018" text-anchor="end" font-size="22" fill="#7793aa">Juyiting 架构动态图解 · ${String(sceneIndex + 1).padStart(2, "0")}/${String(scenes.length).padStart(2, "0")}</text>
      <rect x="90" y="1045" width="1740" height="4" rx="2" fill="#183750"/><rect x="90" y="1045" width="${1740 * clamp(time / duration)}" height="4" rx="2" fill="url(#accent)"/>
    </g>
  </svg>`;
}

function sceneVisual(scene, time, duration) {
  const header = `<text x="105" y="118" font-size="29" font-weight="650" letter-spacing="5" fill="#5fe2ff">${scene.eyebrow}</text>`;
  if (scene.kind === "hook") return `${header}${hookVisual(scene, time)}`;
  if (scene.kind === "architecture") return `${header}${architectureVisual(scene, time)}`;
  if (scene.kind === "map") return `${header}${mapVisual(scene, time)}`;
  if (scene.kind === "camera") return `${header}${cameraVisual(scene, time)}`;
  if (scene.kind === "movement") return `${header}${movementVisual(scene, time, duration)}`;
  if (scene.kind === "recovery") return `${header}${recoveryVisual(scene, time, duration)}`;
  return `${header}${outroVisual(scene, time)}`;
}

function hookVisual(scene, time) {
  const reveal = smoothstep(0.7, 3.6, time);
  const subtitle = smoothstep(2.6, 4.6, time);
  const orbit = time * 0.38;
  return `<g transform="translate(${(Math.sin(time * 0.22) * 12).toFixed(1)} ${(Math.cos(time * 0.18) * 7).toFixed(1)})">
      <text x="105" y="330" font-size="82" font-weight="850" fill="#ffffff" opacity="${reveal.toFixed(3)}">${scene.title}</text>
      <text x="110" y="415" font-size="42" fill="#bdd9eb" opacity="${subtitle.toFixed(3)}">${scene.subtitle}</text>
      <rect x="108" y="465" width="${650 * reveal}" height="8" rx="4" fill="url(#accent)" filter="url(#glow)"/>
    </g>
    <g opacity="${smoothstep(5, 7, time).toFixed(3)}">
      <circle cx="1430" cy="610" r="210" fill="#092844" stroke="#42dfff" stroke-width="3" opacity="0.75"/>
      <circle cx="1430" cy="610" r="${145 + Math.sin(time * 2) * 10}" fill="none" stroke="#5c78ff" stroke-width="5" stroke-dasharray="18 14" transform="rotate(${time * 20} 1430 610)"/>
      ${["Vue UI", "Map", "Agent", "Camera", "A*", "SSE"].map((label, index) => {
        const angle = orbit + index * Math.PI / 3;
        const x = 1430 + Math.cos(angle) * 255;
        const y = 610 + Math.sin(angle) * 180;
        return `<g transform="translate(${x} ${y})"><circle r="42" fill="#0a2d49" stroke="#3d85aa" stroke-width="2"/><text y="9" text-anchor="middle" font-size="23" fill="#ffffff">${label}</text></g>`;
      }).join("")}
      <text x="1430" y="596" text-anchor="middle" font-size="42" font-weight="800" fill="#ffffff">melonJS</text><text x="1430" y="642" text-anchor="middle" font-size="25" fill="#8fc2dd">Interactive World</text>
    </g>`;
}

function architectureVisual(scene, time) {
  const bridge = smoothstep(4.5, 7.2, time);
  const packets = Array.from({ length: 5 }, (_, index) => {
    const amount = (time * 0.22 + index * 0.2) % 1;
    return `<circle cx="${780 + amount * 360}" cy="650" r="8" fill="${index % 2 ? "#65e8ff" : "#ffb95f"}" filter="url(#glow)"/>`;
  }).join("");
  return `${bigTitle(scene.title)}
    ${panel(100, 390, 650, 430, "Vue 3 · UI Layer", ["Router / Store", "Menu / Dialog", "Form / Overlay"], "#42dfff", smoothstep(1.3, 2.5, time))}
    ${panel(1170, 390, 650, 430, "melonJS · World Layer", ["Map / Camera", "Sprite / Input", "Simulation / Motion"], "#6c78ff", smoothstep(2.4, 3.6, time))}
    <g opacity="${bridge.toFixed(3)}"><line x1="760" y1="650" x2="1160" y2="650" stroke="#315d78" stroke-width="7"/><text x="960" y="610" text-anchor="middle" font-size="25" fill="#94b8ce">Shared State · Event Bus</text>${packets}</g>
    <g opacity="${smoothstep(7, 8.5, time).toFixed(3)}"><rect x="725" y="830" width="470" height="100" rx="25" fill="#0b2b47" stroke="#d68d42" stroke-width="2"/><text x="960" y="873" text-anchor="middle" font-size="27" fill="#ffbf69">REST API · SSE</text><text x="960" y="908" text-anchor="middle" font-size="22" fill="#9cb7c9">Backend Authority</text></g>`;
}

function mapVisual(scene, time) {
  const progress = smoothstep(2.3, 8.5, time);
  const agentX = 420 + ((time * 72) % 860);
  const agentY = 700 + Math.sin(time * 0.8) * 70;
  const nodes = [[400, 520], [640, 460], [880, 560], [1120, 430], [1400, 590], [1240, 760], [900, 800], [570, 750]];
  return `${bigTitle(scene.title)}<g transform="translate(0 40)">
    <rect x="170" y="370" width="1580" height="560" rx="35" fill="#081d30" stroke="#2b5f7c" stroke-width="3" filter="url(#shadow)"/>
    ${tileMap(time)}
    <g opacity="${progress.toFixed(3)}">${nodes.map(([x, y], index) => `<circle cx="${x}" cy="${y}" r="10" fill="#5ee8ff"/><text x="${x + 16}" y="${y - 14}" font-size="18" fill="#6f9bb4">N${index + 1}</text>`).join("")}${nodes.map(([x, y], index) => { const next = nodes[(index + 1) % nodes.length]; return `<line x1="${x}" y1="${y}" x2="${next[0]}" y2="${next[1]}" stroke="#2d779a" stroke-width="3" stroke-dasharray="8 8"/>`; }).join("")}</g>
    <rect x="300" y="470" width="330" height="230" rx="26" fill="#17405a" opacity="0.55" stroke="#41dfff" stroke-width="3"/><text x="465" y="450" text-anchor="middle" font-size="24" fill="#7eeaff">Region · 聚义厅</text>
    <rect x="1170" y="500" width="350" height="245" rx="26" fill="#402d18" opacity="0.6" stroke="#ffb45e" stroke-width="3"/><text x="1345" y="480" text-anchor="middle" font-size="24" fill="#ffc77d">Region · 兵器库</text>
    <circle cx="${agentX}" cy="${agentY}" r="31" fill="#ffffff" stroke="#47e4ff" stroke-width="7" filter="url(#glow)"/><path d="M${agentX - 13} ${agentY + 1} l10 11 l22 -27" fill="none" stroke="#0b4562" stroke-width="7" stroke-linecap="round"/>
    <g transform="translate(230 850)">${legend("Region", "#41dfff", 0)}${legend("NavNode / Edge", "#5ee8ff", 240)}${legend("Slot", "#8b78ff", 550)}${legend("Obstacle", "#ffb45e", 750)}</g>
    </g>`;
}

function cameraVisual(scene, time) {
  const phase = (time * 0.17) % 3;
  const keyboard = phase < 1 ? smoothstep(0.2, 0.8, phase) : 1 - smoothstep(1.2, 1.8, phase);
  const rotate = phase > 1.7 ? smoothstep(1.7, 2.5, phase) : 0;
  const phoneWidth = 430 + rotate * 260;
  const phoneHeight = 650 - rotate * 210;
  return `${bigTitle(scene.title)}
    <g transform="translate(${310 - rotate * 90} ${360 + rotate * 70})"><rect width="${phoneWidth}" height="${phoneHeight}" rx="45" fill="#081b2b" stroke="#55dcff" stroke-width="5" filter="url(#shadow)"/><rect x="24" y="70" width="${phoneWidth - 48}" height="${phoneHeight - 125}" rx="22" fill="#0c2b43"/>
      ${miniMap(45, 105, phoneWidth - 90, phoneHeight - 200, time)}
      <rect x="24" y="${phoneHeight - 180 * keyboard}" width="${phoneWidth - 48}" height="${150 * keyboard}" rx="18" fill="#162638" stroke="#607386" stroke-width="2"/><text x="${phoneWidth / 2}" y="${phoneHeight - 85 * keyboard}" text-anchor="middle" font-size="25" fill="#b8cad6" opacity="${keyboard}">软键盘</text>
    </g>
    <g transform="translate(1030 405)">${strategyCard("keyboard", "保持游戏画面", keyboard, 0)}${strategyCard("orientation", "重算缩放与视口", rotate, 150)}${strategyCard("layout", "响应窗口变化", 1 - Math.max(keyboard, rotate), 300)}</g>
    <path d="M850 650 C930 650 930 650 1005 650" stroke="#42dfff" stroke-width="6" fill="none"/><path d="M990 630 l25 20 l-25 20" fill="none" stroke="#42dfff" stroke-width="6"/>
    <text x="900" y="610" text-anchor="middle" font-size="27" fill="#87b5cf">classifyViewportResize()</text>`;
}

function movementVisual(scene, time, duration) {
  const pathProgress = smoothstep(3.3, 7.5, time);
  const travel = clamp((time - 7.2) / Math.max(1, duration - 10));
  const points = [[310, 780], [470, 630], [690, 690], [880, 520], [1110, 590], [1370, 440], [1600, 590]];
  const agent = interpolatePath(points, travel);
  return `${bigTitle(scene.title)}<g transform="translate(0 20)">
    <rect x="170" y="360" width="1580" height="590" rx="35" fill="#081d30" stroke="#2b5f7c" stroke-width="3"/>
    ${tileMap(time * 0.5)}
    <rect x="720" y="450" width="210" height="165" rx="25" fill="#42251d" stroke="#ff855f" stroke-width="3"/><text x="825" y="540" text-anchor="middle" font-size="24" fill="#ffc0a7">Obstacle</text>
    <rect x="1190" y="650" width="240" height="150" rx="25" fill="#42251d" stroke="#ff855f" stroke-width="3"/><text x="1310" y="735" text-anchor="middle" font-size="24" fill="#ffc0a7">Obstacle</text>
    <polyline points="${points.map((point) => point.join(",")).join(" ")}" fill="none" stroke="#214c68" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="${partialPolyline(points, pathProgress)}" fill="none" stroke="url(#accent)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
    ${points.map(([x, y], index) => `<circle cx="${x}" cy="${y}" r="14" fill="${index <= pathProgress * (points.length - 1) ? "#56e5ff" : "#315d78"}"/>`).join("")}
    <circle cx="${agent[0]}" cy="${agent[1]}" r="34" fill="#ffffff" stroke="#5be5ff" stroke-width="8" filter="url(#glow)"/><text x="${agent[0]}" y="${agent[1] + 8}" text-anchor="middle" font-size="22" font-weight="800" fill="#0a425b">A</text>
    <g transform="translate(260 875)">${queueChip("enqueue", 0, time)}${queueChip("A* path", 260, time - 1.2)}${queueChip("interpolate", 520, time - 2.4)}${queueChip("slot", 800, time - 3.6)}${queueChip("snapshot", 1060, time - 4.8)}</g>
    </g>`;
}

function recoveryVisual(scene, time, duration) {
  const disconnect = smoothstep(6, 7, time) * (1 - smoothstep(11.5, 12.5, time));
  const progress = clamp(time / Math.max(1, duration - 2));
  const recovered = smoothstep(12, 14, time);
  const x = 390 + progress * 1110;
  return `${bigTitle(scene.title)}
    <g transform="translate(135 420)">${serverBox("Backend", "SSE Authority", "#ffb35f")}</g>
    <g transform="translate(1395 420)">${serverBox("Frontend", "Smooth Recovery", "#54e2ff")}</g>
    <line x1="530" y1="560" x2="1390" y2="560" stroke="#335f79" stroke-width="7" stroke-dasharray="18 14"/>
    ${Array.from({ length: 5 }, (_, index) => { const amount = (time * 0.18 + index * 0.2) % 1; return `<circle cx="${530 + amount * 860}" cy="560" r="9" fill="#ffbc68" opacity="${(1 - disconnect).toFixed(3)}" filter="url(#glow)"/>`; }).join("")}
    <g opacity="${disconnect.toFixed(3)}"><line x1="900" y1="515" x2="1015" y2="605" stroke="#ff6f66" stroke-width="12"/><line x1="1015" y1="515" x2="900" y2="605" stroke="#ff6f66" stroke-width="12"/><text x="960" y="655" text-anchor="middle" font-size="27" fill="#ff948d">连接中断</text></g>
    <line x1="390" y1="790" x2="1500" y2="790" stroke="#214d68" stroke-width="12" stroke-linecap="round"/><line x1="390" y1="790" x2="${x}" y2="790" stroke="url(#accent)" stroke-width="12" stroke-linecap="round" filter="url(#glow)"/>
    <circle cx="${x}" cy="790" r="33" fill="#ffffff" stroke="#56e5ff" stroke-width="8"/><text x="390" y="855" text-anchor="middle" font-size="24" fill="#86aec5">startedAt</text><text x="1500" y="855" text-anchor="middle" font-size="24" fill="#86aec5">expectedArrivalAt</text>
    <g opacity="${recovered.toFixed(3)}"><rect x="695" y="875" width="530" height="74" rx="22" fill="#0c304a" stroke="#49dfff" stroke-width="2"/><text x="960" y="923" text-anchor="middle" font-size="29" fill="#dff8ff">normalizedProgress = ${Math.round(progress * 100)}%</text></g>`;
}

function outroVisual(scene, time) {
  const cards = [
    ["工具匹配", "地图给引擎，表单给 Vue"],
    ["时间驱动", "动画不绑定设备帧率"],
    ["后端权威", "前端负责平滑恢复"],
    ["统一输入", "鼠标和触摸映射为坐标"],
  ];
  return `${bigTitle(scene.title)}${cards.map(([title, detail], index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = 170 + column * 820;
    const y = 410 + row * 220;
    const appear = easeOutBack(clamp((time - 1.2 - index * 0.75) / 0.9));
    return `<g opacity="${clamp(appear).toFixed(3)}" transform="translate(${x} ${y}) scale(${(0.86 + clamp(appear) * 0.14).toFixed(3)})"><rect width="720" height="170" rx="30" fill="#0b2b47" stroke="${index % 2 ? "#6c78ff" : "#43dfff"}" stroke-width="3"/><text x="50" y="72" font-size="36" font-weight="780" fill="#ffffff">${title}</text><text x="50" y="123" font-size="27" fill="#9ec2d7">${detail}</text><text x="660" y="105" text-anchor="middle" font-size="66" fill="#4bdfff" opacity="0.35">0${index + 1}</text></g>`;
  }).join("")}<g opacity="${smoothstep(6, 8, time).toFixed(3)}"><text x="960" y="905" text-anchor="middle" font-size="29" fill="#8eb7ce">完整文章 · blog.chcbz.net/article/2026/202607220000.html</text></g>`;
}

function bigTitle(value) {
  return `<text x="105" y="270" font-size="64" font-weight="830" fill="#ffffff">${value}</text><rect x="108" y="310" width="620" height="7" rx="4" fill="url(#accent)"/>`;
}

function panel(x, y, width, height, title, items, color, opacity) {
  return `<g opacity="${opacity.toFixed(3)}" transform="translate(${x} ${y + (1 - opacity) * 60})"><rect width="${width}" height="${height}" rx="35" fill="#0a2943" stroke="${color}" stroke-width="3" filter="url(#shadow)"/><rect width="${width}" height="12" rx="6" fill="${color}"/><text x="42" y="78" font-size="38" font-weight="780" fill="#ffffff">${title}</text>${items.map((item, index) => `<rect x="42" y="${125 + index * 86}" width="${width - 84}" height="65" rx="18" fill="#102f49"/><circle cx="72" cy="${158 + index * 86}" r="9" fill="${color}"/><text x="98" y="${169 + index * 86}" font-size="26" fill="#c4dcea">${item}</text>`).join("")}</g>`;
}

function tileMap(time) {
  const cells = [];
  for (let row = 0; row < 7; row += 1) for (let column = 0; column < 17; column += 1) {
    const x = 200 + column * 90;
    const y = 390 + row * 78;
    const wave = 0.06 + 0.04 * Math.sin(time * 0.8 + row * 0.7 + column * 0.4);
    cells.push(`<rect x="${x}" y="${y}" width="82" height="70" rx="10" fill="#17405a" opacity="${wave.toFixed(3)}" stroke="#286180" stroke-width="1"/>`);
  }
  return cells.join("");
}

function miniMap(x, y, width, height, time) {
  const dots = Array.from({ length: 9 }, (_, index) => `<circle cx="${x + 35 + index % 3 * width / 3}" cy="${y + 35 + Math.floor(index / 3) * height / 3}" r="8" fill="#55e4ff" opacity="0.7"/>`).join("");
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="20" fill="#113952"/><path d="M${x + 30} ${y + height - 40} C${x + width * 0.35} ${y + height * 0.3},${x + width * 0.65} ${y + height * 0.8},${x + width - 30} ${y + 40}" stroke="#5e7bff" stroke-width="6" fill="none" stroke-dasharray="12 9"/>${dots}<circle cx="${x + 30 + ((time * 45) % Math.max(1, width - 60))}" cy="${y + height / 2}" r="18" fill="#ffffff" stroke="#55e4ff" stroke-width="5"/>`;
}

function strategyCard(title, detail, active, y) {
  return `<g transform="translate(0 ${y})"><rect width="610" height="115" rx="24" fill="#0b2b47" stroke="${active > 0.5 ? "#52e2ff" : "#2b5873"}" stroke-width="${2 + active * 3}"/><circle cx="55" cy="57" r="19" fill="${active > 0.5 ? "#54e4ff" : "#315d76"}"/><text x="95" y="51" font-size="28" font-weight="720" fill="#ffffff">${title}</text><text x="95" y="84" font-size="22" fill="#8fb4ca">${detail}</text></g>`;
}

function queueChip(label, x, shiftedTime) {
  const active = smoothstep(0.4, 1.1, shiftedTime);
  return `<g transform="translate(${x} 0)" opacity="${active.toFixed(3)}"><rect width="220" height="68" rx="20" fill="#0b2c47" stroke="#45dfff" stroke-width="2"/><text x="110" y="44" text-anchor="middle" font-size="24" fill="#dff9ff">${label}</text></g>`;
}

function serverBox(title, detail, color) {
  return `<rect width="390" height="250" rx="35" fill="#0a2943" stroke="${color}" stroke-width="4" filter="url(#shadow)"/><circle cx="65" cy="65" r="23" fill="${color}" filter="url(#glow)"/><text x="110" y="78" font-size="37" font-weight="780" fill="#ffffff">${title}</text><text x="195" y="145" text-anchor="middle" font-size="27" fill="#9fc2d7">${detail}</text><rect x="55" y="180" width="280" height="18" rx="9" fill="#163c58"/><rect x="55" y="180" width="190" height="18" rx="9" fill="${color}" opacity="0.75"/>`;
}

function legend(label, color, x) {
  return `<g transform="translate(${x} 0)"><circle cx="12" cy="12" r="10" fill="${color}"/><text x="34" y="22" font-size="23" fill="#a8c7d9">${label}</text></g>`;
}

function movingGrid(time, seed) {
  const offset = (time * (14 + seed)) % 90;
  return `<g opacity="0.07">${Array.from({ length: 25 }, (_, index) => `<line x1="${index * 90 + offset}" y1="0" x2="${index * 90 + offset - 300}" y2="1080" stroke="#3f88aa" stroke-width="1"/>`).join("")}${Array.from({ length: 14 }, (_, index) => `<line x1="0" y1="${index * 90}" x2="1920" y2="${index * 90}" stroke="#3f88aa" stroke-width="1"/>`).join("")}</g>`;
}

function particles(time, seed) {
  return Array.from({ length: 30 }, (_, index) => {
    const x = ((index * 173 + seed * 71 + time * (35 + index % 4 * 8)) % 2050) - 70;
    const y = 70 + ((index * 101 + seed * 53 + Math.sin(time * 0.5 + index) * 120) % 900 + 900) % 900;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${2 + index % 3}" fill="#67e9ff" opacity="${(0.07 + index % 5 * 0.018).toFixed(3)}"/>`;
  }).join("");
}

function interpolatePath(points, progress) {
  const scaled = clamp(progress) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  return [points[index][0] + (points[index + 1][0] - points[index][0]) * local, points[index][1] + (points[index + 1][1] - points[index][1]) * local];
}

function partialPolyline(points, progress) {
  const scaled = clamp(progress) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const result = points.slice(0, index + 1);
  const local = scaled - index;
  result.push([points[index][0] + (points[index + 1][0] - points[index][0]) * local, points[index][1] + (points[index + 1][1] - points[index][1]) * local]);
  return result.map((point) => point.join(",")).join(" ");
}

function createSubtitleCues(text, offset, duration) {
  const sentences = text.split(/(?<=[。！？])/).map((item) => item.trim()).filter(Boolean);
  const total = sentences.reduce((sum, sentence) => sum + sentence.length, 0);
  let cursor = offset;
  return sentences.map((sentence, index) => {
    const cueDuration = index === sentences.length - 1 ? offset + duration - cursor : duration * sentence.length / total;
    const cue = { start: cursor, end: cursor + cueDuration, text: sentence };
    cursor = cue.end;
    return cue;
  });
}

async function configureFont() {
  const configPath = path.join(cacheDir, "fonts.conf");
  const fontCache = path.join(root, ".cache/video/fontconfig");
  await fs.mkdir(fontCache, { recursive: true });
  await fs.writeFile(configPath, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${escapeXml(path.dirname(fontPath))}</dir><cachedir>${escapeXml(fontCache)}</cachedir></fontconfig>`);
  process.env.FONTCONFIG_FILE = configPath;
}

async function findAudio(basePath) {
  for (const extension of [".mp3", ".wav", ".m4a"]) {
    if (await fileExists(`${basePath}${extension}`)) return `${basePath}${extension}`;
  }
  return null;
}

async function probeDuration(file) {
  try {
    const result = await execFileAsync(ffmpegPath, ["-i", file, "-f", "null", "-"], { maxBuffer: 4 * 1024 * 1024 });
    const match = String(result.stderr || "").match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (match) return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
  } catch (error) {
    const match = String(error.stderr || "").match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (match) return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
    throw error;
  }
  throw new Error(`无法读取媒体时长: ${file}`);
}

async function runFfmpeg(args) {
  await execFileAsync(ffmpegPath, args, { maxBuffer: 8 * 1024 * 1024 });
}

function onceDrain(stream) {
  return new Promise((resolve, reject) => {
    const onDrain = () => { stream.off("error", onError); resolve(); };
    const onError = (error) => { stream.off("drain", onDrain); reject(error); };
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

async function fileExists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

function smoothstep(start, end, value) {
  const amount = clamp((value - start) / Math.max(0.0001, end - start));
  return amount * amount * (3 - 2 * amount);
}

function easeOutBack(value) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (value - 1) ** 3 + c1 * (value - 1) ** 2;
}

function clamp(value) { return Math.max(0, Math.min(1, value)); }

function wrapText(value, length) {
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
