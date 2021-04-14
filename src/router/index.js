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
import UserCertificate from "../components/user/Certificate.vue";
import UserCertificateView from "../components/user/CertificateView.vue";
import University from "../views/University.vue";
import UniversityCenter from "../components/university/Center.vue";
import UniversityInfo from "../components/university/Info.vue";
import Admin from "../views/Admin.vue";
import AdminLogin from "../components/admin/Login.vue";
import AdminCenter from "../components/admin/Center.vue";
import AdminInfo from "../components/admin/Info.vue";
import AdminAddUser from "../components/admin/AddUser.vue";
import AdminModifyUser from "../components/admin/ModifyUser.vue";
import AdminInbox from "../components/admin/Inbox.vue";
import InboxView from "../components/admin/InboxView.vue";
import InboxSend from "../components/admin/InboxSend.vue";
import AuthUser from "../components/admin/AuthUser.vue";
import UserAuthView from "../components/admin/AuthUserView.vue";
import UserInbox from "../components/user/Inbox.vue";
import UserInboxView from "../components/user/InboxView.vue";
import UniversityInbox from "../components/university/Inbox.vue";
import UniversityInboxView from "../components/university/InboxView.vue";
import UniversityCertificate from "../components/university/Certificate.vue";
import UniversityCertificateList from "../components/university/CertificateList.vue";
import UniversityCertificateView from "../components/university/CertificateView.vue";
import AdminAuthCertificate from "../components/admin/AuthCertificate.vue";
import AdminAuthCertificateView from "../components/admin/AuthCertificateView.vue";
import Authentication from "../components/Authentication.vue";
import AuthFile from "../components/AuthFile.vue";
import AuthMsg from "../components/AuthMsg.vue";

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
    //name: "User",
    component: User,
    children: [
      {
        path: "",
        component: UserCenter,
      },
      {
        path: "info",
        component: UserInfo,
      },
      {
        path: "inbox",
        component: UserInbox,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "inboxView",
        name: "UserInboxView",
        component: UserInboxView,
      },
      {
        path: "certificate",
        component: UserCertificate,
      },
      {
        path: "certificateView/:id",
        component: UserCertificateView,
      },
    ],
  },
  {
    path: "/university",
    //name: "University",
    component: University,
    children: [
      {
        path: "",
        component: UniversityCenter,
      },
      {
        path: "info",
        component: UniversityInfo,
      },
      {
        path: "inbox",
        component: UniversityInbox,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "inboxView",
        name: "UniversityInboxView",
        component: UniversityInboxView,
      },
      {
        path: "certificate",
        component: UniversityCertificate,
      },
      {
        path: "certificate/list",
        component: UniversityCertificateList,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "certificateView",
        component: UniversityCertificateView,
      },
    ],
  },
  {
    path: "/boos",
    //name: "Admin",
    component: Admin,
    children: [
      {
        path: "",
        component: AdminCenter,
      },
      {
        path: "info",
        component: AdminInfo,
      },
      {
        path: "add",
        component: AdminAddUser,
      },
      {
        path: "modify",
        component: AdminModifyUser,
      },
      {
        path: "inbox",
        component: AdminInbox,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "inboxView",
        name: "AdminInboxView",
        component: InboxView,
      },
      {
        path: "inboxSend",
        component: InboxSend,
      },
      {
        path: "authUser",
        component: AuthUser,
      },
      {
        path: "authUserView",
        component: UserAuthView,
      },
      {
        path: "authCertificate",
        component: AdminAuthCertificate,
      },
      {
        path: "authCertificateView",
        component: AdminAuthCertificateView,
      },
    ],
  },
  {
    path: "/login/boos",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/authentication",
    component: Authentication,
  },
  {
    path: "/authFile",
    component: AuthFile,
  },
  {
    path: "/authMsg",
    component: AuthMsg,
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
