const t=JSON.parse('{"key":"v-2231cb9e","path":"/article/2019041110.html","title":"Centos开机启动脚本执行过程","lang":"zh-CN","frontmatter":{"title":"Centos开机启动脚本执行过程","icon":"creative","date":"2019-04-11T10:36:05.000Z","category":["文章"],"tag":["Linux","Centos"],"star":true,"description":"​ Linux 启动流程 Centos开机启动主要过程如下: 找到系统引导分区，执行引导程序，加载内核 执行init程序 a. /etc/rc.d/rc.sysinit # 由init执行的第一个脚本 b. /etc/rc.d/rc $RUNLEVEL # $RUNLEVEL为缺省的运行模式 ，服务器的运行级别为3 c. /etc/rc.d/rc.local #相应级别服务启动之后、再执行该文件（其实也可以把需要执行的命令写到该文件中） d. /sbin/mingetty # 等待用户登录","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://blog.chcbz.net/en/article/2019041110.html"}],["meta",{"property":"og:url","content":"https://blog.chcbz.net/article/2019041110.html"}],["meta",{"property":"og:site_name","content":"布衣云水客"}],["meta",{"property":"og:title","content":"Centos开机启动脚本执行过程"}],["meta",{"property":"og:description","content":"​ Linux 启动流程 Centos开机启动主要过程如下: 找到系统引导分区，执行引导程序，加载内核 执行init程序 a. /etc/rc.d/rc.sysinit # 由init执行的第一个脚本 b. /etc/rc.d/rc $RUNLEVEL # $RUNLEVEL为缺省的运行模式 ，服务器的运行级别为3 c. /etc/rc.d/rc.local #相应级别服务启动之后、再执行该文件（其实也可以把需要执行的命令写到该文件中） d. /sbin/mingetty # 等待用户登录"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.chcbz.net/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-04-09T15:33:20.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Centos开机启动脚本执行过程"}],["meta",{"property":"article:author","content":"Mr.Chen"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"Centos"}],["meta",{"property":"article:published_time","content":"2019-04-11T10:36:05.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-09T15:33:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Centos开机启动脚本执行过程\\",\\"image\\":[\\"https://blog.chcbz.net/\\"],\\"datePublished\\":\\"2019-04-11T10:36:05.000Z\\",\\"dateModified\\":\\"2023-04-09T15:33:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chen\\",\\"url\\":\\"https://blog.chcbz.net\\"}]}"]]},"headers":[],"git":{"createdTime":1681054400000,"updatedTime":1681054400000,"contributors":[{"name":"chcbz","email":"chcbz@sina.com","commits":1}]},"readingTime":{"minutes":3.02,"words":906},"filePathRelative":"article/2019041110.md","localizedDate":"2019年4月11日","excerpt":"<p>​</p>\\n<figure><figcaption>Linux 启动流程</figcaption></figure>\\n<p>Centos开机启动主要过程如下:</p>\\n<ol>\\n<li>\\n<p>找到系统引导分区，执行引导程序，加载内核</p>\\n</li>\\n<li>\\n<p>执行init程序</p>\\n<p>a. /etc/rc.d/rc.sysinit # 由init执行的第一个脚本</p>\\n<p>b. /etc/rc.d/rc $RUNLEVEL # $RUNLEVEL为缺省的运行模式 ，服务器的运行级别为3</p>\\n<p>c. /etc/rc.d/rc.local     #相应级别服务启动之后、再执行该文件（其实也可以把需要执行的命令写到该文件中）</p>\\n<p>d. /sbin/mingetty # 等待用户登录</p>\\n</li>\\n</ol>","autoDesc":true}');export{t as data};
