import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/en/": [
    "",
    {
      icon: "discover",
      text: "Article",
      prefix: "article/",
      link: "article/",
      children: "structure",
    },
    {
      text: "Video",
      icon: "actions",
      prefix: "video/",
      children: "structure",
    },
  ],
});
