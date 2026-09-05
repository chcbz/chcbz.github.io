import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as l,c as r,b as e,d as n,e as t,f as p}from"./app-E1vXAF15.js";const m={},d={href:"http://www.328g.com:88",target:"_blank",rel:"noopener noreferrer"},u={href:"http://www.328g.com",target:"_blank",rel:"noopener noreferrer"};function v(c,s){const i=o("ExternalLinkIcon");return l(),r("div",null,[e("p",null,[s[2]||(s[2]=n("我在linux上使用http_proxy的方式配置了apache跟tomcat的负载均衡,后来发现在firefox中",-1)),s[3]||(s[3]=e("br",null,null,-1)),s[4]||(s[4]=n(' window.parent.document.getElementById("menu").src="content/contentNav.jsp";',-1)),s[5]||(s[5]=e("br",null,null,-1)),s[6]||(s[6]=n(" 没有反应,不能跳转.但是在IE上是可以的.在firebug中有这样一个错误提示",-1)),s[7]||(s[7]=e("br",null,null,-1)),s[8]||(s[8]=n(' "',-1)),e("a",d,[s[0]||(s[0]=n("http://www.328g.com:88",-1)),t(i)]),s[9]||(s[9]=n(" à³CPÎ ",-1)),e("a",u,[s[1]||(s[1]=n("http://www.328g.com",-1)),t(i)]),s[10]||(s[10]=n(` ûÖ^' Window.document".`,-1))]),s[11]||(s[11]=p(`<p>后来用alert测试过,发现页面basePath中的端口是tomcat的端口,而网站地址本来是apache端口的.到现在还没弄明白http_proxy的原理.应该是apache发现jsp请求后直接转到tomcat处理,所以basePath的端口是tomcat的端口.发现http_proxy不好用后,打算改成用mod_jk,再用alias将虚拟路径指向到项目地址.之后又出问题,发现不能正确跳转,试了很长时间,最后加了DirectoryIndex才最终解决问题,原来是我项目默认页面是login.jsp,而apache本来就没有设,</p><p>最后,贴出apache的VirtualHost配置,以便以后查阅.</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VirtualHost</span> <span class="token attr-name"><span class="token namespace">*:</span>80</span><span class="token punctuation">&gt;</span></span> 
  DocumentRoot &quot;/home/isp/webapps/hostroot/328g.com&quot; 
  DirectoryIndex index.html index.htm index.php login.jsp index.jsp 
  ServerName 328g.com 
  ServerAlias www.328g.com *.328g.com 
  ErrorLog &quot;logs/328g.com-error_log 
  CustomLog &quot;logs/328g.com-access_log&quot; common 
  # ProxyRequests off 
  # ProxyPass /isp_ims http://www.328g.com:88/isp_ims 
  # ProxyPassReverse /isp_ims http://www.328g.com:88/isp_ims 
  ProxyPass /isp_mail ! 
  ProxyPass /isp_mysql ! 
  ProxyPass /isp_help ! 
  # ProxyPass / http://www.328g.com:88/ 
  # ProxyPassReverse / http://www.328g.com:88/ 
  JkMount /*.action ajp13 
  JkMount /*.jsp ajp13 
  Alias /isp_ims /home/isp/webapps/ims 
  Alias /isp_mail /home/isp/webapps/squirrelmail 
  Alias /isp_mysql /home/isp/webapps/phpmyadmin 
  Alias /isp_help /home/isp/webapps/help 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>VirtualHost</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3))])}const w=a(m,[["render",v],["__file","5487455.html.vue"]]);export{w as default};
