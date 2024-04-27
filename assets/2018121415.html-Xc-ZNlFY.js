import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as n,f as e}from"./app-5ZyUDSyM.js";const t="/assets/img-20230408001347-hkcXp0Ka.png",l={},p=e('<p>​</p><figure><img src="'+t+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>It is a tedious and painful thing to configure a new server every time, and you have to remember various commands. Lazy people always have a lazy way. Let’s write the installation process of commonly used tools as an automated script. Just copy and paste, and the rest is time for coffee.</p><p>Premise: All the scripts below are based on centos7. Other distributions of Linux have not been tested and may not be successful. First, the environment initialization script must be executed. By default, an isp user will be created, and all tools will be installed in the /home/isp/apps directory.</p><p>Usage: Copy the script directly and execute it on any path of the shell.</p><p>1.Environment initialization</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/init.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.Upgrade openssl</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/openssl_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.Install nginx</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/nginx_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4.Install mysql</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/mysql_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5.Install rabbitmq</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/rabbitmq_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>6.Install JDK</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/jdk_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>7.Install maven</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/maven_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>8.Install redis</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/redis_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>9.Install git</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/git_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>10.Install jenkins</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/jenkins_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>11.Install pureftpd</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/pureftpd_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>12.Install gitblit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/gitblit_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>13.Install php</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/php_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>14.Install openldap</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/openldap_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>15.Install node</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/node_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>16.Install python</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/python_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>17.Install nexus</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-L</span> http://install.chcbz.net/shell/nexus_install.sh<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,39),i=[p];function c(r,o){return s(),n("div",null,i)}const b=a(l,[["render",c],["__file","2018121415.html.vue"]]);export{b as default};
