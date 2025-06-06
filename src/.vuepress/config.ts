import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "文档演示",
  description: "vuepress-theme-hope 的文档演示",

  theme,
  alias: {
    "@ulist": path.resolve(__dirname, "components/UList/index.vue"),
  },

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
