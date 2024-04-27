const a=JSON.parse('{"key":"v-12d52df2","path":"/article/5491957.html","title":"APACHE + TOMCAT 环境下 JSP 的编码问题","lang":"zh-CN","frontmatter":{"title":"APACHE + TOMCAT 环境下 JSP 的编码问题","icon":"creative","date":"2010-04-16T09:37:00.000Z","category":["文章"],"tag":["Java"],"description":"今天又遇到乱码问题,可真烦.为什么TOMCAT就不能自动判断项目的编码,而一定要项目遵循TOMCAT的编码. 说说解决方法吧: 在TOMCAT的SERVER.XML配置文件中的connector中添加URIEncoding=\\"UTF-8\\"属性,如 &lt;Connector port=\\"88\\" maxHttpHeaderSize=\\"8192\\" maxThreads=\\"20\\" minSpareThreads=\\"5\\" maxSpareThreads=\\"10\\" enableLookups=\\"false\\" redirectPort=\\"8049\\" acceptCount=\\"100\\" connectionTimeout=\\"20000\\" disableUploadTimeout=\\"true\\" URIEncoding=\\"UTF-8\\" /&gt;","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://blog.chcbz.net/en/article/5491957.html"}],["meta",{"property":"og:url","content":"https://blog.chcbz.net/article/5491957.html"}],["meta",{"property":"og:site_name","content":"布衣云水客"}],["meta",{"property":"og:title","content":"APACHE + TOMCAT 环境下 JSP 的编码问题"}],["meta",{"property":"og:description","content":"今天又遇到乱码问题,可真烦.为什么TOMCAT就不能自动判断项目的编码,而一定要项目遵循TOMCAT的编码. 说说解决方法吧: 在TOMCAT的SERVER.XML配置文件中的connector中添加URIEncoding=\\"UTF-8\\"属性,如 &lt;Connector port=\\"88\\" maxHttpHeaderSize=\\"8192\\" maxThreads=\\"20\\" minSpareThreads=\\"5\\" maxSpareThreads=\\"10\\" enableLookups=\\"false\\" redirectPort=\\"8049\\" acceptCount=\\"100\\" connectionTimeout=\\"20000\\" disableUploadTimeout=\\"true\\" URIEncoding=\\"UTF-8\\" /&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-04-09T10:41:59.000Z"}],["meta",{"property":"article:author","content":"Mr.Chen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2010-04-16T09:37:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-09T10:41:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"APACHE + TOMCAT 环境下 JSP 的编码问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2010-04-16T09:37:00.000Z\\",\\"dateModified\\":\\"2023-04-09T10:41:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chen\\",\\"url\\":\\"https://blog.chcbz.net\\"}]}"]]},"headers":[],"git":{"createdTime":1680538255000,"updatedTime":1681036919000,"contributors":[{"name":"chcbz","email":"chcbz@sina.com","commits":2}]},"readingTime":{"minutes":0.72,"words":217},"filePathRelative":"article/5491957.md","localizedDate":"2010年4月16日","excerpt":"<p>今天又遇到乱码问题,可真烦.为什么TOMCAT就不能自动判断项目的编码,而一定要项目遵循TOMCAT的编码.</p>\\n<p>说说解决方法吧:</p>\\n<p>在TOMCAT的SERVER.XML配置文件中的connector中添加URIEncoding=\\"UTF-8\\"属性,如</p>\\n<div class=\\"language-xml line-numbers-mode\\" data-ext=\\"xml\\"><pre class=\\"language-xml\\"><code><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>Connector</span> <span class=\\"token attr-name\\">port</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>88<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">maxHttpHeaderSize</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>8192<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">maxThreads</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>20<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">minSpareThreads</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>5<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">maxSpareThreads</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>10<span class=\\"token punctuation\\">\\"</span></span>\\n <span class=\\"token attr-name\\">enableLookups</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>false<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">redirectPort</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>8049<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">acceptCount</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>100<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">connectionTimeout</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>20000<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">disableUploadTimeout</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>true<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">URIEncoding</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>UTF-8<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token punctuation\\">/&gt;</span></span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{a as data};