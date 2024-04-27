import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as d,c as o,b as e,d as i,e as s,f as l}from"./app-5ZyUDSyM.js";const v={},c=e("p",null,"​",-1),t=e("h2",{id:"概要",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#概要","aria-hidden":"true"},"#"),i(" 概要")],-1),u=e("br",null,null,-1),m={href:"https://docs.gradle.org/current/userguide/java_platform_plugin.html",target:"_blank",rel:"noopener noreferrer"},b=e("code",null,"dependencyResolutionManagement",-1),p=e("br",null,null,-1),h={href:"https://docs.gradle.org/current/userguide/platforms.html",target:"_blank",rel:"noopener noreferrer"},g=e("br",null,null,-1),j={href:"https://zhuanlan.zhihu.com/p/570009095?utm_id=0",target:"_blank",rel:"noopener noreferrer"},_=l(`<h2 id="主要内容" tabindex="-1"><a class="header-anchor" href="#主要内容" aria-hidden="true">#</a> 主要内容</h2><h3 id="父项目-settings-gradle" tabindex="-1"><a class="header-anchor" href="#父项目-settings-gradle" aria-hidden="true">#</a> 父项目 settings.gradle</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>rootProject.name = &#39;jia&#39;

include &#39;jia-core&#39;, &#39;jia-mapper-common&#39;

dependencyResolutionManagement {
    versionCatalogs {
        libs {
            library(&#39;slf4j.api&#39;, &#39;org.slf4j:slf4j-api:1.7.30&#39;)
            library(&#39;pagehelper&#39;, &#39;com.github.pagehelper:pagehelper:5.1.11&#39;)
            library(&#39;mybatis-plus-core&#39;, &#39;com.baomidou:mybatis-plus:3.3.0&#39;)
            library(&#39;jakarta.inject.api&#39;, &#39;jakarta.inject:jakarta.inject-api:2.0.1&#39;)
            library(&#39;swagger.annotations&#39;, &#39;io.swagger:swagger-annotations:1.5.20&#39;)
            library(&#39;lombok&#39;, &#39;org.projectlombok:lombok:1.18.20&#39;)
            library(&#39;log4j&#39;, &#39;log4j:log4j:1.2.17&#39;)
            library(&#39;slf4j-log4j12&#39;, &#39;org.slf4j:slf4j-log4j12:1.7.5&#39;)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="父项目-build-gradle" tabindex="-1"><a class="header-anchor" href="#父项目-build-gradle" aria-hidden="true">#</a> 父项目 build.gradle</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>allprojects {
    group = &#39;cn.jia&#39;
}

subprojects {
    apply plugin: &#39;java-library&#39;
    apply plugin: &#39;maven-publish&#39;

    dependencies {
        implementation libs.slf4j.api
        annotationProcessor libs.lombok
        compileOnly libs.lombok
    }

    java.sourceCompatibility = JavaVersion.VERSION_17

    tasks.withType(JavaCompile).tap {
        configureEach {
            options.encoding = &#39;UTF-8&#39;
        }
    }

    test {
        useJUnitPlatform()
    }

    processTestResources.dependsOn copyTestResources

    publishing {
        publications {
            mavenJava(MavenPublication) {
                from components.java
            }
        }
        repositories {
            maven {
                url = version.endsWith(&#39;SNAPSHOT&#39;) ? rootProject.ext.snapshotsRepoUrl : rootProject.ext.snapshotsRepoUrl
                credentials {
                    username rootProject.ext.repoUsername
                    password rootProject.ext.repoPassword
                }
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jia-core-项目的-build-gradle" tabindex="-1"><a class="header-anchor" href="#jia-core-项目的-build-gradle" aria-hidden="true">#</a> jia-core 项目的 build.gradle</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>dependencies {
    implementation libs.log4j
    implementation libs.slf4j.api
    implementation libs.slf4j.log4j12
    implementation libs.lombok
    testImplementation libs.junit.jupiter
    testAnnotationProcessor libs.lombok
    testImplementation libs.lombok
}
version = &#39;1.1.1-SNAPSHOT&#39;
description = &#39;jia-core&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jia-mapper-common-项目的-build-gradle" tabindex="-1"><a class="header-anchor" href="#jia-mapper-common-项目的-build-gradle" aria-hidden="true">#</a> jia-mapper-common 项目的 build.gradle</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>dependencies {
    api project(&#39;:jia-core&#39;)
    api libs.pagehelper
    api libs.mybatis.plus.core
    implementation libs.jakarta.inject.api
    api libs.swagger.annotations
}

version = &#39;1.1.1-SNAPSHOT&#39;
description = &#39;jia-mapper-common&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题发现" tabindex="-1"><a class="header-anchor" href="#问题发现" aria-hidden="true">#</a> 问题发现</h2><p>配置完之后，项目能跑起来了，终于可以进行统一版本管理，不用每个模块单独去升级依赖。接着就是要将 jia-core 模块发布到maven私服上了，用的是阿里的私仓， RELEASE 仓和 SNAPSHOT 仓是分开的。这时候问题出现了，我当前版本是 1.1.1-SNAPSHOT ，应该上传到 SNAPSHOT 才对，但却上传到 RELEASE 仓去了。<br> 那肯定是 url 不对，只能调试一下，所以加打印了一下url。</p><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>repositories {
    maven {
        println version
        url = version.endsWith(&#39;SNAPSHOT&#39;) ? rootProject.ext.snapshotsRepoUrl : rootProject.ext.snapshotsRepoUrl
        credentials {
            username rootProject.ext.repoUsername
            password rootProject.ext.repoPassword
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现输出的却是<code>unspecified</code>，明明 jia-core 项目的 build.gradle 中已经定义了 version ，但为什么就是识别不了。</p><h2 id="问题解决" tabindex="-1"><a class="header-anchor" href="#问题解决" aria-hidden="true">#</a> 问题解决</h2><p>又是一轮各种尝试， Gradle 的指导文档真的很少，真心不想把 Gradle 官网翻一遍。<br> 我分别在父项目的 allprojects 、 subprojects 、 ext 和子项目的 allprojects 、 subprojects 、 ext 中都加了定义了 version 。发现在父项目中定义的 version 都能识别到，而在子项目中定义的 version 都识别不到。<br> 然后无意中看到一个贴子，说 Gradle 的加载顺序依次是父项目的 setting.gradle -&gt; 父项目的 build.gradle -&gt; 子项目的 build.gradle 。而 subprojects 是写在父项目的 build.gradle 上的，加载的时候还没加载子项目的 build.gradle ，自然是获取不了子项目的 version 。</p>`,15),f=e("br",null,null,-1),y={href:"https://docs.gradle.org/current/userguide/publishing_maven.html#publishing_maven:deferred_configuration",target:"_blank",rel:"noopener noreferrer"},x=l(`<p>既然知道原因，那就好办了，只要把 publishing 方法用 afterEvaluate 包起来即可，目的是加载完所有配置文件再加载 publishing 方法，自然就能获取得到 version 了。</p><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>allprojects {
    group = &#39;cn.jia&#39;
}

subprojects {
    apply plugin: &#39;java-library&#39;
    apply plugin: &#39;maven-publish&#39;

    dependencies {
        implementation libs.slf4j.api
        annotationProcessor libs.lombok
        compileOnly libs.lombok
    }

    java.sourceCompatibility = JavaVersion.VERSION_17

    tasks.withType(JavaCompile).tap {
        configureEach {
            options.encoding = &#39;UTF-8&#39;
        }
    }

    test {
        useJUnitPlatform()
    }

    processTestResources.dependsOn copyTestResources

    afterEvaluate {
        publishing {
            publications {
                mavenJava(MavenPublication) {
                    from components.java
                }
            }
            repositories {
                maven {
                    url = version.endsWith(&#39;SNAPSHOT&#39;) ? rootProject.ext.snapshotsRepoUrl : rootProject.ext.snapshotsRepoUrl
                    credentials {
                        username rootProject.ext.repoUsername
                        password rootProject.ext.repoPassword
                    }
                }
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function P(k,G){const n=r("ExternalLinkIcon");return d(),o("div",null,[c,t,e("p",null,[i("最近在折腾 Gradle 的依赖版本统一管理，真的是一步一个坑。一开始求助于 ChatGPT ，提供了两个插件，一个是 java-platform ，另一个是 io.spring.dependency-management 。我选择了使用 java-platform ，但是各种尝试都是报错，大家有兴趣可以看看官网例子。"),u,e("a",m,[i("https://docs.gradle.org/current/userguide/java_platform_plugin.html"),s(n)])]),e("p",null,[i("后来几番搜索，发现 Gradle7 之后又有一种新的版本管理的方式"),b,i(",官网介绍如下。"),p,e("a",h,[i("https://docs.gradle.org/current/userguide/platforms.html"),s(n)])]),e("p",null,[i("但是官网的介绍太碎片化了，所以又百度了一下，找到了下面这个贴子，里面介绍得非常详细。"),g,e("a",j,[i("https://zhuanlan.zhihu.com/p/570009095?utm_id=0"),s(n)])]),_,e("p",null,[i("其实官网也是有介绍的，只是英文实在不行，不容易理解。"),f,e("a",y,[i("https://docs.gradle.org/current/userguide/publishing_maven.html#publishing_maven:deferred_configuration"),s(n)])]),x])}const R=a(v,[["render",P],["__file","2023052511.html.vue"]]);export{R as default};
