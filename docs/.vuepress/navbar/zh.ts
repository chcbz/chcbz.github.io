import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "文章", icon: "discover", link: "/article/" },
  { text: "视频", icon: "discover", link: "/video/" },
  { text: "手册", icon: "discover", link: "/handbook/"},
  // {
  //   text: "指南",
  //   icon: "creative",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "creative",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "more", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "config",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "more", link: "" }],
  //     },
  //   ],
  // },
]);
