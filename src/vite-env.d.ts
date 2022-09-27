/// <reference types="vite/client" />

// 告诉tsc这是一个“模块”，不对引入进行类型检测
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
