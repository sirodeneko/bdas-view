<template>
  <a-layout id="user">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      theme="light"
      :style="{height: '100vh', position: 'fixed', left: 0, zIndex: 10 }"
    >
    <div :style="{overflowY:'auto',height: '99vh', }" >
      <div class="logo"><a href="/">DBAS学位认证系统</a></div>
      <a-menu theme="light" mode="inline" :default-selected-keys="['00']">
        <a-menu-item-group key="g0">
          <template slot="title">
            <span>首页</span>
          </template>

          <a-menu-item key="00">
            <a-icon type="bank" />
            <router-link to="/boos"> 用户首页 </router-link></a-menu-item
          >
        </a-menu-item-group>

        <a-menu-item-group key="g1">
          <template slot="title">
            <span>我的</span>
          </template>
          <a-menu-item key="10">
            <a-icon type="user" />
            <router-link to="/boos/info"> 用户中心 </router-link>
          </a-menu-item>
        </a-menu-item-group>

        <a-menu-item-group key="g5">
          <template slot="title">
            <span>账号</span>
          </template>
          <a-menu-item key="50">
            <a-icon type="user-add" />
            <router-link to="/boos/add"> 用户注册 </router-link>
          </a-menu-item>
          <a-menu-item key="51"> <a-icon type="edit" /> 
           <router-link to="/boos/modify"> 修改用户 </router-link>
          </a-menu-item>
        </a-menu-item-group>

        <a-menu-item-group key="g2">
          <template slot="title">
            <span>消息</span>
          </template>
          <a-menu-item key="20"> <a-icon type="mail" /> 消息通知 </a-menu-item>
          <a-menu-item key="21"> <a-icon type="notification" /> 发送消息 </a-menu-item>
        </a-menu-item-group>

        <a-menu-item-group key="g4">
          <template slot="title">
            <span>审核</span>
          </template>
          <a-menu-item key="40"> <a-icon type="contacts" /> 用户审核 </a-menu-item>
          <a-menu-item key="41"> <a-icon type="file-done" />证书审核 </a-menu-item>
        </a-menu-item-group>

        <!-- <a-menu-item-group key="g5">
          <template slot="title">
            <span>证书</span>
          </template>
        </a-menu-item-group> -->

        <a-menu-item-group key="g3">
          <template slot="title">
            <span>其他</span>
          </template>
          <a-menu-item key="30" class="logout" @click="exit">
            <a-icon type="logout" /> 退出登陆
          </a-menu-item>
        </a-menu-item-group>
      </a-menu>
      </div>
    </a-layout-sider>
    <a-layout :style="rightLayout">
      <div class="navbar-bg"></div>
      <div class="main-page"><router-view></router-view></div>
      <a-layout-footer style="text-align: center">
        Copyright © 2021 BDAS
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { AdminExit, getAdminMe } from "@/api/login";

export default {
  name: "Admin",
  data() {
    return {
      rightLayout: {
        marginLeft: "200px",
        transition: "margin-right 0.3s",
        height: "100vh",
      },
    };
  },
  methods: {
    load() {
      getAdminMe()
        .then((res) => {
          // console.log("返回值：", res);
          if (res.code != 0) {
            this.$message.error("未登录禁止访问！！！");
            console.log("未登录禁止访问", res);
            this.$router.push({
              path: `/`,
            });
          } else {
            this.$store.commit("setAdminDate", res.data);
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          this.$router.push({
            path: `/`,
          });
          console.log("获取用户信息失败", error);
        });
    },
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
    exit() {
      AdminExit();
      this.$router.push({
        path: `/`,
      });
    },
  },
  created() {
    this.load();
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
  a {
    display: inline;
  }
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
  .logout {
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
