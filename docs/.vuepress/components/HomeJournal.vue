<script setup lang="ts">
import { withBase } from '@vuepress/client';

interface HomePost { title: string; summary: string; date: string; path: string }
declare const __HOME_POSTS__: HomePost[];
const posts = __HOME_POSTS__;
const topics = [
  { number: '01', title: 'Java 与系统架构', text: '从并发、微服务到分布式一致性，理解工程背后的取舍。', link: '/article/2026/202609050001.html', label: '阅读工程系列' },
  { number: '02', title: 'AI 应用与智能体', text: '从 RAG、工具调用到 Agent，把模型能力接入真实业务。', link: '/article/2026/202609050004.html', label: '探索 AI 应用' },
  { number: '03', title: '数据工程与实践', text: 'SQL、指标体系、智能问数，一条从基础到项目的学习路线。', link: '/article/2026/202609211100.html', label: '查看学习指南' },
];
const resources = [
  { title: '线性代数的本质', text: '用图像建立向量与空间的直觉', link: '/video/linearalgebra/' },
  { title: '微积分的本质', text: '理解变化、累积与它们的联系', link: '/video/calculus/' },
  { title: '深度学习', text: '从神经网络到梯度下降', link: '/video/deeplearn/' },
  { title: '技术手册', text: '需要时，快速找到参考资料', link: '/handbook/' },
];
</script>

<template>
  <div class="journal">
    <section class="journal-intro" aria-labelledby="main-title">
      <div class="journal-intro-copy">
        <p class="journal-eyebrow"><span aria-hidden="true"></span> 技术笔记 · 开源实践 · 持续探索</p>
        <h1 id="main-title">布衣云水客<span>把想法写下来，<br />把技术用起来。</span></h1>
        <p class="journal-lead">在代码与生活之间，记录值得分享的发现。<br class="journal-desktop-break" />聊 Java 架构、AI 应用，也聊从原理到实践的那一步。</p>
        <div class="journal-actions">
          <a class="journal-button" :href="withBase('/article/')">开始阅读 <span aria-hidden="true">↗</span></a>
          <a class="journal-text-link" href="#latest">看看最近在写什么 <span aria-hidden="true">↓</span></a>
        </div>
        <p class="journal-signature">布衣之心，云水之行；以技会友，以文载道。</p>
      </div>
      <div class="journal-note" aria-hidden="true">
        <div class="journal-note-top"><span>FIELD NOTES</span><span>随记 / 实践</span></div>
        <div class="journal-note-symbol">云水之间<br /><span>自有新知</span></div>
        <div class="journal-note-bottom"><span>思考 → 构建 → 分享</span><span>↗</span></div>
      </div>
    </section>

    <section class="journal-project" aria-labelledby="project-title">
      <div class="journal-project-copy">
        <p class="journal-eyebrow">正在构建 / OPEN SOURCE</p>
        <h2 id="project-title">聚义 JuyiAI</h2>
        <p class="journal-project-tagline">让 AI 各展所长，把事情办成。</p>
        <p>以事项为中心的开源多 Agent 协作工作台。把需求、承办、议事与验收连起来，让协作不止停留在聊天里。</p>
        <div class="journal-tags"><span>多 Agent</span><span>MIT 开源</span><span>开源内测</span></div>
        <div class="journal-actions">
          <a class="journal-button" :href="withBase('/article/2026/202611121600.html')">认识这个项目 <span aria-hidden="true">↗</span></a>
          <a class="journal-text-link" href="https://juyi.chcbz.net/demo" target="_blank" rel="noopener noreferrer">体验 Demo ↗</a>
        </div>
        <p class="journal-project-note">免登录 Demo 为模拟交互，不调用真实 Agent。</p>
      </div>
      <a class="journal-project-preview" :href="withBase('/article/2026/202611121600.html')" aria-label="阅读聚义 JuyiAI 项目介绍">
        <img :src="withBase('/assets/202611121600/juyiai-demo-result.png')" alt="聚义公开 Demo 的成果与验收界面，内容为模拟示例" width="1440" height="1000" loading="lazy" />
        <span>从一个目标，到一份可检查的成果 <span aria-hidden="true">↗</span></span>
      </a>
    </section>

    <section id="latest" class="journal-section" aria-labelledby="latest-title">
      <div class="journal-section-heading"><div><p class="journal-eyebrow">RECENT WRITING</p><h2 id="latest-title">最近更新</h2></div><a class="journal-text-link" :href="withBase('/article/')">全部文章 <span aria-hidden="true">↗</span></a></div>
      <div class="journal-posts">
        <a v-for="(post, index) in posts" :key="post.path" class="journal-post" :href="withBase(post.path)">
          <div class="journal-post-meta"><time :datetime="post.date">{{ post.date.replaceAll('-', '.') }}</time><span v-if="index === 0">最新文章</span></div>
          <h3>{{ post.title }}</h3>
          <p v-if="post.summary">{{ post.summary }}</p>
          <span class="journal-post-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section class="journal-section" aria-labelledby="topics-title">
      <div class="journal-section-heading"><div><p class="journal-eyebrow">EXPLORE BY TOPIC</p><h2 id="topics-title">沿着兴趣，深入一点</h2></div></div>
      <div class="journal-topics"><a v-for="topic in topics" :key="topic.number" class="journal-topic" :href="withBase(topic.link)"><span class="journal-topic-number">{{ topic.number }} /</span><h3>{{ topic.title }}</h3><p>{{ topic.text }}</p><span class="journal-topic-link">{{ topic.label }} <span aria-hidden="true">↗</span></span></a></div>
    </section>

    <section class="journal-section journal-library" aria-labelledby="library-title">
      <div class="journal-section-heading"><div><p class="journal-eyebrow">BACK TO BASICS</p><h2 id="library-title">慢慢学，打好底子</h2></div><a class="journal-text-link" :href="withBase('/video/')">更多课程 ↗</a></div>
      <div class="journal-resources"><a v-for="resource in resources" :key="resource.link" :href="withBase(resource.link)"><h3>{{ resource.title }} <span aria-hidden="true">↗</span></h3><p>{{ resource.text }}</p></a></div>
    </section>
    <div class="journal-end"><span>保持好奇，持续构建。</span><a href="https://github.com/chcbz" target="_blank" rel="noopener noreferrer">在 GitHub 相遇 ↗</a></div>
  </div>
</template>
