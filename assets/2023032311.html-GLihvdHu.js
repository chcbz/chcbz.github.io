import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o,c as l,b as e,d as i,e as t,f as a}from"./app-5ZyUDSyM.js";const d="/assets/img-20230413210618-KvzzTivt.png",c="/assets/img-20230413210656-AKRkunr8.png",m="/assets/img-20230413210905-IxJeJnSJ.png",v="/assets/img-20230413210932-Xn39DFvy.png",u="/assets/img-20230413211241-2UuriLDN.png",g="/assets/img-20230413211355-W7AXX3JP.png",p="/assets/img-20230413211426-8-nwpwHl.png",b={},f=e("p",null,"​",-1),h=e("figure",null,[e("img",{src:d,alt:"GraalVM",tabindex:"0",loading:"lazy"}),e("figcaption",null,"GraalVM")],-1),w=e("h2",{id:"_1-download-and-install-graalvm",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-download-and-install-graalvm","aria-hidden":"true"},"#"),i(" 1. Download and install GraalVM")],-1),k={href:"https://github.com/graalvm/graalvm-ce-builds/releases/tag/vm-22.3.1",target:"_blank",rel:"noopener noreferrer"},y=a('<figure><img src="'+c+`" alt="GraalVM Community Edition" tabindex="0" loading="lazy"><figcaption>GraalVM Community Edition</figcaption></figure><p>I downloaded the latest GraalVM Community Edition 22.3.1 and chose Java 17.</p><p>After downloading, unzip it to any local directory (for example: D:\\software\\Java\\graalvm-ce-java17-22.3.1), and configure the environment variable Path.</p><p>Open the command prompt, enter the bin directory of jdk, and install native-image through the gu command.</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>C:\\Users\\Think&gt;D:

D:\\&gt;cd software\\Java\\graalvm-ce-java17-22.3.1\\bin

D:\\software\\Java\\graalvm-ce-java17-22.3.1\\bin&gt;gu install native-image
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After installation, you can use the gu list command to check whether the installation is successful</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>D:\\software\\Java\\graalvm-ce-java17-22.3.1\\bin&gt;gu list
ComponentId Version Component name Stability Origin
-------------------------------------------------- -------------------------------------------------- -----------------------------

graalvm 22.3.1 GraalVM Core Supported
native-image 22.3.1 Native Image Early adopter github.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-install-microsoft-visual-studio" tabindex="-1"><a class="header-anchor" href="#_2-install-microsoft-visual-studio" aria-hidden="true">#</a> 2. Install Microsoft Visual Studio</h2><p>To run native-image normally on the windows system, MSVC must be installed, otherwise the following error will be reported.</p><blockquote><p>Default native-compiler executable &#39;cl.exe&#39; not found via environment variab</p></blockquote><p>or the following error</p><blockquote><p>Error compiling query code (in C:\\Users\\xxx\\AppData\\Local\\Temp\\SVM-8246985</p></blockquote><p>I installed the 2019 version, the download address is</p>`,13),F={href:"https://my.visualstudio.com/Downloads?q=visual%20studio%202019&wt.mc_id=o~msft~vscom~older-downloads",target:"_blank",rel:"noopener noreferrer"},C=a('<figure><img src="'+m+'" alt="download visualstudio" tabindex="0" loading="lazy"><figcaption>download visualstudio</figcaption></figure><p>You can choose the community version, and you can install it after downloading. Some tutorials say that you only need to install the MSVC single component, but I am greedy for convenience and directly installed C++ desktop development.</p><figure><img src="'+v+`" alt="install visualstudio" tabindex="0" loading="lazy"><figcaption>install visualstudio</figcaption></figure><p>After the installation, it was prompted to restart the system. I don’t know what will happen if I don’t restart it. Anyway, I restarted it.</p><p>Then you need to configure three environment variables</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>Path=C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\VC\\Tools\\MSVC\\14.29.30133\\bin\\Hostx64\\x64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>(This is to solve <code>cl.exe&#39; not found</code> error)</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>LIB=C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.19041.0\\um\\x64;C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.19041.0\\ucrt\\x64; C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\VC\\Tools\\MSVC\\14.29.30133\\lib\\x64;
INCLUDE=C:\\Program Files (x86)\\Windows Kits\\10\\Include\\10.0.19041.0\\ucrt;C:\\Program Files (x86)\\Windows Kits\\10\\Include\\10.0.19041.0\\um;C:\\Program Files (x86)\\Windows Kits\\10\\Include\\10.0.19041.0\\shared;C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\VC\\Tools\\MSVC\\14.29.30133\\include;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>(This is to solve <code>Error compiling query code</code> error)</p><p>It should be noted that <strong>These file paths have version numbers, whichever is actual</strong>.</p><h2 id="_3-run-the-springboot-sample-code" tabindex="-1"><a class="header-anchor" href="#_3-run-the-springboot-sample-code" aria-hidden="true">#</a> 3. Run the springboot sample code</h2><p>If you already have a springboot project, you can modify it directly. For intuitiveness, use the springboot sample code directly, which is more intuitive, and you can quickly troubleshoot problems.</p><p>From the spring official website, you can customize the sample code according to your requirements.</p>`,13),x={href:"https://start.spring.io/",target:"_blank",rel:"noopener noreferrer"},P=a('<figure><img src="'+u+`" alt="springboot" tabindex="0" loading="lazy"><figcaption>springboot</figcaption></figure><p>I only chose GraalVM Native Support and Spring Web, as long as it can run. After selection, press the &quot;GENERATE&quot; button to download.</p><p>After downloading, extract it to a local random directory (for example: D:\\workspace\\project\\springboot-native).</p><p>Open the command prompt, enter the project directory, and type the following command to directly build the springboot executable file.</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>D:\\software\\Java\\graalvm-ce-java17-22.3.1\\bin&gt;cd D:\\workspace\\project\\springboot-native
D:\\workspace\\project\\springboot-native&gt;gradlew nativeCompile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>By the way, paste the results for reference</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>&gt; Task :nativeCompile
[native-image-plugin] GraalVM Toolchain detection is disabled
[native-image-plugin] GraalVM location read from environment variable: JAVA_HOME
[native-image-plugin] Native Image executable path: D:\\software\\Java\\graalvm-ce-java17-22.3.1\\bin\\native-image.cmd
=======================================================================================================================
GraalVM Native Image: Generating &#39;demo&#39; (executable)...
========================================================================================================================
[1/7] Initializing...                                                                                   (17.6s @ 0.19GB
 Version info: &#39;GraalVM 22.3.1 Java 17 CE&#39;
 Java version info: &#39;17.0.6+10-jvmci-22.3-b13&#39;
 C compiler: cl.exe (microsoft, x64, 19.29.30148)
 Garbage collector: Serial GC
 1 user-specific feature(s)

- org.springframework.aot.nativex.feature.PreComputeFieldFeature
Field org.apache.commons.logging.LogAdapter#log4jSpiPresent set to true at build time
Field org.apache.commons.logging.LogAdapter#log4jSlf4jProviderPresent set to true at build time
Field org.apache.commons.logging.LogAdapter#slf4jSpiPresent set to true at build time
Field org.apache.commons.logging.LogAdapter#slf4jApiPresent set to true at build time
Field org.springframework.core.NativeDetector#imageCode set to true at build time
Field org.springframework.format.support.DefaultFormattingConversionService#jsr354Present set to false at build time
Field org.springframework.core.KotlinDetector#kotlinPresent set to false at build time
Field org.springframework.core.KotlinDetector#kotlinReflectPresent set to false at build time
Field org.springframework.cglib.core.AbstractClassGenerator#imageCode set to true at build time
Field org.springframework.boot.logging.log4j2.Log4J2LoggingSystem$Factory#PRESENT set to false at build time
Field org.springframework.boot.logging.logback.LogbackLoggingSystem$Factory#PRESENT set to true at build time
Field org.springframework.boot.logging.java.JavaLoggingSystem$Factory#PRESENT set to true at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#romePresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#jaxb2Present set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#jackson2Present set to true at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#jackson2XmlPresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#jackson2SmilePresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#jackson2CborPresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#gsonPresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#jsonbPresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#kotlinSerializationCborPresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#kotlinSerializationJsonPresent set to false at build time
Field org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport#kotlinSerializationProtobufPresent set to false at build time
Field org.springframework.web.context.request.RequestContextHolder#jsfPresent set to false at build timed time
Field org.springframework.web.servlet.view.InternalResourceViewResolver#jstlPresent set to false at build time
Field org.springframework.http.converter.json.Jackson2ObjectMapperBuilder#jackson2XmlPresent set to false at build time
Field org.springframework.boot.logging.logback.LogbackLoggingSystemProperties#JBOSS_LOGGING_PRESENT set to false at build time
Field org.springframework.boot.autoconfigure.web.format.WebConversionService#JSR_354_PRESENT set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#jaxb2Present set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#jackson2Present set to true at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#jackson2XmlPresent set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#jackson2SmilePresent set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#gsonPresent set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#jsonbPresent set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#kotlinSerializationCborPresent set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#kotlinSerializationJsonPresent set to false at build time
Field org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter#kotlinSerializationProtobufPresent set to false at build time
Field org.springframework.context.event.ApplicationListenerMethodAdapter#reactiveStreamsPresent set to false at build time
Field org.springframework.web.client.RestTemplate#romePresent set to false at build time
Field org.springframework.web.client.RestTemplate#jaxb2Present set to false at build time
Field org.springframework.web.client.RestTemplate#jackson2Present set to true at build time
Field org.springframework.web.client.RestTemplate#jackson2XmlPresent set to false at build time
Field org.springframework.web.client.RestTemplate#jackson2SmilePresent set to false at build time
Field org.springframework.web.client.RestTemplate#jackson2CborPresent set to false at build time
Field org.springframework.web.client.RestTemplate#gsonPresent set to false at build time
Field org.springframework.web.client.RestTemplate#jsonbPresent set to false at build time
Field org.springframework.web.client.RestTemplate#kotlinSerializationCborPresent set to false at build time
Field org.springframework.web.client.RestTemplate#kotlinSerializationJsonPresent set to false at build time
Field org.springframework.web.client.RestTemplate#kotlinSerializationProtobufPresent set to false at build time
Field org.springframework.core.ReactiveAdapterRegistry#reactorPresent set to false at build time
Field org.springframework.core.ReactiveAdapterRegistry#rxjava3Present set to false at build time
Field org.springframework.core.ReactiveAdapterRegistry#kotlinCoroutinesPresent set to false at build time
Field org.springframework.core.ReactiveAdapterRegistry#mutinyPresent set to false at build time
SLF4J: No SLF4J providers were found.
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See &lt;https://www.slf4j.org/codes.html#noProviders&gt; for further details.
Field org.springframework.web.servlet.mvc.method.annotation.ReactiveTypeHandler#isContextPropagationPresent set to false at build time
Field org.springframework.web.servlet.support.RequestContext#jstlPresent set to false at build time
[2/7] Performing analysis...  [*********]                                                              (106.1s @ 2.23GB
  15,266 (92.64%) of 16,478 classes reachable
  24,944 (67.69%) of 36,848 fields reachable
  73,664 (62.39%) of 118,077 methods reachable
     798 classes,   242 fields, and 3,537 methods registered for reflection
      83 classes,    78 fields, and    68 methods registered for JNI access
       5 native libraries: crypt32, ncrypt, psapi, version, winhttp
[3/7] Building universe...                                                                              (14.3s @ 1.62GB
[4/7] Parsing methods...      [***]                                                                      (9.1s @ 2.81GB
[5/7] Inlining methods...     [***]                                                                      (5.4s @ 1.76GB
[6/7] Compiling methods...    [********]                                                                (74.8s @ 1.67GB)
[7/7] Creating image...                                                                                 (10.8s @ 3.69GB
  34.48MB (52.40%) for code area:    48,251 compilation units
  30.89MB (46.94%) for image heap:  352,399 objects and 120 resources
 441.67KB ( 0.66%) for other data
  65.80MB in total

------------------------------------------------------------------------------------------------------------------------

Top 10 packages in code area:                               Top 10 object types in image heap
   1.64MB sun.security.ssl                                     7.34MB byte[] for code metadata
   1.05MB java.util                                            3.63MB java.lang.Class
 842.84KB java.lang.invoke                                     3.40MB java.lang.String
 725.07KB com.sun.crypto.provider                              2.84MB byte[] for general heap data
 563.66KB org.apache.catalina.core                             2.80MB byte[] for java.lang.String
 521.32KB org.apache.tomcat.util.net                           1.28MB com.oracle.svm.core.hub.DynamicHubCompanion
 496.14KB org.apache.coyote.http2                              1.02MB byte[] for embedded resources
 477.32KB java.lang                                          821.19KB byte[] for reflection metadata
 470.10KB c.s.org.apache.xerces.internal.impl.xs.traversers  660.87KB java.lang.String[]
 467.51KB java.util.concurrent                               616.78KB java.util.HashMap$Node
  26.98MB for 622 more packages                                5.63MB for 3062 more object types
-----------------------------------------------------------------------------------------------------------------------

                        8.9s (3.5% of total time) in 38 GCs | Peak RSS: 5.83GB | CPU load: 5.40
------------------------------------------------------------------------------------------------------------------------

Produced artifacts
 D:\\workspace\\project\\springboot-native\\build\\native\\nativeCompile\\demo.build_artifacts.txt (txt)
 D:\\workspace\\project\\springboot-native\\build\\native\\nativeCompile\\demo.exe (executable)
========================================================================================================================

Finished generating &#39;demo&#39; in 4m 12s.
[native-image-plugin] Native Image written to: D:\\workspace\\project\\springboot-native\\build\\native\\nativeCompile

BUILD SUCCESSFUL in 4m 21s
9 actionable tasks: 1 executed, 8 up-to-date
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After success, you can see the executable file in the build\\native\\nativeCompile directory</p><figure><img src="`+g+'" alt="nativeCompile" tabindex="0" loading="lazy"><figcaption>nativeCompile</figcaption></figure><p>Just double-click demo.exe to run</p><figure><img src="'+p+`" alt="Effect image" tabindex="0" loading="lazy"><figcaption>Effect image</figcaption></figure><p>This is the end of the whole article. . . .</p><p>Of course, there is another way to build the jar package first, and then use the native-image command to compile it into an executable file.</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>D:\\workspace\\project\\springboot-native&gt;gradlew build
D:\\workspace\\project\\springboot-native&gt;cd build\\libs
D:\\workspace\\project\\springboot-native\\build\\libs&gt;native-image-jar demo-0.0.1-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is also possible.</p><p>The final exe file is 65M, which is not small, and the jar package is only 18M. However, the exe does not need a jvm environment and takes up 60M of memory after startup, while directly starting the jar file takes up 109M of memory, which is relatively advantageous.</p>`,16);function S(j,M){const n=r("ExternalLinkIcon");return o(),l("div",null,[f,h,w,e("p",null,[e("a",k,[i("https://github.com/graalvm/graalvm-ce-builds/releases/tag/vm-22.3.1"),t(n)])]),y,e("p",null,[e("a",F,[i("https://my.visualstudio.com/Downloads?q=visual studio 2019&wt.mc_id=o~msft~vscom~older-downloads"),t(n)])]),C,e("p",null,[e("a",x,[i("https://start.spring.io/"),t(n)])]),P])}const T=s(b,[["render",S],["__file","2023032311.html.vue"]]);export{T as default};
