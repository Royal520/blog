import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/portfolio",
  "/doc/",
  "/demo/",
  {
    text: "日常",
    icon: "lightbulb",
    prefix: "dayily/",
    children: [
      { text: "樱桃", icon:"cloud", link: "linux/" }
    ]
  },
  "/guide/",
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
