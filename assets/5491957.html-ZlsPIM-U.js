const t=JSON.parse(`{"key":"v-2ed62b1b","path":"/en/article/5491957.html","title":"Encoding problem of JSP in APACHE + TOMCAT environment","lang":"en-US","frontmatter":{"title":"Encoding problem of JSP in APACHE + TOMCAT environment","icon":"creative","date":"2010-04-16T09:37:00.000Z","category":["article"],"tag":["Java"],"description":"Today I encountered the problem of garbled characters again, which is really annoying. Why can't TOMCAT automatically judge the encoding of the project, but the project must follow the encoding of TOMCAT. Let's talk about the solution: Add the URIEncoding=\\"UTF-8\\" attribute to the connector in TOMCAT's SERVER.XML configuration file, such as","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://blog.chcbz.net/article/5491957.html"}],["meta",{"property":"og:url","content":"https://blog.chcbz.net/en/article/5491957.html"}],["meta",{"property":"og:site_name","content":"Commoner Yunshuike"}],["meta",{"property":"og:title","content":"Encoding problem of JSP in APACHE + TOMCAT environment"}],["meta",{"property":"og:description","content":"Today I encountered the problem of garbled characters again, which is really annoying. Why can't TOMCAT automatically judge the encoding of the project, but the project must follow the encoding of TOMCAT. Let's talk about the solution: Add the URIEncoding=\\"UTF-8\\" attribute to the connector in TOMCAT's SERVER.XML configuration file, such as"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-15T01:31:51.000Z"}],["meta",{"property":"article:author","content":"Mr.Chen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2010-04-16T09:37:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-15T01:31:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Encoding problem of JSP in APACHE + TOMCAT environment\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2010-04-16T09:37:00.000Z\\",\\"dateModified\\":\\"2023-04-15T01:31:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chen\\",\\"url\\":\\"https://blog.chcbz.net\\"}]}"]]},"headers":[],"git":{"createdTime":1681522311000,"updatedTime":1681522311000,"contributors":[{"name":"chcbz","email":"chcbz@sina.com","commits":1}]},"readingTime":{"minutes":0.6,"words":181},"filePathRelative":"en/article/5491957.md","localizedDate":"April 16, 2010","excerpt":"<p>Today I encountered the problem of garbled characters again, which is really annoying. Why can't TOMCAT automatically judge the encoding of the project, but the project must follow the encoding of TOMCAT.</p>\\n<p>Let's talk about the solution:</p>\\n<p>Add the URIEncoding=\\"UTF-8\\" attribute to the connector in TOMCAT's SERVER.XML configuration file, such as</p>","autoDesc":true}`);export{t as data};