const t=JSON.parse('{"key":"v-f2d0e588","path":"/article/102533089.html","title":"工作流迁移：由 Activiti6.0 转 Camunda7.8 填坑之路","lang":"zh-CN","frontmatter":{"title":"工作流迁移：由 Activiti6.0 转 Camunda7.8 填坑之路","icon":"creative","date":"2019-10-14T09:01:05.000Z","category":["文章"],"tag":["Java"],"star":true,"description":"​​ 前言 在十年前刚开始接触工作流引擎的时候，所知道的就只有Activiti，根本不知道还有没有其他工作流引擎，虽然中文手册和教程十分欠缺，但经过不断摸索，用得越来越顺，也一直用得好好的。最近在搭建一个工作流服务平台，找了很多前端画流程的开源框架，一直没找到Activiti专属的画图框架，后来找到了bpmn-js，但是发现画出来的流程在Activiti上跑不了，查了下才发现所使用的面板插件是Camunda专属的，其实连bpmn-js都是Camunda社区所开发的。顿时对Camunda产生的兴趣，在网上看了很多Camunda、Flowable、Activiti对比的文章，发现现在Camunda的社区是最活跃的，抱着尝试一下的想法，在项目上拉了个分支，开始了Camunda迁移工作。","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://blog.chcbz.net/en/article/102533089.html"}],["meta",{"property":"og:url","content":"https://blog.chcbz.net/article/102533089.html"}],["meta",{"property":"og:site_name","content":"布衣云水客"}],["meta",{"property":"og:title","content":"工作流迁移：由 Activiti6.0 转 Camunda7.8 填坑之路"}],["meta",{"property":"og:description","content":"​​ 前言 在十年前刚开始接触工作流引擎的时候，所知道的就只有Activiti，根本不知道还有没有其他工作流引擎，虽然中文手册和教程十分欠缺，但经过不断摸索，用得越来越顺，也一直用得好好的。最近在搭建一个工作流服务平台，找了很多前端画流程的开源框架，一直没找到Activiti专属的画图框架，后来找到了bpmn-js，但是发现画出来的流程在Activiti上跑不了，查了下才发现所使用的面板插件是Camunda专属的，其实连bpmn-js都是Camunda社区所开发的。顿时对Camunda产生的兴趣，在网上看了很多Camunda、Flowable、Activiti对比的文章，发现现在Camunda的社区是最活跃的，抱着尝试一下的想法，在项目上拉了个分支，开始了Camunda迁移工作。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-04-09T10:41:59.000Z"}],["meta",{"property":"article:author","content":"Mr.Chen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2019-10-14T09:01:05.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-09T10:41:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"工作流迁移：由 Activiti6.0 转 Camunda7.8 填坑之路\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-14T09:01:05.000Z\\",\\"dateModified\\":\\"2023-04-09T10:41:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chen\\",\\"url\\":\\"https://blog.chcbz.net\\"}]}"]]},"headers":[],"git":{"createdTime":1680538255000,"updatedTime":1681036919000,"contributors":[{"name":"chcbz","email":"chcbz@sina.com","commits":3}]},"readingTime":{"minutes":33.54,"words":10062},"filePathRelative":"article/102533089.md","localizedDate":"2019年10月14日","excerpt":"<p>​​</p>\\n<h4> 前言</h4>\\n<p>在十年前刚开始接触工作流引擎的时候，所知道的就只有Activiti，根本不知道还有没有其他工作流引擎，虽然中文手册和教程十分欠缺，但经过不断摸索，用得越来越顺，也一直用得好好的。最近在搭建一个工作流服务平台，找了很多前端画流程的开源框架，一直没找到Activiti专属的画图框架，后来找到了bpmn-js，但是发现画出来的流程在Activiti上跑不了，查了下才发现所使用的面板插件是Camunda专属的，其实连bpmn-js都是Camunda社区所开发的。顿时对Camunda产生的兴趣，在网上看了很多Camunda、Flowable、Activiti对比的文章，发现现在Camunda的社区是最活跃的，抱着尝试一下的想法，在项目上拉了个分支，开始了Camunda迁移工作。</p>","autoDesc":true}');export{t as data};