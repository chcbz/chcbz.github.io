import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    // {
    //   icon: "discover",
    //   text: "文章",
    //   prefix: "article/",
    //   link: "article/",
    //   children: "structure",
    // },
    {
      text: "视频",
      icon: "actions",
      prefix: "video/",
      children: "structure",
    },
    "slides",
  ],
});
