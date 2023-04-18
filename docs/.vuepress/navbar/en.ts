import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  { text: "Article", icon: "discover", link: "/en/article/" },
  { text: "Video", icon: "discover", link: "/en/video/" },
  { text: "Handbook", icon: "discover", link: "/en/handbook/"},
  // {
  //   text: "Guide",
  //   icon: "creative",
  //   prefix: "/en/guide/",
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
