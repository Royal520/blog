import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "portfolio",
    {
      text:"文档",
      icon:"book",
      prefix:"doc/",
      children:"structure"
    },
    {
      text:"日常",
      icon:"book",
      prefix:"dayily/",
      children:"structure"
    },
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
  ],
});
