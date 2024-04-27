const e=JSON.parse(`{"key":"v-5aaa870d","path":"/en/article/2023040520.html","title":"Paste pictures when editing markdown in vscode","lang":"en-US","frontmatter":{"title":"Paste pictures when editing markdown in vscode","icon":"creative","date":"2023-04-05T21:20:01.000Z","category":["article"],"tag":["VSCode"],"description":"​​​​ Recently, I am using vuepress to make my own blog. I usually write code in IDEA except for Java, and other languages ​​are written in vscode. I saw on the Internet that it is possible to quickly add pictures through plug-ins, so I found it in the plug-in library. Next, there are two popular plug-ins, Markdown Image and Paste Image, because Markdown Image ranks first (although the download volume is not as high as Paste Image), so Markdown Image is installed first, but follow the instructions, no matter what I can't paste it, and pressing the Shift + Alt + V shortcut keys has no response at all. After various attempts, I found that vscode cannot directly copy and paste files with Ctrl + C and Ctrl + V from the windows explorer. It must be copied and pasted by dragging and dropping. I asked ChatGPT specifically, and it actually told me that vscode supports copying and pasting with Ctrl + C and Ctrl + V, and that my vscode has no permissions. After all kinds of tossing, I finally found a more reasonable answer. The copy and paste of vscode can only be operated in the same workplace, and cannot be copied and pasted with the operating system. Since Markdown Image is not available, we can only try to install Paste Image. After installation, press Ctrl + Alt + V shortcut keys, and it prompts There is not a image in clipboard., still can't paste the picture, but it is better than Markdown Image, at least there is a prompt message. Then it was tossing again. This time, instead of copying the picture file directly, it was successful by taking a screenshot, but the file was saved to the current directory of the md file, and the date and time were used as the file name, which is not very friendly. Finally, the following plug-in configuration is modified, and the image file is saved to the assets\\\\MD file name directory.","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://blog.chcbz.net/article/2023040520.html"}],["meta",{"property":"og:url","content":"https://blog.chcbz.net/en/article/2023040520.html"}],["meta",{"property":"og:site_name","content":"Commoner Yunshuike"}],["meta",{"property":"og:title","content":"Paste pictures when editing markdown in vscode"}],["meta",{"property":"og:description","content":"​​​​ Recently, I am using vuepress to make my own blog. I usually write code in IDEA except for Java, and other languages ​​are written in vscode. I saw on the Internet that it is possible to quickly add pictures through plug-ins, so I found it in the plug-in library. Next, there are two popular plug-ins, Markdown Image and Paste Image, because Markdown Image ranks first (although the download volume is not as high as Paste Image), so Markdown Image is installed first, but follow the instructions, no matter what I can't paste it, and pressing the Shift + Alt + V shortcut keys has no response at all. After various attempts, I found that vscode cannot directly copy and paste files with Ctrl + C and Ctrl + V from the windows explorer. It must be copied and pasted by dragging and dropping. I asked ChatGPT specifically, and it actually told me that vscode supports copying and pasting with Ctrl + C and Ctrl + V, and that my vscode has no permissions. After all kinds of tossing, I finally found a more reasonable answer. The copy and paste of vscode can only be operated in the same workplace, and cannot be copied and pasted with the operating system. Since Markdown Image is not available, we can only try to install Paste Image. After installation, press Ctrl + Alt + V shortcut keys, and it prompts There is not a image in clipboard., still can't paste the picture, but it is better than Markdown Image, at least there is a prompt message. Then it was tossing again. This time, instead of copying the picture file directly, it was successful by taking a screenshot, but the file was saved to the current directory of the md file, and the date and time were used as the file name, which is not very friendly. Finally, the following plug-in configuration is modified, and the image file is saved to the assets\\\\MD file name directory."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-15T01:31:51.000Z"}],["meta",{"property":"article:author","content":"Mr.Chen"}],["meta",{"property":"article:tag","content":"VSCode"}],["meta",{"property":"article:published_time","content":"2023-04-05T21:20:01.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-15T01:31:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Paste pictures when editing markdown in vscode\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-05T21:20:01.000Z\\",\\"dateModified\\":\\"2023-04-15T01:31:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chen\\",\\"url\\":\\"https://blog.chcbz.net\\"}]}"]]},"headers":[],"git":{"createdTime":1681522311000,"updatedTime":1681522311000,"contributors":[{"name":"chcbz","email":"chcbz@sina.com","commits":1}]},"readingTime":{"minutes":1.42,"words":427},"filePathRelative":"en/article/2023040520.md","localizedDate":"April 5, 2023","excerpt":"<p>​​​​</p>\\n<p>Recently, I am using vuepress to make my own blog. I usually write code in IDEA except for Java, and other languages ​​are written in vscode. I saw on the Internet that it is possible to quickly add pictures through plug-ins, so I found it in the plug-in library. Next, there are two popular plug-ins, Markdown Image and Paste Image, because Markdown Image ranks first (although the download volume is not as high as Paste Image), so Markdown Image is installed first, but follow the instructions, no matter what I can't paste it, and pressing the Shift + Alt + V shortcut keys has no response at all.<br>\\nAfter various attempts, I found that vscode cannot directly copy and paste files with Ctrl + C and Ctrl + V from the windows explorer. It must be copied and pasted by dragging and dropping. I asked ChatGPT specifically, and it actually told me that vscode supports copying and pasting with Ctrl + C and Ctrl + V, and that my vscode has no permissions. After all kinds of tossing, I finally found a more reasonable answer. The copy and paste of vscode can only be operated in the same workplace, and cannot be copied and pasted with the operating system.<br>\\nSince Markdown Image is not available, we can only try to install Paste Image. After installation, press Ctrl + Alt + V shortcut keys, and it prompts <code>There is not a image in clipboard.</code>, still can't paste the picture, but it is better than Markdown Image, at least there is a prompt message.<br>\\nThen it was tossing again. This time, instead of copying the picture file directly, it was successful by taking a screenshot, but the file was saved to the current directory of the md file, and the date and time were used as the file name, which is not very friendly. Finally, the following plug-in configuration is modified, and the image file is saved to the <code>assets\\\\MD file name</code> directory.</p>","autoDesc":true}`);export{e as data};
