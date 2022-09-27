import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    token: "",
    lastVisitRoute: "",
  }),
  persist: true,
});
