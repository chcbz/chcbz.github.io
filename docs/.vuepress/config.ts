import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  plugins: [
    docsearchPlugin({
      appId: 'JE82SHHB3C',
      apiKey: '4b0d8533b0aaabb31bb5eecbbb4c315c',
      indexName: 'chcbz',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
        '/en/': {
          placeholder: 'Search Documentation',
          translations: {
            button: {
              buttonText: 'Search Documentation',
            },
          },
        },
      },
    }),
  ],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "布衣云水客",
      description: "一个善良无私、待人真挚的字典小民。",
    },
    "/en/": {
      lang: "en-US",
      title: "Commoner Yunshuike",
      description: "A kind, selfless and sincere dictionary citizen.",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
