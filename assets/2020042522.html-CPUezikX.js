const e=JSON.parse('{"key":"v-6f882630","path":"/en/article/2020042522.html","title":"Record several Java development interview questions","lang":"en-US","frontmatter":{"title":"Record several Java development interview questions","icon":"creative","date":"2020-04-25T22:02:05.000Z","category":["article"],"tag":["Java"],"star":true,"description":"​ The basis for indexing The primary key and foreign key of the table must have indexes. Tables with more than 300 data should have indexes. For tables that are often connected with other tables, the connection fields should have indexes. The fields that often appear in the where statement, especially the fields of large tables, should be indexed. It is often necessary to build an index on the field for range search, because the index has been sorted, and the specified range is continuous. The fields that often need to be sorted are indexed, because the index is already sorted. Create an index for the fields that often appear behind order by, group by, and distinct. Indexes should be built on small fields. For large text fields and super long fields, do not build indexes. If it always appears in the where statement at the same time, you can consider building a composite index, otherwise it will be decomposed into multiple single-field indexes. The composite index should put the fields with high application degree in front. The more indexes the better, too many indexes will affect the performance of writing data.","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://blog.chcbz.net/article/2020042522.html"}],["meta",{"property":"og:url","content":"https://blog.chcbz.net/en/article/2020042522.html"}],["meta",{"property":"og:site_name","content":"Commoner Yunshuike"}],["meta",{"property":"og:title","content":"Record several Java development interview questions"}],["meta",{"property":"og:description","content":"​ The basis for indexing The primary key and foreign key of the table must have indexes. Tables with more than 300 data should have indexes. For tables that are often connected with other tables, the connection fields should have indexes. The fields that often appear in the where statement, especially the fields of large tables, should be indexed. It is often necessary to build an index on the field for range search, because the index has been sorted, and the specified range is continuous. The fields that often need to be sorted are indexed, because the index is already sorted. Create an index for the fields that often appear behind order by, group by, and distinct. Indexes should be built on small fields. For large text fields and super long fields, do not build indexes. If it always appears in the where statement at the same time, you can consider building a composite index, otherwise it will be decomposed into multiple single-field indexes. The composite index should put the fields with high application degree in front. The more indexes the better, too many indexes will affect the performance of writing data."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-15T01:31:51.000Z"}],["meta",{"property":"article:author","content":"Mr.Chen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2020-04-25T22:02:05.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-15T01:31:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Record several Java development interview questions\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-04-25T22:02:05.000Z\\",\\"dateModified\\":\\"2023-04-15T01:31:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chen\\",\\"url\\":\\"https://blog.chcbz.net\\"}]}"]]},"headers":[{"level":2,"title":"The basis for indexing","slug":"the-basis-for-indexing","link":"#the-basis-for-indexing","children":[]},{"level":2,"title":"Under what circumstances will the index be invalid","slug":"under-what-circumstances-will-the-index-be-invalid","link":"#under-what-circumstances-will-the-index-be-invalid","children":[]},{"level":2,"title":"Reasons for spring transaction failure","slug":"reasons-for-spring-transaction-failure","link":"#reasons-for-spring-transaction-failure","children":[]},{"level":2,"title":"How to avoid deadlock","slug":"how-to-avoid-deadlock","link":"#how-to-avoid-deadlock","children":[]},{"level":2,"title":"Between integers == when is true and when is false","slug":"between-integers-when-is-true-and-when-is-false","link":"#between-integers-when-is-true-and-when-is-false","children":[]},{"level":2,"title":"What are the application scenarios of redis","slug":"what-are-the-application-scenarios-of-redis","link":"#what-are-the-application-scenarios-of-redis","children":[]},{"level":2,"title":"The composition of the HTTP protocol","slug":"the-composition-of-the-http-protocol","link":"#the-composition-of-the-http-protocol","children":[]},{"level":2,"title":"The lifecycle of the HTTP protocol","slug":"the-lifecycle-of-the-http-protocol","link":"#the-lifecycle-of-the-http-protocol","children":[]}],"git":{"createdTime":1681522311000,"updatedTime":1681522311000,"contributors":[{"name":"chcbz","email":"chcbz@sina.com","commits":1}]},"readingTime":{"minutes":3.6,"words":1081},"filePathRelative":"en/article/2020042522.md","localizedDate":"April 25, 2020","excerpt":"<p>​</p>\\n<h2> The basis for indexing</h2>\\n<ol>\\n<li>\\n<p>The primary key and foreign key of the table must have indexes.</p>\\n</li>\\n<li>\\n<p>Tables with more than 300 data should have indexes.</p>\\n</li>\\n<li>\\n<p>For tables that are often connected with other tables, the connection fields should have indexes.</p>\\n</li>\\n<li>\\n<p>The fields that often appear in the where statement, especially the fields of large tables, should be indexed.</p>\\n</li>\\n<li>\\n<p>It is often necessary to build an index on the field for range search, because the index has been sorted, and the specified range is continuous.</p>\\n</li>\\n<li>\\n<p>The fields that often need to be sorted are indexed, because the index is already sorted.</p>\\n</li>\\n<li>\\n<p>Create an index for the fields that often appear behind order by, group by, and distinct.</p>\\n</li>\\n<li>\\n<p>Indexes should be built on small fields. For large text fields and super long fields, do not build indexes.</p>\\n</li>\\n<li>\\n<p>If it always appears in the where statement at the same time, you can consider building a composite index, otherwise it will be decomposed into multiple single-field indexes.</p>\\n</li>\\n<li>\\n<p>The composite index should put the fields with high application degree in front.</p>\\n</li>\\n<li>\\n<p>The more indexes the better, too many indexes will affect the performance of writing data.</p>\\n</li>\\n</ol>","autoDesc":true}');export{e as data};