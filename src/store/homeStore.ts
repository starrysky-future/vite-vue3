import { defineStore } from "pinia";

export const useHomeStore = defineStore({
  id: "homeStore",
  state: () => ({
    num: 0,
  }),
  getters: {
    doubleNum: (state) => state.num * 2,
  },
  actions: {
    increment() {
      this.num++;
    },
  },
  // 持久存储两种方式
  // 直接设置 true
  // persist: true,
  // 自定义key和存储位置
  // persist: {
  //   key: "number", // 修改存储名称
  //   storage: window.sessionStorage, // 修改存储位置
  // },
});
