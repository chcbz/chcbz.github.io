import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as r,c as t,b as n,d as e,e as a,f as s}from"./app-5ZyUDSyM.js";const c={},o={href:"http://www1.360quan.com/blog/show/4823429",target:"_blank",rel:"noopener noreferrer"},p=s(`<p>1、Rewrite功能：</p><p>Rewirte主要的功能就是实现URL的跳转，它的正则表达式是基于Perl语言。可基于服务器级的(httpd.conf)和目录级的 (.htaccess)两种方式。如果要想用到rewrite模块，必须先安装或加载rewrite模块。方法有两种一种是编译apache的时候就直接安装rewrite模块，别一种是编译apache时以DSO模式安装apache,然后再利用源码和apxs来安装rewrite模块。</p><p>基于服务器级的(httpd.conf)有两种方法，一种是在httpd.conf的全局下直接利用RewriteEngine on来打开rewrite功能;另一种是在局部里利用RewriteEngine on来打开rewrite功能,下面将会举例说明，需要注意的是,必须在每个virtualhost里用RewriteEngine on来打开rewrite功能。否则virtualhost里没有RewriteEngine on它里面的规则也不会生效。</p><p>基于目录级的(.htaccess),要注意一点那就是必须打开此目录的FollowSymLinks属性且在.htaccess里要声明RewriteEngine on。</p><p>2、举例说明：</p><p>例一.下面是在一个虚拟主机里定义的规则。功能是把client请求的主机前缀不是www.kiya.cn和70.40.213.183都跳转到主机前缀为<code>http://www.kiya.cn</code>，避免相同内容的网页有多个指向的域名，如<code>http://kiya.cn</code>。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>NameVirtualHost 70.40.213.183:80 
ServerAdmin slj@kiya.cn 
DocumentRoot “/web” 
ServerName kiya.cn 
RewriteEngine on #打开rewirte功能 
RewriteCond %{HTTP_HOST} !^www.kiya.cn [NC] #声明Client请求的主机中前缀不是www.kiya.cn，其中 [NC] 的意思是忽略大小写 
RewriteCond %{HTTP_HOST} !^70.40.213.183 [NC] #声明Client请求的主机中前缀不是70.40.213.183，其中 [NC] 的意思是忽略大小写 
RewriteCond %{HTTP_HOST} !^$ #声明Client请求的主机中前缀不为空 
RewriteRule ^(.*) http://www.kiya.cn/ [L] #含义是如果Client请求的主机中的前缀符合上述条件，则直接进行跳转到&#39;http://www.kiya.cn/&#39;,[L]意味着立即停止重写操作，并不再应用其他重写规则。这里的.*是指匹配所有URL中不包含换行字符，()括号的功能是把所有的字符做一个标记，以便于后面的应用.就是引用前面里的 (.*)字符。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例二.将输入<code>en.tsas.cn</code>的域名时跳转到<code>www.tsas.cn</code></p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteEngine on 
RewriteCond %{HTTP_HOST} ^en.tsas.cn [NC] 
RewriteRule ^(.*) &lt;http://www.tsas.cn/&gt; [L]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例三.赛卡软件近期更换了域名，新域名为<code>www.tsas.cn</code>, 更加简短好记。这时需要将原来的域名<code>ss.kiya.cn</code>, 以及论坛所在地址<code>ss.kiya.cn/bbs/</code>定向到新的域名，以便用户可以找到，并且使原来的论坛 URL 继续有效而不出现 404 未找到，比如原来的<code>http://ss.kiya.cn/bbs/tread-60.html</code>, 让它在新的域名下继续有效，点击后转发到<code>http://bbs.tsas.cn/tread-60.html</code>，而其他网页，如原先的<code>http://ss.kiya.cn/purchase</code>不会到二级域名<code>bbs.tsas.cn/purchase</code>上，而是到<code>www.tsas.cn/purchase</code><br> 按照这样的要求重定向规则应该这样写：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteEngine On 
RewriteCond %{REQUEST_URI} ^/bbs/ 
RewriteRule ^bbs/(.*) http://bbs.tsas.cn/$1 [R=permanent,L] 
RewriteCond %{REQUEST_URI} !^/bbs/ 
RewriteRule ^(.*) http://www.tsas.cn/$1 [R=permanent,L]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.Apache mod_rewrite规则重写的标志一览</p><ol><li>R[=code](force redirect) 强制外部重定向<br> 强制在替代字符串加上<code>http://thishost[:thisport]/</code>前缀重定向到外部的URL.如果code不指定，将用缺省的302 HTTP状态码。</li><li>F(force URL to be forbidden)禁用URL,返回403HTTP状态码。</li><li>G(force URL to be gone) 强制URL为GONE，返回410HTTP状态码。</li><li>P(force proxy) 强制使用代理转发。</li><li>L(last rule) 表明当前规则是最后一条规则，停止分析以后规则的重写。</li><li>N(next round) 重新从第一条规则开始运行重写过程。</li><li>C(chained with next rule) 与下一条规则关联</li></ol><blockquote><p>如果规则匹配则正常处理，该标志无效，如果不匹配，那么下面所有关联的规则都跳过。</p></blockquote><ol start="8"><li>T=MIME-type(force MIME type) 强制MIME类型</li><li>NS (used only if no internal sub-request) 只用于不是内部子请求</li><li>NC(no case) 不区分大小写</li><li>QSA(query string append) 追加请求字符串</li><li>NE(no URI escaping of output) 不在输出转义特殊字符<br> 例如：RewriteRule /foo/(.*) /bar?arg=P1%3d$1 [R,NE] 将能正确的将/foo/zoo转换成/bar?arg=P1=zoo</li><li>PT(pass through to next handler) 传递给下一个处理<br> 例如：<br> RewriteRule ^/abc(.*) /def$1 [PT] # 将会交给/def规则处理<br> Alias /def /ghi</li><li>S=num(skip next rule(s)) 跳过num条规则</li><li>E=VAR:VAL(set environment variable) 设置环境变量</li></ol><p>4.Apache rewrite例子集合</p><p>URL重定向</p><p>例子一:<br> 同时达到下面两个要求：<br> 1.用<code>http://www.zzz.com/xxx.php</code> 来访问 <code>http://www.zzz.com/xxx/</code><br> 2.用<code>http://yyy.zzz.com</code> 来访问 <code>http://www.zzz.com/user.php?username=yyy</code> 的功能</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteEngine On 
RewriteCond %{HTTP_HOST} ^www.zzz.com 
RewriteCond %{REQUEST_URI} !^user.php$ 
RewriteCond %{REQUEST_URI} .php$ 
RewriteRule (.*).php$ http://www.zzz.com/$1/ [R] 
RewriteCond %{HTTP_HOST} !^www.zzz.com 
RewriteRule ^(.+) %{HTTP_HOST} [C] 
RewriteRule ^([^.]+).zzz.com http://www.zzz.com/user.php?username=$1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子二：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>/type.php?typeid=*–&gt; /type*.html
/type.php?typeid=*&amp;page=* –&gt; /type*page*.html

RewriteRule ^/type([0-9]+).html$ /type.php?typeid=$1 [PT] 
RewriteRule ^/type([0-9]+)page([0-9]+).html$ /type.php?typeid=$1&amp;page=$2 [PT]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.使用Apache的URL Rewrite配置多用户虚拟服务器</p><p>要实现这个功能，首先要在DNS服务器上打开域名的泛域名解析（自己做或者找域名服务商做）。比如，我就把 <em>.kiya.us和</em>.kiya.cn全部解析到了我的IP地址70.40.213.183上。</p><p>然后，看一下我的Apache中关于*.kiya.us的虚拟主机的设定。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>ServerAdmin webmaster@kiya.us 
DocumentRoot /home/www/www.kiya.us 
ServerName dns.kiya.us 
ServerAlias dns.kiya.us kiya.us *.kiya.us 
CustomLog /var/log/httpd/osa/access_log.log” common 
ErrorLog /var/log/httpd/osa/error_log.log” AllowOverride None Order deny,allow #AddDefaultCharset GB2312 
RewriteEngine on 
RewriteCond %{HTTP_HOST} ^[^.]+.kiya.(cn|us)$ 
RewriteRule ^(.+) %{HTTP_HOST}$1 [C] 
RewriteRule ^([^.]+).kiya.(cn|us)(.*)$ /home/www/www.kiya.us/sylvan$3?un=$1&amp;%{QUERY_STRING} [L]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段设定中，我把*.kiya.cn和*.kiya.us 的Document Root都设定到了 /home/www/www.kiya.us</p><p>继续看下去，在这里我就配置了URL Rewrite规则。</p><p>下面一句</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteRule ^(.+) %{HTTP_HOST}$1 [C] #把用户输入完整的地址（GET方式的参数除外）作为参数传给下一个规则，[C]是Chain串联下一个规则的意思
RewriteRule ^([^.]+).kiya.(cn|us)(.*)$ /home/www/dev.kiya.us/sylvan$3?un=$1&amp;%{QUERY_STRING} [L]
# 最关键的是这一句，使用证则表达式解析用户输入的URL地址，把主机名中的用户名信息作为名为un的参数传给/home/www/dev.kiya.us 目录下的脚本，并在后面跟上用户输入的GET方式的传入参数。并指明这是最后一条规则（[L]规则）。
# 注意，在这一句中指明的重写后的地址用的是服务器上的绝对路径，这是内部跳转。如果使用http://xxxx这样的URL格式，则被称为外部跳转。使用外部跳转的话，浏览着的浏览器中的URL地址会改变成新的地址，而使用内部跳转则浏览器中的地址不发生改变，看上去更像实际的二级域名虚拟服务器。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置后重启Apache服务器就大功告成了！</p><p>Update May 1, 2009</p><p>今天上网看到了有人提一个问题：</p>`,32),m=n("br",null,null,-1),u={href:"http://xn--www-628dm0m194i.im286.com",target:"_blank",rel:"noopener noreferrer"},v={href:"http://www.chinaz.com",target:"_blank",rel:"noopener noreferrer"},w=s(`<p>论坛中的答案是：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteEngine On 
RewriteCond %{HTTP_REFERER} chinaz.com [NC] 
RewriteCond %{HTTP_REFERER} im286.com [NC] RewriteRule .*.(jpg|jpeg|gif|png|rar|zip|txt|ace|torrent|gz|swf)$ http://www.xxx.com/fuck.png [R,NC,L]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Update May 7, 2009</p>`,3),b=n("br",null,null,-1),R={href:"http://lamp.linux.gov.cn/Apache/ApacheMenu/mod/mod_rewrite.html",target:"_blank",rel:"noopener noreferrer"},h=s(`<p>Update May 24, 2009</p><p>一、关于是否需要使用完全转义，比如在</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteCond %{HTTP_REFERER} chinaz.com [NC]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>中 把 <code>chinaz.com</code> 改成 <code>chinaz.com</code></p><p>答案是，两者都是可以的。</p><p>二、今天在做 <code>YOURcaddy.com</code>（就是我去年做的PlanetCoachella的变形）的时候，在 GoDaddy 主机上无法正常转向，后来找到了问题：<br> 在HostMonster以及我自己的机器上，是用</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteRule ^business/([^.]+)$ biz/detail.php?name=$1 [L]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>达到改写的。而在Godaddy主机上，是这样：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteRule ^business/([^.]+)$ /biz/detail.php?name=$1 [L]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目标文件前多了一个/<br> 现在想想，可能是因为没有指定RewriteBase，至于到底是不是，我改日再验证一下。</p><p>三、添加两个关于判断 USER AGENT 例子和自动添加.php扩展名及自动换.html到.php扩展名的例子：<br> 1</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteEngine on 
RewriteCond %{HTTP_USER_AGENT} ^MSIE [NC,OR] 
RewriteCond %{HTTP_USER_AGENT} ^Opera [NC] 
RewriteRule ^.* – [F,L] #这里”-”表示没有替换，浏览器为IE和Opera的访客将被禁止访问。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteEngine On 
RewriteBase /test 
RewriteCond %{REQUEST_FILENAME}.php -f 
RewriteRule ([^/]+)$ /test/$1.php #for example: /test/admin =&gt; /test/admin.php 
RewriteRule ([^/]+).html$ /test/$1.php [L] #for example: /test/admin.html =&gt; /test/admin.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>限制目录只能显示图片</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>IfModule</span> <span class="token attr-name">mod_rewrite.c</span><span class="token punctuation">&gt;</span></span> 
RewriteEngine on 
RewriteCond %{REQUEST_FILENAME} !^.*.(gif|jpg|jpeg|png|swf)$ 
RewriteRule .*$ – [F,L] 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>IfModule</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Update Jun 10, 2009</p><p>补充，关于特定文件扩展名的重写。</p><p>重写有某些扩展名的文件：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteRule (.*.css$|.*.js$) gzip.php?$1 [L]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果要排除一些扩展名：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>RewriteRule !.(js|ico|gif|jpg|JPG|png|PNG|css|pdf|swf)$ index.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,22);function g(x,_){const i=d("ExternalLinkIcon");return r(),t("div",null,[n("p",null,[e("文章转自:"),n("a",o,[e("http://www1.360quan.com/blog/show/4823429"),a(i)])]),p,n("p",null,[e("求Rewrite 防盗链正则"),m,n("a",u,[e("不允许www.im286.com"),a(i)]),e(),n("a",v,[e("www.chinaz.com"),a(i)]),e(" 这两个网站盗链, 其它的网站都可以盗链的规则怎么写.")]),w,n("p",null,[e("介绍一篇文章："),b,n("a",R,[e("http://lamp.linux.gov.cn/Apache/ApacheMenu/mod/mod_rewrite.html"),a(i)])]),h])}const E=l(c,[["render",g],["__file","5542697.html.vue"]]);export{E as default};
