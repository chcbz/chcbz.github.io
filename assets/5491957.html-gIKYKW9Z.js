import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as s,f as t}from"./app-5ZyUDSyM.js";const p={},e=t(`<p>今天又遇到乱码问题,可真烦.为什么TOMCAT就不能自动判断项目的编码,而一定要项目遵循TOMCAT的编码.</p><p>说说解决方法吧:</p><p>在TOMCAT的SERVER.XML配置文件中的connector中添加URIEncoding=&quot;UTF-8&quot;属性,如</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Connector</span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>88<span class="token punctuation">&quot;</span></span> <span class="token attr-name">maxHttpHeaderSize</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8192<span class="token punctuation">&quot;</span></span> <span class="token attr-name">maxThreads</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>20<span class="token punctuation">&quot;</span></span> <span class="token attr-name">minSpareThreads</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>5<span class="token punctuation">&quot;</span></span> <span class="token attr-name">maxSpareThreads</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>10<span class="token punctuation">&quot;</span></span>
 <span class="token attr-name">enableLookups</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span> <span class="token attr-name">redirectPort</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8049<span class="token punctuation">&quot;</span></span> <span class="token attr-name">acceptCount</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100<span class="token punctuation">&quot;</span></span> <span class="token attr-name">connectionTimeout</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>20000<span class="token punctuation">&quot;</span></span> <span class="token attr-name">disableUploadTimeout</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">URIEncoding</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是APACHE整合TOMCAT,则要在连接的CONNECTOR也要设URIEncoding</p><p>网上有说可以在APACHE的httpd.conf配置文件中添加AddDefaultCharset,如</p><p>AddDefaultCharset Off<br> 或者<br> AddDefaultCharset=UTF-8</p><p>不过试过AddDefaultCharset Off 不行的, AddDefaultCharset=UTF-8没试过,总不能让整个APACHE也固定编码吧.</p><p>最后还是那句,为什么TOMCAT就不能遵循项目的编码,悲哀啊!!!!!</p>`,9),o=[e];function u(c,l){return n(),s("div",null,o)}const k=a(p,[["render",u],["__file","5491957.html.vue"]]);export{k as default};