<template>
  <a-layout id="user">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      theme="light"
      :style="{ height: '100vh', position: 'fixed', left: 0 ,zIndex:10}"
    >
      <div class="logo"><a href="/">DBAS学位认证系统</a></div>
      <a-menu theme="light" mode="inline" :default-selected-keys="['1']">
        <a-menu-item-group key="g1">
          <template slot="title">
            <span>我的</span>
          </template>
          <a-menu-item key="1"> <a-icon type="user" /> 用户中心 </a-menu-item>
          <a-menu-item key="2"> <a-icon type="audit" /> 我的证书 </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group key="g2">
          <template slot="title">
            <span>消息</span>
          </template>
          <a-menu-item key="3"> <a-icon type="mail" /> 消息通知 </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group key="g3">
          <template slot="title">
            <span>其他</span>
          </template>
          <a-menu-item key="4" class="logout"> <a-icon type="logout" /> 退出登陆 </a-menu-item>
        </a-menu-item-group>
        
      </a-menu>
    </a-layout-sider>
    <a-layout :style="rightLayout">
      <div class="navbar-bg"></div>
      <div class="main-page"><router-view></router-view></div>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import { getMe } from "@/api/login";

export default {
  name: "User",
  data() {
    return {
      navBntMsg: "登录",
      navBntUrl: "/login",
      universityNum: 100,
      userNum: 10000000,
      certificateNum: 20000000,
      rightLayout: { marginLeft: "200px", transition: "margin-right 0.3s", height: '100vh' },
    };
  },
  methods: {
    //load() {},
    onCollapse(collapsed, type) {
      console.log("onCollapse:", collapsed, type);
    },
    onBreakpoint(broken) {
      if (broken == true) {
        this.rightLayout.marginLeft = "0";
      } else {
        this.rightLayout.marginLeft = "200px";
      }
      console.log("onBreakpoint", broken);
    },
  },
  created() {
    //this.load();
  },
  // components: {
  //   HelloWorld,
  // },
};
</script>

<style lang="less">
#user {
  font-size: 14px;
  font-weight: 400;
  color: #6c757d;
  .logo {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    a {
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      color: #000;
    }
  }
  .ant-menu-item-selected {
    color: #6777ef;
    font-weight: 600;
    //transition: font-size 0.3s;
  }
  .logout{
      color: #fc544b !important;
  }
}

/* 滚动槽 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
}

.navbar-bg {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 115px;
  background-color: #6777ef;
  //z-index: -1;
}

.main-page {
  min-height: 518px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 80px;
  //background-color: aqua;
  z-index: 1;
}
</style>
