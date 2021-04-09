import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Page404 from "../views/Page404.vue";
import User from "../views/User.vue";
import UserCenter from "../components/user/Center.vue";
import UserInfo from "../components/user/Info.vue";
import University from "../views/University.vue";
import UniversityCenter from "../components/university/Center.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/user",
    name: "User",
    component:User,
    children:[
      {
        path:"",
        component:UserCenter,
      },
      {
        path:"info",
        component:UserInfo,
      }
    ]
  },
  {
    path:"/university",
    name:"University",
    component:University,
    children:[
      {
        path:"",
        component:UniversityCenter,
      },
      {
        path:"info",
        component:UserInfo,
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
  {
    path: "/*",
    name: "error-404",
    meta: { title: "404-页面不存在" },
    component: Page404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
