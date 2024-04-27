import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as n,c as d,b as e,d as t,e as i,f as r}from"./app-5ZyUDSyM.js";const h="/assets/img-20230408100911-T1tQ8Vtv.png",l="/assets/img-20230408103009-HZT2n8h6.png",c="/assets/img-20230408103111-cKISdlox.png",u="/assets/img-20230408105526-zHByEh3l.png",p="/assets/img-20230408105648-zPs5n10w.png",b="/assets/img-20230408110613-uawRXyiP.png",f="/assets/img-20230408110753-78UoVlO-.png",m="/assets/img-20230408111136-fPxebVmM.png",g="/assets/img-20230408111243-xcc47gh9.png",y="/assets/img-20230408111356-ktdY7HZ9.png",w="/assets/img-20230408111544-DnIlYGmc.png",v="/assets/img-20230408113420-7BmdAXcX.png",S={},_=r('<p>​</p><h2 id="preface" tabindex="-1"><a class="header-anchor" href="#preface" aria-hidden="true">#</a> Preface</h2><p>Speaking of architecture, let’s first look at what architecture is. Baidu Encyclopedia says this: architecture, also known as software architecture, is an abstract description of the overall structure and components of software, and is used to guide the design of all aspects of large-scale software systems. Then we can also see that the architecture is closely related to the business and driven by the business.</p><p>Due to the characteristics of the App client, the technical implementation of the App background is different from the general Web background. First look at a development model suitable for App development:</p><h2 id="agile-development-model" tabindex="-1"><a class="header-anchor" href="#agile-development-model" aria-hidden="true">#</a> Agile development model</h2><p>Scrum, an agile development framework, is recommended here. For details, you can check the Scrum official website to learn and use it. This is just an introduction.</p><p>The Scrum process is as follows:</p><figure><img src="'+h+'" alt="Scrum flow chart" tabindex="0" loading="lazy"><figcaption>Scrum flow chart</figcaption></figure><h2 id="select-the-appropriate-database-product-and-server-system" tabindex="-1"><a class="header-anchor" href="#select-the-appropriate-database-product-and-server-system" aria-hidden="true">#</a> Select the appropriate database product and server system</h2><p>There are many database products. Here I will explain Redis, MongoDB, MySQL and MariaDB, a branch of MySQL:</p><h3 id="_1-database-products" tabindex="-1"><a class="header-anchor" href="#_1-database-products" aria-hidden="true">#</a> 1. Database products</h3><table><thead><tr><th>Database</th><th>Data storage location</th><th>Find the difference between data</th></tr></thead><tbody><tr><td>Redis</td><td>memory</td><td>based on key-value pair storage, fast read and write speed</td></tr><tr><td>MongoDB</td><td>uses hard disk and memory at the same time</td><td>each data has an id (index), knowing the id (index) query speed is fast, not knowing the id (index) is inefficient</td></tr><tr><td>MySQL (MongoDB)</td><td>hard disk</td><td>each data has an id (index), knowing the id (index) query speed is fast, not knowing the id (index) is inefficient</td></tr></tbody></table><p>Then choose the appropriate database product according to different product requirements. If there is no special requirement, Redis as the cache system, MySQL or MariaDB as the database (the common setting is the database default character set utf8, the default sort utf8_general_ci) will be a good choice .</p><p>Software optimization:</p><ul><li>Correct use of MyISAM and InnoDB storage engines</li><li>Correct use of indexes</li><li>Avoid using select *</li><li>Fields are set to non-NULL as much as possible</li></ul><p>Hardware optimization:</p><ul><li>increase physical memory</li><li>Increase application cache</li><li>Use SSD hard disk</li></ul><p>Architecture optimization:</p><ul><li>sub-table</li><li>Read and write separation</li></ul><figure><img src="'+l+'" alt="MySQL read-write separation" tabindex="0" loading="lazy"><figcaption>MySQL read-write separation</figcaption></figure><ul><li>Sub-database (store the data of a table in different databases, which can be realized by MyCat, MyCat, relational database distributed processing software).</li></ul><p>MyCat is located between the App server and the background database in the form of a proxy server. The open interface is the MySQL communication protocol. It disassembles and forwards the sql statements transmitted from the App server to different background databases according to the routing rules, and summarizes the results and returns them. .</p><p>The MyCat deployment model is as follows:</p><figure><img src="'+c+'" alt="MyCat Architecture Diagram" tabindex="0" loading="lazy"><figcaption>MyCat Architecture Diagram</figcaption></figure><h3 id="_2-server-system" tabindex="-1"><a class="header-anchor" href="#_2-server-system" aria-hidden="true">#</a> 2. Server system</h3><p>CentOS is a good choice. Regarding the deployment of the server, I have introduced it before, and the address is as follows:</p>',26),T={href:"http://blog.csdn.net/smartbetter/article/details/53535435",target:"_blank",rel:"noopener noreferrer"},k=e("br",null,null,-1),x={href:"http://blog.csdn.net/smartbetter/article/details/53615313",target:"_blank",rel:"noopener noreferrer"},A=r('<p>Two common Linux commands are added below:</p><p>top displays system resources<br> netstat view network related information</p><h2 id="select-the-appropriate-message-queue-software" tabindex="-1"><a class="header-anchor" href="#select-the-appropriate-message-queue-software" aria-hidden="true">#</a> Select the appropriate message queue software</h2><p>When the background system finds that it takes a lot of time to complete some small tasks, and the late completion does not affect the completion progress of the entire task, it will hand over these small tasks to the message queue. For example, tasks such as sending emails, text messages, and push messages are very suitable for processing in the message queue.</p><p>Putting these tasks in the message queue can speed up the response time of App background requests. At the same time, the message queue can also turn a large number of concurrent requests into serial requests to reduce the burden on the server.</p><p>Common message queue software includes:</p><table><thead><tr><th>Message Queuing Software</th><th>Description</th></tr></thead><tbody><tr><td>RabbitMQ</td><td>Heavyweight, suitable for enterprise-level development, with its own web monitoring interface, easy to monitor the status of the queue</td></tr><tr><td>Redis</td><td>Lightweight, it is a key-value system, but it also supports the data structure of message queue, and Redis is widely used in the App background</td></tr><tr><td>ZeroMQ</td><td>Known as the fastest, especially for high-throughput demand scenarios</td></tr><tr><td>ActiveMQ</td><td>A sub-project of Apache that implements queues with broker and peer-to-peer technologies</td></tr></tbody></table><h2 id="use-distributed-services-to-realize-business-reuse" tabindex="-1"><a class="header-anchor" href="#use-distributed-services-to-realize-business-reuse" aria-hidden="true">#</a> Use distributed services to realize business reuse</h2><p>With the continuous increase of business, the background system has expanded from a single application to a giant system. A large number of applications and services are aggregated in the system, and many functions are repeatedly implemented among various modules (such as the login module). Difficulty in maintenance and deployment.</p><figure><img src="'+u+'" alt="Distributed service architecture diagram" tabindex="0" loading="lazy"><figcaption>Distributed service architecture diagram</figcaption></figure><p>Repeated modules in a large number of applications will bring a large number of accesses, and the connection between each application and the database generally uses the connection pool of the database. The resources of this connection pool are generally not released and are always reserved. Assuming that there are 10 connections in the connection pool, in a server cluster of hundreds, 1000 connections are occupied in the database. Each connection in the database is a very precious resource. In the case of limited resources, if it is occupied here, other available resources will be less.</p><p>The solution to these problems is to independently deploy the repeatedly implemented modules as remote services, and the newly added business calls the functions provided by the remote service to realize related businesses, independent of the specific code implementation inside.</p><figure><img src="'+p+'" alt="Distributed service architecture diagram 2" tabindex="0" loading="lazy"><figcaption>Distributed service architecture diagram 2</figcaption></figure><p>To implement remote services, you can refer to the REST design principles and the RPC remote call protocol.</p><p>Open source RPC libraries include:</p><table><thead><tr><th>Open source RPC library</th><th>Description</th></tr></thead><tbody><tr><td>Hprose</td><td>Lightweight, cross-language, cross-platform, non-intrusive, high-performance dynamic remote object call engine library</td></tr><tr><td>Dubbo</td><td>Distributed service framework, dedicated to providing high-performance and transparent RPC remote call services and SOA service governance solutions</td></tr></tbody></table><h2 id="best-practices-for-user-authentication-schemes" tabindex="-1"><a class="header-anchor" href="#best-practices-for-user-authentication-schemes" aria-hidden="true">#</a> Best practices for user authentication schemes</h2><p>App operations often involve user login operations, and login requires the use of user names and passwords. For security reasons, the fewer times the password is leaked during the login process, the better.</p><h3 id="_1-use-https-protocol" tabindex="-1"><a class="header-anchor" href="#_1-use-https-protocol" aria-hidden="true">#</a> 1. Use HTTPS protocol</h3><p>The HTTPS protocol is a combination of the HTTP protocol and the SSL/TLS protocol. It is a secure communication channel, developed based on HTTP, for exchanging information between the client computer and the App background. It uses Secure Sockets Layer (SSL) for information exchange, which is simply a secure version of HTTP.</p><p>HTTPS actually applies the Secure Sockets Layer (SSL) as a sublayer of the HTTP application layer.</p><p>Model of HTTPS:</p><table><thead><tr><th style="text-align:center;">HTTP</th></tr></thead><tbody><tr><td style="text-align:center;">SSL/TLS (Secure Sockets Layer/Transport Layer Security)</td></tr><tr><td style="text-align:center;">TCP</td></tr><tr><td style="text-align:center;">IP</td></tr><tr><td style="text-align:center;">Network Transmission</td></tr></tbody></table><p>To avoid information leakage, the most basic solution is that all API requests involving security must use the HTTPS protocol.</p><h3 id="_2-choose-json-as-the-data-exchange-format" tabindex="-1"><a class="header-anchor" href="#_2-choose-json-as-the-data-exchange-format" aria-hidden="true">#</a> 2. Choose JSON as the data exchange format</h3><p>JSON is a lightweight data exchange format. It adopts a completely language-independent text format. It is easy to write, easy to parse and generate by machine, and saves traffic compared to XML. These features make JSON an ideal data exchange language.</p><h3 id="_3-basic-user-authentication-scheme" tabindex="-1"><a class="header-anchor" href="#_3-basic-user-authentication-scheme" aria-hidden="true">#</a> 3. Basic user authentication scheme</h3><p>Traditional Web sites use Cookie+Session to maintain the user&#39;s login status, while the App background uses tokens for verification. The process is as follows:</p><figure><img src="'+b+'" alt="User authentication scheme" tabindex="0" loading="lazy"><figcaption>User authentication scheme</figcaption></figure><p>At this point, the app has obtained the token value. For security reasons, we do not transmit the token on the network, but use signature verification (URL signature is used here). The API request plus the URL signature sign and user id is as follows:</p><p><code>test.com/user/update?uid=2&amp;sign=3f1e736bc4ae958ae7e8500b45aefdbb&amp;age=22</code></p><p>This way, the token doesn&#39;t need to be attached to the URL. The App background signature verification process is as follows:</p><figure><img src="'+f+'" alt="App background signature verification process" tabindex="0" loading="lazy"><figcaption>App background signature verification process</figcaption></figure><p>Some children&#39;s shoes like to set a timestamp, so that the URL will become invalid after a long time, which is also a good further optimization solution.</p><p>*Suggestion: In order to ensure data security, it is recommended to use HTTPS and signature verification at the same time. ***</p><h2 id="the-evolution-principle-of-app-background-architecture" tabindex="-1"><a class="header-anchor" href="#the-evolution-principle-of-app-background-architecture" aria-hidden="true">#</a> The evolution principle of App background architecture</h2><p>The architecture of the App background is driven by the business scale and evolves. The App background serves the business. The value of the App background is that it can provide the functions required by the business and should not be over-designed.</p><p>From the perspective of the project, when the number of app visits is not large, the app background should be built quickly, so that the app can be launched as soon as possible to provide services to users, verify the correctness of the business model, and rapidly iterate products.</p><p>When the number of app visits continues to increase, it is necessary to take into account high performance and high availability while ensuring rapid iteration.</p><p>When the number of app visits reaches a certain stage, the growth curve will slow down, but the business becomes more complex, and the requirements for high performance and high availability are also higher. Performance problems, coupling between modules, and code complexity will become more prominent And obviously, at this time, issues such as business splitting, distributed service invocation, and even technological transformation must be used.</p><h3 id="_1-when-the-project-starts-stand-alone-deployment" tabindex="-1"><a class="header-anchor" href="#_1-when-the-project-starts-stand-alone-deployment" aria-hidden="true">#</a> 1. When the project starts - stand-alone deployment</h3><p>Let&#39;s look at the simplified architecture of an App background:</p><figure><img src="'+m+'" alt="Background minimalist architecture" tabindex="0" loading="lazy"><figcaption>Background minimalist architecture</figcaption></figure><p>Benefits of using Redis from the start:</p><p>It can be used not only as a cache, but also as a queue service, and has high concurrency performance, which can cope with business pressure for a long time, and is very suitable for initial projects.</p><p>Here, Redis is used to verify user information and act as a message queue.</p><p>In the early stage of file service, you can choose file cloud storage service, or build a resource server yourself.</p><h3 id="_2-when-the-project-is-of-a-certain-scale-distributed-deployment" tabindex="-1"><a class="header-anchor" href="#_2-when-the-project-is-of-a-certain-scale-distributed-deployment" aria-hidden="true">#</a> 2. When the project is of a certain scale - distributed deployment</h3><p>Let&#39;s look at a million-level to tens of millions-level architecture:</p><figure><img src="'+g+'" alt="Distributed Architecture" tabindex="0" loading="lazy"><figcaption>Distributed Architecture</figcaption></figure><p>Here, an external network channel specially used to connect to the SSH service of the internal server is added to ensure that SSH operations are available at any time, and a server cluster is added to provide load capacity.</p><p>With the development of business, the scale of some data tables will increase geometrically. When the data reaches a certain scale, the query and read performance will drop sharply. The database master-slave architecture cannot cope with the read and write pressure of the business. At this time In terms of architecture, table splitting (horizontal splitting/vertical splitting) should be considered.</p><p>When the business continues to develop, the read and write performance of the database table partition may not be able to meet the business needs. At this time, only a further split strategy - database partitioning can be adopted. After using a distributed processing system such as Cobar or MyCat for relational data, the structure of the sub-database is as follows:</p><figure><img src="'+y+'" alt="Distributed architecture after sub-library" tabindex="0" loading="lazy"><figcaption>Distributed architecture after sub-library</figcaption></figure><p>Let&#39;s take a look at the background architecture scheme adopted by a real social app project.</p><h2 id="social-app-background-architecture-design-plan-sharing" tabindex="-1"><a class="header-anchor" href="#social-app-background-architecture-design-plan-sharing" aria-hidden="true">#</a> Social App background architecture design plan sharing</h2><p>Scenario: Similar to Weibo, there are two types of relationships between users: follower/follower. When a user publishes new content, users who follow him can also receive the latest news on their personal homepage. A scene similar to Weibo:</p><figure><img src="'+w+'" alt="Weibo interface" tabindex="0" loading="lazy"><figcaption>Weibo interface</figcaption></figure><p>The core function of social networking is Feed (referring to the information service that users aggregate the latest content of followed users by following them, and also include their own content for their own browsing).</p><h3 id="_1-feed-basic-table-structure" tabindex="-1"><a class="header-anchor" href="#_1-feed-basic-table-structure" aria-hidden="true">#</a> 1. Feed basic table structure</h3><p>The common feed architecture is to store data in MySQL, and store hot data (usually in the last 3 days) in the cache (Redis/Memcached), ensuring that most requests are returned directly through the cache, and only a small number of requests penetrate the cache and fall to the database.</p><p>Let&#39;s take a look at the simplest feed table structure:</p><ul><li><p>send_content: send content table, storing content published by users:</p><table><thead><tr><th>field</th><th>description</th></tr></thead><tbody><tr><td>feed_id</td><td>The id of the published feed, the primary key is auto-incremented</td></tr><tr><td>author_id</td><td>The id of the user who published the feed</td></tr><tr><td>content</td><td>the content of the feed</td></tr></tbody></table></li><li><p>reveive_content: receive content table, used to store the content received by the user in push mode:</p><table><thead><tr><th>field</th><th>description</th></tr></thead><tbody><tr><td>feed_id</td><td>The id of the published feed, the primary key is auto-incremented</td></tr><tr><td>author_id</td><td>The id of the user who published the feed</td></tr><tr><td>reveive_id</td><td>The id of the user who received the feed</td></tr><tr><td>content</td><td>the content of the feed</td></tr></tbody></table></li></ul><p>-followings: Follow table, which stores the people the user follows:</p><table><thead><tr><th>field</th><th>description</th></tr></thead><tbody><tr><td>id</td><td>primary key auto-increment</td></tr><tr><td>uid</td><td>user id</td></tr><tr><td>following_id</td><td>other user ids followed by this user</td></tr></tbody></table><ul><li><p>followers: fans table, which stores users&#39; fans:</p><table><thead><tr><th>field</th><th>description</th></tr></thead><tbody><tr><td>id</td><td>primary key auto-increment</td></tr><tr><td>uid</td><td>user id</td></tr><tr><td>follower_id</td><td>follow the user&#39;s user id</td></tr></tbody></table></li></ul><h3 id="_2-feed-push-pull-mode-the-process-of-a-push-mode-user-posting-a-piece-of-content" tabindex="-1"><a class="header-anchor" href="#_2-feed-push-pull-mode-the-process-of-a-push-mode-user-posting-a-piece-of-content" aria-hidden="true">#</a> 2. Feed push-pull mode - the process of a push mode user posting a piece of content</h3><ul><li><p>The user with uid 1 publishes a &quot;HelloWorld&quot; message.</p></li><li><p>After this content is written into the sending content table &quot;send_content&quot;, the content is as follows:</p><table><thead><tr><th>feed_id</th><th>author_id</th><th>content</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>Hello World</td></tr></tbody></table></li><li><p>Find fans whose uid is 1 in the fan table &quot;followers&quot;. The content of the fan table &quot;followers&quot; is as follows:</p><table><thead><tr><th>id</th><th>uid</th><th>follower_id</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>2</td></tr></tbody></table><p>It can be seen that the fan of the user with id 1 is the user with id 2.</p></li><li><p>Because this content needs to be displayed in the feed of the user whose id is 2, write the content into the receiving content table &quot;reveive_content&quot;. After writing, the content of the receiving content table &quot;reveive_content&quot; is as follows:</p><table><thead><tr><th>feed_id</th><th>author_id</th><th>reveive_id</th><th>content</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>2</td><td>Hello World</td></tr></tbody></table></li><li><p>When the user whose id is 2 displays the feed, the data that the user needs to display can be queried through the SQL statement &quot;select * from reveive_content where reveive_id=2&quot;.</p></li></ul><p>The disadvantages of push mode are:</p><p>There will be a delay when the number of pushers is too large, and it will waste storage space;</p><p>The update operation is expensive, not only changing the &quot;send_content&quot; table, but also needing to change the &quot;reveive_content&quot; table synchronously.</p><h3 id="_3-feed-push-pull-mode-the-process-of-posting-a-piece-of-content-by-a-user-in-pull-mode" tabindex="-1"><a class="header-anchor" href="#_3-feed-push-pull-mode-the-process-of-posting-a-piece-of-content-by-a-user-in-pull-mode" aria-hidden="true">#</a> 3. Feed push-pull mode - the process of posting a piece of content by a user in pull mode</h3><ul><li><p>The user with uid 5 publishes a message with the content &quot;Thinks&quot;.</p></li><li><p>After this content is written into the sending content table &quot;send_content&quot;, the content is as follows:</p><table><thead><tr><th>feed_id</th><th>author_id</th><th>content</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>Hello World</td></tr><tr><td>2</td><td>5</td><td>Thinks</td></tr></tbody></table></li><li><p>When the user whose uid is 10 displays the feed, look for the user who is followed by uid 10 in the following table &quot;followings&quot;. The following table is as follows:</p><table><thead><tr><th>id</th><th>uid</th><th>following_id</th></tr></thead><tbody><tr><td>1</td><td>10</td><td>5</td></tr></tbody></table><p>It can be seen that the user with uid 10 follows the user with uid 5, so it is necessary to obtain the content published by the user with uid 5.</p></li><li><p>The user whose uid is 5 uses the sql statement &quot;select * from send_content where author_id in (5)&quot; to query the content that needs to be displayed.</p></li></ul><p>It can be seen from the above that the pull mode adopts the strategy of exchanging time for space, and the user pushes content with high efficiency, but when the user displays the feed, it takes a lot of time for aggregation operations.</p><p>Summarize:</p><table><thead><tr><th>-</th><th>Post Content</th><th>Show Feed</th><th>Change Notification</th></tr></thead><tbody><tr><td>Push mode</td><td>Push to all fans</td><td>One sql statement can complete</td><td>High cost of change</td></tr><tr><td>Pull mode</td><td>No push</td><td>Requires a lot of aggregation operations</td><td>No change cost</td></tr></tbody></table><p>The public Weibo in &quot;Weibo&quot; adopts the pull mode, and the private Weibo adopts the push mode.</p><p>The biggest problem of the pull mode is a large number of aggregation operations, and the response time of the request may be long. The cache strategy can be used to make the response time of most requests reach 2 to 3 milliseconds.</p><h2 id="some-other-experience" tabindex="-1"><a class="header-anchor" href="#some-other-experience" aria-hidden="true">#</a> Some other experience</h2><h3 id="_1-efficiently-update-data-push-and-pull-content" tabindex="-1"><a class="header-anchor" href="#_1-efficiently-update-data-push-and-pull-content" aria-hidden="true">#</a> 1. Efficiently update data - push and pull content</h3><p>In normal App design, if the App needs to know whether there is content update on the home page, access the data acquisition API through a polling mechanism, and know whether there is content update from whether the API returns updated data. Polling is a typical pull mode, but it consumes electricity, flow rate.</p><p>How to reduce polling? The solution given here is the push mode, as shown in the figure below:</p><figure><img src="'+v+'" alt="Push Mode" tabindex="0" loading="lazy"><figcaption>Push Mode</figcaption></figure><p>Of course, you can’t just use the push mode. Due to the complexity of the mobile phone environment, there is no guarantee that the notification of the data update will reach the App. Therefore, the polling method should be used to regularly pull the data. The time interval can be set relatively longer. Through this combination of push and pull This mode can greatly reduce the frequency of App access to the App background and the amount of data transmitted.</p><h3 id="_2-some-techniques-for-dealing-with-expressions" tabindex="-1"><a class="header-anchor" href="#_2-some-techniques-for-dealing-with-expressions" aria-hidden="true">#</a> 2. Some techniques for dealing with expressions</h3><p>Emoticons are stored in MySQL. Some emoticon UTF-8 encodings are 3 bytes, and some are 4 bytes. Therefore, general UTF encoding (3 bytes) cannot store emoticon data. The common solution is:</p><p>Upgrade MySQL to above 5.5, and then change the character encoding to utf8mb4_general_ci.</p><h3 id="_3-mature-and-stable-open-source-software-to-choose-from" tabindex="-1"><a class="header-anchor" href="#_3-mature-and-stable-open-source-software-to-choose-from" aria-hidden="true">#</a> 3. Mature and stable open source software to choose from</h3><table><thead><tr><th>Features</th><th>Alternative Open Source Software</th></tr></thead><tbody><tr><td>Project Management Software</td><td>Mantis, BugFree</td></tr><tr><td>Code Management Software</td><td>SVN, Git</td></tr><tr><td>Programming languages</td><td>Java, PHP, Python, etc.</td></tr><tr><td>Server system</td><td>CentOS, Ubuntu</td></tr><tr><td>HTTP/HTTPS server</td><td>Nginx, Tomcat, Apache</td></tr><tr><td>Load balancing</td><td>Nginx, LVS, HAProxy</td></tr><tr><td>Mail Services</td><td>Postfix, Sendmail</td></tr><tr><td>Message Queue</td><td>RabbitMQ, ZeroMQ, Redis</td></tr><tr><td>Filesystem</td><td>Fastdfs, mogileFS, TFS</td></tr><tr><td>Android push</td><td>Androidpn, gopush</td></tr><tr><td>IOS push</td><td>Javapns, Pyapns</td></tr><tr><td>Geolocation query LBS</td><td>MongoDB</td></tr><tr><td>Chat</td><td>Openfire, ejobberd</td></tr><tr><td>Monitoring</td><td>ngos, zabbix</td></tr><tr><td>Cache</td><td>Memcache, Redis</td></tr><tr><td>Relational Database</td><td>MySQL, MariaDB, PostgreSQL</td></tr><tr><td>NoSQL database</td><td>Redis, MongoDB, Cassandra</td></tr><tr><td>Search</td><td>Coreseek, Solr, ElasticSearch</td></tr><tr><td>Image processing</td><td>GraphicsMagick, ImageMagick</td></tr><tr><td>Distributed access service</td><td>dubbo, dubbox</td></tr></tbody></table><h3 id="_3-available-mature-and-reliable-cloud-services" tabindex="-1"><a class="header-anchor" href="#_3-available-mature-and-reliable-cloud-services" aria-hidden="true">#</a> 3. Available mature and reliable cloud services</h3><p>For start-up companies, it is recommended to use mature and reliable cloud services and open source software as much as possible, and only focus on business logic.</p><table><thead><tr><th>Features</th><th>Available Cloud Services</th></tr></thead><tbody><tr><td>Project Management Tools</td><td>Teambition, Tower</td></tr><tr><td>Code hosting platform</td><td>GitHub, Gitlab, Bitbucket, CSDN CODE, Coding</td></tr><tr><td>Load Balancing</td><td>Alibaba Cloud SLB, Tencent Cloud CLB</td></tr><tr><td>Mail Service</td><td>SendCloud, MailGun</td></tr><tr><td>Message Queue</td><td>Alibaba Cloud MNS, Tencent Cloud CMQ</td></tr><tr><td>File system, image processing</td><td>Qiniu Cloud, Alibaba Cloud Object Storage OSS, Tencent Cloud Object Storage COS</td></tr><tr><td>Android Push</td><td>Aurora, Getui, Baidu Push</td></tr><tr><td>IOS Push</td><td>Aurora, Getui, Baidu Push</td></tr><tr><td>Chat</td><td>Rongyun, Huanxin</td></tr><tr><td>Monitoring</td><td>monitoring service that comes with monitoring treasure and cloud server</td></tr><tr><td>Cache</td><td>Alibaba Cloud Cache Service, Tencent Cloud Elastic Cache</td></tr><tr><td>Relational database</td><td>Alibaba Cloud RDS, Tencent Cloud CDB</td></tr><tr><td>NoSQL database</td><td>Alibaba Cloud NoSQL products, Tencent Cloud NoSQL products</td></tr><tr><td>Search</td><td>Alibaba Cloud Open Search, Tencent Cloud Search TCS</td></tr><tr><td>Distributed Access Service</td><td>Alibaba Cloud EDAS</td></tr><tr><td>Firewall</td><td>Alibaba Cloud Shield, Tencent Cloud Security</td></tr><tr><td>SMS sending</td><td>shareSDK, bmob, Luosimao</td></tr><tr><td>Social login share</td><td>shareSDK</td></tr></tbody></table><p>Finally, in mobile Internet projects, product development requires small steps and quick iterations. The design of the architecture can also follow the same idea. If you like this article, remember to give it a thumbs up!</p><hr>',94),q={href:"http://blog.csdn.net/smartbetter/article/details/53933096",target:"_blank",rel:"noopener noreferrer"};function C(M,L){const a=s("ExternalLinkIcon");return n(),d("div",null,[_,e("p",null,[e("a",T,[t("Nginx + Tomcat reverse proxy load balancing cluster deployment guide"),i(a)]),k,e("a",x,[t("How Nginx + Tomcat reverse proxy efficiently deploys multiple sites on one server"),i(a)])]),A,e("p",null,[t("Original link: "),e("a",q,[t("http://blog.csdn.net/smartbetter/article/details/53933096"),i(a)])])])}const H=o(S,[["render",C],["__file","2018121511.html.vue"]]);export{H as default};