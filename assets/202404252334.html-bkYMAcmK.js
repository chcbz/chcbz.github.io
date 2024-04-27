import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,f as s}from"./app-5ZyUDSyM.js";const d={},t=s(`<p>​</p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>最近新起了一套开发环境，需要从 Mysql 初始化数据到 ElasticSearch,以为重新新增一个 config 文件，配置新的 input 和 output 即可。</p><p>谁知经过测试发现，Logstash 启动之后，自动将第一个配置文件的 input 传输到两个 output 去了。</p><p>才知道，<strong>分开多个 config 文件，并没其他隔离作用</strong>。</p><h2 id="实现方式" tabindex="-1"><a class="header-anchor" href="#实现方式" aria-hidden="true">#</a> 实现方式</h2><p>后来在网上搜了下，发现有两种方法实现。</p><h3 id="通过-filter-进行分开输出" tabindex="-1"><a class="header-anchor" href="#通过-filter-进行分开输出" aria-hidden="true">#</a> 通过 filter 进行分开输出</h3><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>#第一个输入
input {
  kafka {
    codec =&gt; json
    bootstrap_servers =&gt; &quot;IP地址:端口号&quot;
    group_id =&gt; &quot;消费者组&quot;
    client_id =&gt; &quot;test&quot;
    topics =&gt; [&quot;test&quot;]
    type =&gt; &quot;apple&quot;
    auto_offset_reset =&gt; &quot;latest&quot;
  }
}
#第二个输入
input {
  kafka {
    codec =&gt; json
    bootstrap_servers =&gt; &quot;IP地址:端口号&quot;
    group_id =&gt; &quot;消费者组&quot;
    client_id =&gt; &quot;test2&quot;
    topics =&gt; [&quot;test2&quot;]
    type =&gt; &quot;banana&quot;
    auto_offset_reset =&gt; &quot;latest&quot;
  }
}
#过滤
filter {
  if[type] == &quot;apple&quot; {
    mutate {
      add_tag =&gt; [&quot;apple&quot;]
    }
  }
    
  if [type] == &quot;banana&quot; {
    mutate {
      add_tag =&gt; [&quot;banana&quot;]
    }
  } 
}
#输出     
output {
  stdout { codec =&gt; json }
  
  if &quot;apple&quot; in [tags] {
    elasticsearch {
      index =&gt; &quot;apple_index&quot;
      hosts =&gt; [&quot;IP地址:端口号&quot;]
    } 
  }
    
  if &quot;banana&quot; in [tags] {
    elasticsearch {
      index =&gt; &quot;banana_index&quot;
      hosts =&gt; [&quot;IP地址:端口号&quot;]
    } 
  } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过-pipeline-进行分开输出" tabindex="-1"><a class="header-anchor" href="#通过-pipeline-进行分开输出" aria-hidden="true">#</a> 通过 pipeline 进行分开输出</h3><p>pipelines.yml文件配置</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>- pipeline.id: apple
  path.config: &quot;/etc/logstash/conf.d/apple.conf&quot;
- pipeline.id: banana
  path.config: &quot;/etc/logstash/conf.d/banana.conf&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>apple.conf</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code> input {
      kafka {
        codec =&gt; json
        bootstrap_servers =&gt; &quot;IP地址:端口号&quot;
        group_id =&gt; &quot;消费者组&quot;
        client_id =&gt; &quot;test&quot;
        topics =&gt; [&quot;test&quot;]
        auto_offset_reset =&gt; &quot;latest&quot;
      }
}
output {
    stdout { codec =&gt; json }
    
   elasticsearch {
        index =&gt; &quot;apple_index&quot;
        hosts =&gt; [&quot;IP地址:端口号&quot;]
   } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>banana.conf</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code> input {
      kafka {
        codec =&gt; json
        bootstrap_servers =&gt; &quot;IP地址:端口号&quot;
        group_id =&gt; &quot;消费者组&quot;
        client_id =&gt; &quot;test&quot;
        topics =&gt; [&quot;test&quot;]
        auto_offset_reset =&gt; &quot;latest&quot;
      }
}
output {
    stdout { codec =&gt; json }
    
   elasticsearch {
        index =&gt; &quot;banana_index&quot;
        hosts =&gt; [&quot;IP地址:端口号&quot;]
   } 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),l=[t];function a(u,v){return n(),e("div",null,l)}const o=i(d,[["render",a],["__file","202404252334.html.vue"]]);export{o as default};
