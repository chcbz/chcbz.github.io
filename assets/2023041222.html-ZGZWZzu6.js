const e=JSON.parse('{"key":"v-8a95bea2","path":"/en/article/2023041222.html","title":"Disruptor Details","lang":"en-US","frontmatter":{"title":"Disruptor Details","icon":"creative","date":"2023-04-12T23:02:05.000Z","category":["article"],"tag":["Java","Disruptor"],"star":true,"description":"​ 1. Background 1. Source Disruptor is a high-performance queue developed by LMAX, a British foreign exchange trading company. The original intention of the research and development is to solve the delay problem of the internal memory queue, rather than the distributed queue. The single thread of the system developed based on Disruptor can support 6 million orders per second. After giving a speech at QCon in 2010, it gained the attention of the industry.","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://blog.chcbz.net/article/2023041222.html"}],["meta",{"property":"og:url","content":"https://blog.chcbz.net/en/article/2023041222.html"}],["meta",{"property":"og:site_name","content":"Commoner Yunshuike"}],["meta",{"property":"og:title","content":"Disruptor Details"}],["meta",{"property":"og:description","content":"​ 1. Background 1. Source Disruptor is a high-performance queue developed by LMAX, a British foreign exchange trading company. The original intention of the research and development is to solve the delay problem of the internal memory queue, rather than the distributed queue. The single thread of the system developed based on Disruptor can support 6 million orders per second. After giving a speech at QCon in 2010, it gained the attention of the industry."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.chcbz.net/"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-15T01:31:51.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Disruptor Details"}],["meta",{"property":"article:author","content":"Mr.Chen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Disruptor"}],["meta",{"property":"article:published_time","content":"2023-04-12T23:02:05.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-15T01:31:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Disruptor Details\\",\\"image\\":[\\"https://blog.chcbz.net/\\"],\\"datePublished\\":\\"2023-04-12T23:02:05.000Z\\",\\"dateModified\\":\\"2023-04-15T01:31:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chen\\",\\"url\\":\\"https://blog.chcbz.net\\"}]}"]]},"headers":[{"level":2,"title":"1. Background","slug":"_1-background","link":"#_1-background","children":[{"level":3,"title":"1. Source","slug":"_1-source","link":"#_1-source","children":[]},{"level":3,"title":"2. Application background and introduction","slug":"_2-application-background-and-introduction","link":"#_2-application-background-and-introduction","children":[]}]},{"level":2,"title":"2. Traditional queue problem","slug":"_2-traditional-queue-problem","link":"#_2-traditional-queue-problem","children":[{"level":3,"title":"1. False sharing concept","slug":"_1-false-sharing-concept","link":"#_1-false-sharing-concept","children":[]},{"level":3,"title":"2. The false sharing problem of ArrayBlockingQueue","slug":"_2-the-false-sharing-problem-of-arrayblockingqueue","link":"#_2-the-false-sharing-problem-of-arrayblockingqueue","children":[]}]},{"level":2,"title":"Three, high performance principle","slug":"three-high-performance-principle","link":"#three-high-performance-principle","children":[{"level":3,"title":"1. Ring array structure","slug":"_1-ring-array-structure","link":"#_1-ring-array-structure","children":[]},{"level":3,"title":"2. Production and consumption modes","slug":"_2-production-and-consumption-modes","link":"#_2-production-and-consumption-modes","children":[]},{"level":3,"title":"3. Awesome subscript pointer","slug":"_3-awesome-subscript-pointer","link":"#_3-awesome-subscript-pointer","children":[]}]},{"level":2,"title":"4. Usage","slug":"_4-usage","link":"#_4-usage","children":[{"level":3,"title":"1. Simple usage","slug":"_1-simple-usage","link":"#_1-simple-usage","children":[]},{"level":3,"title":"2. Other usages","slug":"_2-other-usages","link":"#_2-other-usages","children":[]}]},{"level":2,"title":"5. Frequently Asked Questions","slug":"_5-frequently-asked-questions","link":"#_5-frequently-asked-questions","children":[]},{"level":2,"title":"6. Reference","slug":"_6-reference","link":"#_6-reference","children":[]}],"git":{"createdTime":1681522311000,"updatedTime":1681522311000,"contributors":[{"name":"chcbz","email":"chcbz@sina.com","commits":1}]},"readingTime":{"minutes":12.83,"words":3849},"filePathRelative":"en/article/2023041222.md","localizedDate":"April 12, 2023","excerpt":"<p>​</p>\\n<h2> 1. Background</h2>\\n<h3> 1. Source</h3>\\n<p>Disruptor is a high-performance queue developed by LMAX, a British foreign exchange trading company. The original intention of the research and development is to solve the delay problem of the internal memory queue, rather than the distributed queue. The single thread of the system developed based on Disruptor can support 6 million orders per second. After giving a speech at QCon in 2010, it gained the attention of the industry.</p>","autoDesc":true}');export{e as data};
