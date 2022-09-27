import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { useUserStore } from "@/store/userStore";

const Home = () => import("@/views/home/home.vue");
const About = () => import("@/views/about/about.vue");
const Login = () => import("@/views/login/login.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", meta: { requireAuth: true }, component: Home },
  {
    path: "/about",
    name: "about",
    meta: { requireAuth: false },
    component: About,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 获取用户数据
  const userStore = useUserStore();
  // 是否需要登录
  if (to.meta.requireAuth) {
    if (userStore.token) {
      next();
    } else {
      // 保存访问页面，登录后跳转
      userStore.lastVisitRoute = to.path;
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
