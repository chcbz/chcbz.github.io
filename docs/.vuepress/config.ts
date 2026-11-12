import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { fileURLToPath } from 'node:url';
import { getHomePosts } from './home-posts.mjs';

export default defineUserConfig({
  base: "/",
  plugins: [
    {
      name: 'blog-home-posts',
      define: () => ({
        __HOME_POSTS__: getHomePosts(fileURLToPath(new URL('../article/', import.meta.url))),
      }),
    },
    googleAnalyticsPlugin({
      id: 'G-CRER5PD2NB',
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
