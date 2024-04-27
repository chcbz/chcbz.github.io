import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as d,c as o,b as e,d as n,e as s,f as a}from"./app-5ZyUDSyM.js";const t={},c=e("p",null,"​",-1),v=e("h2",{id:"summary",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#summary","aria-hidden":"true"},"#"),n(" Summary")],-1),u=e("br",null,null,-1),m={href:"https://docs.gradle.org/current/userguide/java_platform_plugin.html",target:"_blank",rel:"noopener noreferrer"},b=e("code",null,"dependencyResolutionManagement",-1),p=e("br",null,null,-1),h={href:"https://docs.gradle.org/current/userguide/platforms.html",target:"_blank",rel:"noopener noreferrer"},g=e("br",null,null,-1),f={href:"https://zhuanlan.zhihu.com/p/570009095?utm_id=0",target:"_blank",rel:"noopener noreferrer"},j=a(`<h2 id="main-content" tabindex="-1"><a class="header-anchor" href="#main-content" aria-hidden="true">#</a> main content</h2><h3 id="parent-project-settings-gradle" tabindex="-1"><a class="header-anchor" href="#parent-project-settings-gradle" aria-hidden="true">#</a> parent project settings.gradle</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>rootProject.name = &#39;jia&#39;

include &#39;jia-core&#39;, &#39;jia-mapper-common&#39;

dependencyResolutionManagement {
     versionCatalogs {
         libs {
             library(&#39;slf4j.api&#39;, &#39;org.slf4j:slf4j-api:1.7.30&#39;)
             library(&#39;pagehelper&#39;, &#39;com.github.pagehelper:pagehelper:5.1.11&#39;)
             library(&#39;mybatis-plus-core&#39;, &#39;com.baomidou:mybatis-plus:3.3.0&#39;)
             library(&#39;jakarta.inject.api&#39;, &#39;jakarta.inject:jakarta.inject-api:2.0.1&#39;)
             library(&#39;swagger.annotations&#39;, &#39;io.swagger:swagger-annotations:1.5.20&#39;)
             library(&#39;lombok&#39;, &#39;org. projectlombok:lombok:1.18.20&#39;)
             library(&#39;log4j&#39;, &#39;log4j:log4j:1.2.17&#39;)
             library(&#39;slf4j-log4j12&#39;, &#39;org.slf4j:slf4j-log4j12:1.7.5&#39;)
         }
     }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="parent-project-build-gradle" tabindex="-1"><a class="header-anchor" href="#parent-project-build-gradle" aria-hidden="true">#</a> parent project build.gradle</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>allprojects {
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

     processTestResources. depends On copyTestResources

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="build-gradle-of-jia-core-project" tabindex="-1"><a class="header-anchor" href="#build-gradle-of-jia-core-project" aria-hidden="true">#</a> build.gradle of jia-core project</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>dependencies {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="build-gradle-of-jia-mapper-common-project" tabindex="-1"><a class="header-anchor" href="#build-gradle-of-jia-mapper-common-project" aria-hidden="true">#</a> build.gradle of jia-mapper-common project</h3><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>dependencies {
     api project(&#39;:jia-core&#39;)
     api libs.pagehelper
     api libs.mybatis.plus.core
     implementation libs.jakarta.inject.api
     api libs.swagger.annotations
}

version = &#39;1.1.1-SNAPSHOT&#39;
description = &#39;jia-mapper-common&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="problem-discovery" tabindex="-1"><a class="header-anchor" href="#problem-discovery" aria-hidden="true">#</a> Problem Discovery</h2><p>After the configuration is complete, the project can run, and finally unified version management can be performed, without the need to upgrade dependencies for each module individually. The next step is to publish the jia-core module to the maven private server, using Ali&#39;s private warehouse, the RELEASE warehouse and the SNAPSHOT warehouse are separate. At this time, the problem arises. My current version is 1.1.1-SNAPSHOT. It should be uploaded to SNAPSHOT, but it is uploaded to RELEASE warehouse.<br> It must be that the url is wrong, I can only debug it, so I printed the url.</p><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>repositories {
     maven {
         println version
         url = version.endsWith(&#39;SNAPSHOT&#39;) ? rootProject.ext.snapshotsRepoUrl : rootProject.ext.snapshotsRepoUrl
         credentials {
             username rootProject.ext.repoUsername
             password rootProject.ext.repoPassword
         }
     }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>It is found that the output is <code>unspecified</code>, obviously the version has been defined in the build.gradle of the jia-core project, but why it cannot be recognized.</p><h2 id="problem-solved" tabindex="-1"><a class="header-anchor" href="#problem-solved" aria-hidden="true">#</a> problem solved</h2><p>Another round of various attempts, Gradle has very few guidance documents, and I really don’t want to go through the official Gradle website.<br> I have defined version in allprojects , subprojects , ext of the parent project and allprojects , subprojects , ext of the subproject respectively. It is found that the version defined in the parent project can be recognized, but the version defined in the sub-project cannot be recognized.<br> Then I accidentally saw a post saying that the loading order of Gradle is setting.gradle of the parent project -&gt; build.gradle of the parent project -&gt; build.gradle of the subproject. The subprojects are written on the build.gradle of the parent project, and the build.gradle of the subproject has not been loaded when loading, so naturally the version of the subproject cannot be obtained.</p>`,15),y=e("br",null,null,-1),_={href:"https://docs.gradle.org/current/userguide/publishing_maven.html#publishing_maven:deferred_configuration",target:"_blank",rel:"noopener noreferrer"},w=a(`<p>Now that you know the reason, it’s easy to handle. Just wrap the publishing method with afterEvaluate. The purpose is to load all the configuration files and then load the publishing method, and you can get the version naturally.</p><div class="language-Groovy line-numbers-mode" data-ext="Groovy"><pre class="language-Groovy"><code>allprojects {
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

     processTestResources. depends On copyTestResources

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function x(P,k){const i=l("ExternalLinkIcon");return d(),o("div",null,[c,v,e("p",null,[n("Recently, I have been tossing about the unified management of Gradle's dependency versions, which is really a pitfall step by step. At the beginning, we turned to ChatGPT to provide two plug-ins, one is java-platform and the other is io.spring.dependency-management. I chose to use java-platform , but various attempts resulted in errors. If you are interested, you can take a look at the examples on the official website."),u,e("a",m,[n("https://docs.gradle.org/current/userguide/java_platform_plugin.html"),s(i)])]),e("p",null,[n("After several searches, I found that there is a new version management method "),b,n(" after Gradle7. The official website introduces it as follows."),p,e("a",h,[n("https://docs.gradle.org/current/userguide/platforms.html"),s(i)])]),e("p",null,[n("But the introduction on the official website is too fragmented, so I googled it again and found the following post, which introduces it in great detail."),g,e("a",f,[n("https://zhuanlan.zhihu.com/p/570009095?utm_id=0"),s(i)])]),j,e("p",null,[n("In fact, the official website also has an introduction, but the English is really bad and it is not easy to understand."),y,e("a",_,[n("https://docs.gradle.org/current/userguide/publishing_maven.html#publishing_maven:deferred_configuration"),s(i)])]),w])}const S=r(t,[["render",x],["__file","2023052511.html.vue"]]);export{S as default};
