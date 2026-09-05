import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as i,c as d,f as l,b as s,d as r,e as o}from"./app-E1vXAF15.js";const c={},p={class:"hint-container info"},h={href:"https://github.com/chcbz/isp-install",target:"_blank",rel:"noopener noreferrer"};function u(v,n){const a=t("ExternalLinkIcon");return i(),d("div",null,[n[2]||(n[2]=l(`<div class="hint-container tip"><p class="hint-container-title">一键部署，解放双手</p><p>还在为服务器环境搭建焦头烂额？ISP Install 来拯救你！一套脚本搞定所有常用服务，从此告别重复劳动 🚀</p></div><h2 id="🎯-项目概要" tabindex="-1"><a class="header-anchor" href="#🎯-项目概要" aria-hidden="true">#</a> 🎯 项目概要</h2><p><strong>ISP Install</strong> 是一套专为 Linux 系统设计的<strong>服务器环境快速部署脚本集合</strong>。它的核心理念很简单：<strong>从源码编译安装</strong>，让你拥有对每一个组件的完全控制权。</p><p>无论是搭建 Web 服务器、数据库集群，还是配置 CI/CD 流水线，ISP Install 都能帮你一键搞定！</p><hr><h2 id="🖥️-支持的操作系统" tabindex="-1"><a class="header-anchor" href="#🖥️-支持的操作系统" aria-hidden="true">#</a> 🖥️ 支持的操作系统</h2><table><thead><tr><th>系统</th><th>版本</th><th>状态</th></tr></thead><tbody><tr><td>CentOS</td><td>7, 8</td><td>✅ 完全支持</td></tr><tr><td>Rocky Linux</td><td>8, 9</td><td>✅ 完全支持</td></tr><tr><td>AlmaLinux</td><td>8, 9</td><td>✅ 完全支持</td></tr><tr><td>RHEL</td><td>7, 8, 9</td><td>✅ 完全支持</td></tr><tr><td>Ubuntu</td><td>18.04, 20.04, 22.04, 24.04</td><td>✅ 完全支持</td></tr><tr><td>Debian</td><td>10, 11, 12</td><td>✅ 完全支持</td></tr></tbody></table><p>脚本会自动检测操作系统类型，智能使用对应的包管理器（yum/dnf 或 apt），完全不用操心系统差异！</p><hr><h2 id="📁-目录结构" tabindex="-1"><a class="header-anchor" href="#📁-目录结构" aria-hidden="true">#</a> 📁 目录结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── bin/          # 服务管理脚本 (start/stop/restart/status)
├── shell/        # 安装脚本 (从源码编译安装)
├── pkgs/         # 软件包存放目录
├── conf/         # 配置文件模板
├── docs/         # 文档
└── systemd/      # Systemd 服务文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🚀-快速开始" tabindex="-1"><a class="header-anchor" href="#🚀-快速开始" aria-hidden="true">#</a> 🚀 快速开始</h2><h3 id="方式一-一键部署-推荐" tabindex="-1"><a class="header-anchor" href="#方式一-一键部署-推荐" aria-hidden="true">#</a> 方式一：一键部署（推荐）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化服务器</span>
<span class="token function">sudo</span> ./shell/init.sh

<span class="token comment"># 使用预设配置安装</span>
<span class="token function">sudo</span> ./install.sh <span class="token parameter variable">--profile</span> web-server    <span class="token comment"># Web 服务器</span>
<span class="token function">sudo</span> ./install.sh <span class="token parameter variable">--profile</span> dev-env       <span class="token comment"># 开发环境</span>
<span class="token function">sudo</span> ./install.sh <span class="token parameter variable">--profile</span> db-server     <span class="token comment"># 数据库服务器</span>
<span class="token function">sudo</span> ./install.sh <span class="token parameter variable">--profile</span> ci-cd         <span class="token comment"># CI/CD 服务器</span>

<span class="token comment"># 交互式选择安装</span>
<span class="token function">sudo</span> ./install.sh <span class="token parameter variable">--select</span>

<span class="token comment"># 指定组件安装</span>
<span class="token function">sudo</span> ./install.sh nginx mysql redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式二-单独安装" tabindex="-1"><a class="header-anchor" href="#方式二-单独安装" aria-hidden="true">#</a> 方式二：单独安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 初始化服务器</span>
<span class="token function">sudo</span> ./shell/init.sh

<span class="token comment"># 2. 按需安装软件</span>
<span class="token function">sudo</span> ./shell/jdk_install.sh
<span class="token function">sudo</span> ./shell/mysql_install.sh
<span class="token function">sudo</span> ./shell/nginx_install.sh
<span class="token function">sudo</span> ./shell/redis_install.sh

<span class="token comment"># 3. 使环境变量生效</span>
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🛠️-支持的软件" tabindex="-1"><a class="header-anchor" href="#🛠️-支持的软件" aria-hidden="true">#</a> 🛠️ 支持的软件</h2><p>ISP Install 支持的软件覆盖了服务器运维的方方面面：</p><table><thead><tr><th>类别</th><th>软件</th><th>说明</th></tr></thead><tbody><tr><td><strong>Web 服务器</strong></td><td>Nginx 1.28.2, Apache httpd</td><td>反向代理、Web 服务</td></tr><tr><td><strong>数据库</strong></td><td>MySQL 8.0.45</td><td>关系型数据库</td></tr><tr><td><strong>缓存/消息</strong></td><td>Redis 7.4.8, RabbitMQ 3.12.13</td><td>缓存、消息队列</td></tr><tr><td><strong>开发环境</strong></td><td>JDK 21.0.10, Maven 3.9.6, Node.js LTS, Python 3.12.13, PHP 8.2.26</td><td>编程语言和构建工具</td></tr><tr><td><strong>版本控制</strong></td><td>Git 2.53.0, Gitblit, SVN</td><td>代码仓库管理</td></tr><tr><td><strong>CI/CD</strong></td><td>Jenkins 2.440.1, Nexus 3.66.0-02</td><td>持续集成、制品库</td></tr><tr><td><strong>文件服务</strong></td><td>Pure-FTPd 1.0.53</td><td>FTP 服务器</td></tr><tr><td><strong>目录服务</strong></td><td>OpenLDAP 2.6.13</td><td>LDAP 目录服务</td></tr><tr><td><strong>VPN</strong></td><td>Libreswan, StrongSwan, PPTP</td><td>IPsec/L2TP VPN</td></tr><tr><td><strong>邮件服务</strong></td><td>Postfix, Dovecot</td><td>邮件服务器</td></tr><tr><td><strong>DNS</strong></td><td>BIND</td><td>DNS 服务器</td></tr><tr><td><strong>搜索引擎</strong></td><td>Elasticsearch 8.12.2 + IK分词, Logstash, Kibana</td><td>ELK 日志分析栈</td></tr><tr><td><strong>其他</strong></td><td>OpenSSL, Tomcat</td><td>SSL 库、应用服务器</td></tr></tbody></table><hr><h2 id="🔧-核心组件" tabindex="-1"><a class="header-anchor" href="#🔧-核心组件" aria-hidden="true">#</a> 🔧 核心组件</h2><h3 id="shell-common-sh-通用工具库" tabindex="-1"><a class="header-anchor" href="#shell-common-sh-通用工具库" aria-hidden="true">#</a> shell/common.sh - 通用工具库</h3><p>提供跨系统兼容的核心功能：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 加载工具库</span>
<span class="token builtin class-name">source</span> ./shell/common.sh

<span class="token comment"># 检测系统</span>
detect_os
show_os_info

<span class="token comment"># 智能安装（自动处理包名差异）</span>
pkg_install_smart gcc-c++ openssl-devel

<span class="token comment"># 通用函数</span>
check_root          <span class="token comment"># 检查 root 权限</span>
download_file URL   <span class="token comment"># 下载文件</span>
compile_install <span class="token punctuation">..</span>. <span class="token comment"># 编译安装</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="智能包名映射" tabindex="-1"><a class="header-anchor" href="#智能包名映射" aria-hidden="true">#</a> 智能包名映射</h3><p>不同系统的包名差异会自动处理，告别手动查找包名的烦恼：</p><table><thead><tr><th>RHEL/CentOS</th><th>Ubuntu/Debian</th></tr></thead><tbody><tr><td>openssl-devel</td><td>libssl-dev</td></tr><tr><td>gcc-c++</td><td>g++</td></tr><tr><td>ncurses-devel</td><td>libncurses-dev</td></tr><tr><td>zlib-devel</td><td>zlib1g-dev</td></tr></tbody></table><hr><h2 id="🔥-防火墙配置" tabindex="-1"><a class="header-anchor" href="#🔥-防火墙配置" aria-hidden="true">#</a> 🔥 防火墙配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开放服务端口</span>
<span class="token function">sudo</span> ./shell/firewall.sh <span class="token function">open</span> nginx
<span class="token function">sudo</span> ./shell/firewall.sh <span class="token function">open</span> mysql
<span class="token function">sudo</span> ./shell/firewall.sh <span class="token function">open</span> redis

<span class="token comment"># 查看已开放端口</span>
<span class="token function">sudo</span> ./shell/firewall.sh list

<span class="token comment"># 查看可用服务</span>
<span class="token function">sudo</span> ./shell/firewall.sh services
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📦-安装位置" tabindex="-1"><a class="header-anchor" href="#📦-安装位置" aria-hidden="true">#</a> 📦 安装位置</h2><p>所有软件默认安装到 <code>/home/isp/apps/</code> 目录，结构清晰，便于管理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/home/isp/apps/
├── mysql/
├── nginx/
├── redis/
├── openldap/
├── java/
├── maven/
└── ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="⭐-项目优势" tabindex="-1"><a class="header-anchor" href="#⭐-项目优势" aria-hidden="true">#</a> ⭐ 项目优势</h2><h3 id="_1-🎯-开箱即用" tabindex="-1"><a class="header-anchor" href="#_1-🎯-开箱即用" aria-hidden="true">#</a> 1. 🎯 开箱即用</h3><p>预设多种部署场景配置文件，一条命令即可完成复杂环境搭建：</p><ul><li><code>web-server</code> - Web 服务器套餐</li><li><code>dev-env</code> - 开发环境套餐</li><li><code>db-server</code> - 数据库服务器套餐</li><li><code>ci-cd</code> - CI/CD 服务器套餐</li></ul><h3 id="_2-🔒-安全优先" tabindex="-1"><a class="header-anchor" href="#_2-🔒-安全优先" aria-hidden="true">#</a> 2. 🔒 安全优先</h3><ul><li>所有密码通过环境变量或交互式输入，<strong>绝不硬编码</strong></li><li>组件更新到最新稳定版本，包含重要安全修复</li><li>敏感脚本已标记废弃，不推荐使用</li></ul><h3 id="_3-🌐-跨平台兼容" tabindex="-1"><a class="header-anchor" href="#_3-🌐-跨平台兼容" aria-hidden="true">#</a> 3. 🌐 跨平台兼容</h3><ul><li>自动检测操作系统类型</li><li>智能处理包管理器差异（yum/dnf/apt）</li><li>包名映射自动转换</li></ul><h3 id="_4-📦-源码编译安装" tabindex="-1"><a class="header-anchor" href="#_4-📦-源码编译安装" aria-hidden="true">#</a> 4. 📦 源码编译安装</h3><p>相比包管理器安装的优势：</p><ul><li>版本可控，想装哪个版本就装哪个</li><li>编译优化，性能更佳</li><li>功能可定制，按需启用/禁用模块</li></ul><h3 id="_5-🎛️-灵活的部署方式" tabindex="-1"><a class="header-anchor" href="#_5-🎛️-灵活的部署方式" aria-hidden="true">#</a> 5. 🎛️ 灵活的部署方式</h3><ul><li>支持一键预设配置</li><li>支持交互式选择</li><li>支持单独组件安装</li><li>满足不同场景需求</li></ul><hr><h2 id="⚙️-环境变量配置" tabindex="-1"><a class="header-anchor" href="#⚙️-环境变量配置" aria-hidden="true">#</a> ⚙️ 环境变量配置</h2><p>部分安装脚本需要设置环境变量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># MySQL</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token string">&quot;your_secure_password&quot;</span>

<span class="token comment"># RabbitMQ</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">RABBITMQ_ADMIN_PASSWORD</span><span class="token operator">=</span><span class="token string">&quot;your_rabbitmq_password&quot;</span>

<span class="token comment"># VPN (StrongSwan)</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">VPN_PSK</span><span class="token operator">=</span><span class="token string">&quot;your_psk_key&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">VPN_XAUTH_PASS</span><span class="token operator">=</span><span class="token string">&quot;your_xauth_password&quot;</span>

<span class="token comment"># Maven (Nexus)</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">NEXUS_PASSWORD</span><span class="token operator">=</span><span class="token string">&quot;your_nexus_password&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="⚠️-注意事项" tabindex="-1"><a class="header-anchor" href="#⚠️-注意事项" aria-hidden="true">#</a> ⚠️ 注意事项</h2><ol><li><strong>权限要求</strong>：需要 root 权限执行安装脚本</li><li><strong>网络要求</strong>：需要访问外网下载源码包和配置文件</li><li><strong>系统架构</strong>：目前仅支持 x86_64 (AMD64)</li><li><strong>数据备份</strong>：建议在安装前备份重要数据</li><li><strong>防火墙</strong>：安装后需根据服务开放相应端口</li></ol><hr><h2 id="🔗-项目链接" tabindex="-1"><a class="header-anchor" href="#🔗-项目链接" aria-hidden="true">#</a> 🔗 项目链接</h2>`,59)),s("div",p,[n[1]||(n[1]=s("p",{class:"hint-container-title"},"GitHub 仓库",-1)),s("p",null,[s("a",h,[n[0]||(n[0]=r("https://github.com/chcbz/isp-install",-1)),o(a)])])]),n[3]||(n[3]=s("p",null,"如果你正在寻找一套可靠的服务器部署解决方案，ISP Install 绝对值得一试！欢迎 Star ⭐ 和贡献代码 💻",-1))])}const g=e(c,[["render",u],["__file","202604091345.html.vue"]]);export{g as default};
