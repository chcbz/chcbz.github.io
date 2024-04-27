import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,f as t}from"./app-5ZyUDSyM.js";const p={},e=t(`<p>1、修改conf/web.xml</p><p>找到并将cgi的servlet和servlet-mapping的注释去掉</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">&gt;</span></span>cgi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-class</span><span class="token punctuation">&gt;</span></span>org.apache.catalina.servlets.CGIServlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-class</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>init-param</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-name</span><span class="token punctuation">&gt;</span></span>debug<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-name</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-value</span><span class="token punctuation">&gt;</span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-value</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>init-param</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>init-param</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-name</span><span class="token punctuation">&gt;</span></span>cgiPathPrefix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-name</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-value</span><span class="token punctuation">&gt;</span></span>cgi-bin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-value</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>init-param</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>load-on-startup</span><span class="token punctuation">&gt;</span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>load-on-startup</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意:其中cgiPathPrefix是cgi文件的存放路径,默认是WEB-INF/cgi,我为了方面用awstats,所以改成cgi-bin</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-mapping</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">&gt;</span></span>cgi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url-pattern</span><span class="token punctuation">&gt;</span></span>/cgi-bin/*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url-pattern</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-mapping</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>/cgi-bin/<em>意思是,访问cgi文件的默认地址为cgi-bin/</em></p><p>2、修改conf/context.xml</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&#39;1.0&#39; encoding=&#39;utf-8&#39;?&gt;</span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Context</span> <span class="token attr-name">privileged</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> 
  <span class="token comment">&lt;!-- Default set of monitored resources --&gt;</span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>WatchedResource</span><span class="token punctuation">&gt;</span></span>WEB-INF/web.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>WatchedResource</span><span class="token punctuation">&gt;</span></span> 
  <span class="token comment">&lt;!-- Uncomment this to disable session persistence across Tomcat restarts --&gt;</span> 
  <span class="token comment">&lt;!-- &lt;Manager pathname=&quot;&quot; /&gt; --&gt;</span> 
  <span class="token comment">&lt;!-- Uncomment this to enable Comet connection tacking (provides events on session expiration as well as webapp lifecycle) --&gt;</span> 
  <span class="token comment">&lt;!-- &lt;Valve className=&quot;org.apache.catalina.valves.CometConnectionManagerValve&quot; /&gt; --&gt;</span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Context</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>&lt;Context&gt;</code>添加privileged=&quot;true&quot;属性，否则页面提示Servlet CGI is not availabled,且tomcat会有错误提示<br> java.lang.SecurityException: Restricted classclass org.apache.catalina.servlets.CGIServlet</p><p>3、如果tomcat的版本是6以下的，必须将server/lib/目录下的servlets-cgi.renametojar改名为servlets-cgi.jar</p><p>有以上三步，已经可以成功配置CGI了，访问地址如<code>http://localhost:8080/cgi-bin/test.pl</code></p>`,11),l=[e];function c(o,i){return a(),s("div",null,l)}const k=n(p,[["render",c],["__file","6032924.html.vue"]]);export{k as default};
