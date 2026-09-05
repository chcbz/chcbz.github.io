import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as r,c as l,b as s,d as n,e as o,f as p}from"./app-E1vXAF15.js";const d={},m={href:"http://www.328g.com:88",target:"_blank",rel:"noopener noreferrer"},u={href:"http://www.328g.com",target:"_blank",rel:"noopener noreferrer"};function c(v,e){const t=a("ExternalLinkIcon");return r(),l("div",null,[s("p",null,[e[2]||(e[2]=n("I used http_proxy to configure the load balancing of apache and tomcat on linux, and later found that in firefox",-1)),e[3]||(e[3]=s("br",null,null,-1)),e[4]||(e[4]=n(' window.parent.document.getElementById("menu").src="content/contentNav.jsp";',-1)),e[5]||(e[5]=s("br",null,null,-1)),e[6]||(e[6]=n(" There is no response and cannot jump. But it is possible on IE. There is such an error prompt in firebug",-1)),e[7]||(e[7]=s("br",null,null,-1)),e[8]||(e[8]=n(' "',-1)),s("a",m,[e[0]||(e[0]=n("http://www.328g.com:88",-1)),o(t)]),e[9]||(e[9]=n(" à³ CPÎ ",-1)),s("a",u,[e[1]||(e[1]=n("http://www.328g.com",-1)),o(t)]),e[10]||(e[10]=n(` ûÖ^' Window.document ".`,-1))]),e[11]||(e[11]=p(`<p>Later, I tested it with alert and found that the port in the basePath of the page is the port of tomcat, and the website address is originally the port of apache. I haven&#39;t figured out the principle of http_proxy until now. It should be that apache directly transfers to tomcat after discovering the jsp request, so The port of basePath is the port of tomcat. After finding that http_proxy is not easy to use, I plan to use mod_jk instead, and then use alias to point the virtual path to the project address. Then there was a problem, and I found that I couldn’t jump correctly. I tried for a long time, and finally Adding DirectoryIndex finally solved the problem. It turns out that the default page of my project is login.jsp, and apache has not been set.</p><p>Finally, post the VirtualHost configuration of apache for future reference.</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VirtualHost</span> <span class="token attr-name"><span class="token namespace">*:</span>80</span><span class="token punctuation">&gt;</span></span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3))])}const b=i(d,[["render",c],["__file","5487455.html.vue"]]);export{b as default};
