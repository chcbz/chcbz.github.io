import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o,c as l,b as e,d as s,e as a,f as r}from"./app-5ZyUDSyM.js";const c={},p=e("br",null,null,-1),m=e("br",null,null,-1),d=e("br",null,null,-1),u={href:"http://www.328g.com:88",target:"_blank",rel:"noopener noreferrer"},v={href:"http://www.328g.com",target:"_blank",rel:"noopener noreferrer"},_=r(`<p>后来用alert测试过,发现页面basePath中的端口是tomcat的端口,而网站地址本来是apache端口的.到现在还没弄明白http_proxy的原理.应该是apache发现jsp请求后直接转到tomcat处理,所以basePath的端口是tomcat的端口.发现http_proxy不好用后,打算改成用mod_jk,再用alias将虚拟路径指向到项目地址.之后又出问题,发现不能正确跳转,试了很长时间,最后加了DirectoryIndex才最终解决问题,原来是我项目默认页面是login.jsp,而apache本来就没有设,</p><p>最后,贴出apache的VirtualHost配置,以便以后查阅.</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VirtualHost</span> <span class="token attr-name"><span class="token namespace">*:</span>80</span><span class="token punctuation">&gt;</span></span> 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function h(b,g){const n=t("ExternalLinkIcon");return o(),l("div",null,[e("p",null,[s("我在linux上使用http_proxy的方式配置了apache跟tomcat的负载均衡,后来发现在firefox中"),p,s(' window.parent.document.getElementById("menu").src="content/contentNav.jsp";'),m,s(" 没有反应,不能跳转.但是在IE上是可以的.在firebug中有这样一个错误提示"),d,s(' "'),e("a",u,[s("http://www.328g.com:88"),a(n)]),s(" à³CPÎ "),e("a",v,[s("http://www.328g.com"),a(n)]),s(` ûÖ^' Window.document".`)]),_])}const f=i(c,[["render",h],["__file","5487455.html.vue"]]);export{f as default};
