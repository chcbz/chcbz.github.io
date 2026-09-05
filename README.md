# 布衣云水客

一个善良无私、待人真挚的字典小民。

## 文章同步发布

向 `main` 分支推送 `docs/article/**/*.md` 下的新增文章时，GitHub Actions 会在部署博客前尝试同步到微信公众号和 CSDN。修改已有文章不会重复发布；工作流重跑也会跳过同步步骤，避免产生重复文章。

### GitHub 配置

在仓库的 `Settings -> Secrets and variables -> Actions` 中配置：

| 类型 | 名称 | 必填 | 说明 |
| --- | --- | --- | --- |
| Secret | `WECHAT_APP_ID` | 微信必填 | 公众号 AppID |
| Secret | `WECHAT_APP_SECRET` | 微信必填 | 公众号 AppSecret |
| Secret | `WECHAT_THUMB_MEDIA_ID` | 可选 | 默认封面永久素材 ID；建议每篇文章设置自己的 `cover` |
| Variable | `WECHAT_PUBLISH_MODE` | 可选 | `draft` 或 `publish`，默认 `draft` |
| Secret | `CSDN_COOKIE` | CSDN 必填 | 登录 CSDN 后浏览器请求中的完整 Cookie |
| Variable | `CSDN_USERNAME` | 推荐 | 用于拼接发布后的文章地址 |
| Variable | `CSDN_PUBLISH_MODE` | 可选 | `draft` 或 `publish`，默认 `draft` |

未配置某个平台的凭证时，该平台会被跳过。已配置平台发生发布错误时，工作流会失败，从而避免误以为同步成功。

微信公众号官方接口通常要求调用方 IP 位于白名单。GitHub 托管 Runner 的出口 IP 不固定，因此正式启用微信同步时，建议改用具有固定公网出口的 self-hosted Runner。

CSDN 当前没有面向个人博客稳定公开的发文 API；脚本使用其网页编辑器接口和 Cookie，可能随 CSDN 页面升级而需要调整。建议先保持 `CSDN_PUBLISH_MODE=draft` 验证一段时间，并定期更新 `CSDN_COOKIE`。

### 文章配置

默认同时同步两个平台。可以在文章 front matter 中关闭全部或单个平台：

```yaml
---
title: 示例文章
author: 布衣云水客
summary: 用于微信公众号摘要和 CSDN 描述
cover: ./assets/example/cover.png
syndicate:
  wechat: true
  csdn: false
---
```

`cover` 支持文章目录相对路径、`docs/.vuepress/public` 下的绝对路径和网络地址。未设置 `cover` 时会使用正文第一张图片；两者都没有时发布失败，不再使用默认 Logo。正文中的本地图片会上传到微信素材服务；同步到 CSDN 时会改写成博客站点的绝对地址。

微信公众号同步时会通过 Mermaid Ink 将 `mermaid` 和 `flowchart` 代码块渲染为 PNG，再上传到微信图片素材服务。可以通过 `MERMAID_INK_URL`、`MERMAID_THEME` 和 `MERMAID_BACKGROUND` 自定义渲染服务和样式。

普通 fenced code block 会转换为逐行块级 HTML，避免微信公众号清理 `<pre>` 样式后将所有代码显示在同一行，同时保留空行和缩进。

VuePress 的 `tip`、`info`、`warning`、`danger`、`details` 容器会转换为带内联样式的提示块；表格、四至六级标题、列表、链接、行内代码和分隔线也会补充微信公众号兼容样式。`$...$` 行内 LaTeX 公式会通过 CodeCogs 转换为 PNG 后上传到微信图片素材服务。

### 微信发布守则

- 新文章按标题检查现有草稿，标题已存在时默认跳过，避免重复创建。
- 重建草稿时必须先成功创建新草稿，再删除同标题旧草稿；创建失败时保留旧草稿。
- 封面必须与文章内容相关；没有可用图片时生成新封面，不使用默认站点 Logo。
- 发布或重建后检查草稿总数、唯一标题数、重复标题以及实际保存后的 HTML 格式。
- 需要声明原创时先确认公众号接口和账号能力；当前接口无法确认原创状态时保留为草稿，并在公众号后台手动选择“声明原创”后发布。
- 不在仓库、日志或技能文件中保存、打印微信公众号密钥和 access token。

### 本地校验

```bash
pnpm install
pnpm run test:syndicate
pnpm run publish:syndicate:dry-run -- docs/article/2026/202608170000.md
```

将所有中文文章按标题去重后批量保存到公众号草稿箱：

```bash
pnpm run publish:wechat:all
```

替换所有使用 `wechat-cover.png` 生成封面的公众号草稿：

```bash
pnpm run replace:wechat:generated-covers
```

重新生成所有包含 Mermaid/flowchart 的公众号草稿：

```bash
pnpm run replace:wechat:diagrams
```

重新生成所有包含普通代码块的公众号草稿：

```bash
pnpm run replace:wechat:code-blocks
```

重新生成所有包含 VuePress 容器、表格、四至六级标题或 LaTeX 公式的公众号草稿：

```bash
pnpm run replace:wechat:formats
```

需要手动发布指定文章时，可在本地设置对应环境变量后运行：

```bash
pnpm run publish:syndicate -- docs/article/2026/202608170000.md
```

### B站视频样片

将最新的 Xray 网络演进文章生成 1080P 解说视频、字幕和投稿封面：

```bash
pnpm run video:bilibili:sample
```

生成结果保存到 `output/video/202608170000/`。旁白默认使用 `zh-CN-YunxiNeural`，可通过 `BILIBILI_TTS_VOICE` 和 `BILIBILI_TTS_RATE` 调整。

首次使用时扫码登录，然后将视频保存为 B站原创投稿草稿：

```bash
pnpm run bilibili:login
pnpm run bilibili:draft
```

登录状态只保存在 `.cache/bilibili/`，不会提交到仓库。投稿默认使用 `科技 / 计算机技术` 分区、声明原创并禁止转载。
