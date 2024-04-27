import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c as r,b as n,d as e,e as t,f as l}from"./app-5ZyUDSyM.js";const p={},c=n("br",null,null,-1),d=n("br",null,null,-1),m=n("br",null,null,-1),u={href:"http://www.328g.com:88",target:"_blank",rel:"noopener noreferrer"},h={href:"http://www.328g.com",target:"_blank",rel:"noopener noreferrer"},v=l(`<p>Later, I tested it with alert and found that the port in the basePath of the page is the port of tomcat, and the website address is originally the port of apache. I haven&#39;t figured out the principle of http_proxy until now. It should be that apache directly transfers to tomcat after discovering the jsp request, so The port of basePath is the port of tomcat. After finding that http_proxy is not easy to use, I plan to use mod_jk instead, and then use alias to point the virtual path to the project address. Then there was a problem, and I found that I couldn’t jump correctly. I tried for a long time, and finally Adding DirectoryIndex finally solved the problem. It turns out that the default page of my project is login.jsp, and apache has not been set.</p><p>Finally, post the VirtualHost configuration of apache for future reference.</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VirtualHost</span> <span class="token attr-name"><span class="token namespace">*:</span>80</span><span class="token punctuation">&gt;</span></span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function g(_,b){const s=o("ExternalLinkIcon");return i(),r("div",null,[n("p",null,[e("I used http_proxy to configure the load balancing of apache and tomcat on linux, and later found that in firefox"),c,e(' window.parent.document.getElementById("menu").src="content/contentNav.jsp";'),d,e(" There is no response and cannot jump. But it is possible on IE. There is such an error prompt in firebug"),m,e(' "'),n("a",u,[e("http://www.328g.com:88"),t(s)]),e(" à³ CPÎ "),n("a",h,[e("http://www.328g.com"),t(s)]),e(` ûÖ^' Window.document ".`)]),v])}const x=a(p,[["render",g],["__file","5487455.html.vue"]]);export{x as default};
