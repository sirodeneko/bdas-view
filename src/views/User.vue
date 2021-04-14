<template>
  <a-layout id="user">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
      theme="light"
      :style="{ height: '100vh', position: 'fixed', left: 0, zIndex: 10 }"
    >
      <div class="logo"><a href="/">DBAS学位认证系统</a></div>
      <a-menu theme="light" mode="inline" :default-selected-keys="['0']">
        <a-menu-item-group key="g0">
          <template slot="title">
            <span>首页</span>
          </template>

          <a-menu-item key="0">
            <a-icon type="bank" />
            <router-link to="/user" class="a-inline">
              用户首页
            </router-link></a-menu-item
          >
        </a-menu-item-group>
        <a-menu-item-group key="g1">
          <template slot="title">
            <span>我的</span>
          </template>
          <a-menu-item key="1">
            <a-icon type="user" />
            <router-link to="/user/info" class="a-inline">
              用户中心
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="audit" />
            <router-link to="/user/certificate" class="a-inline">
              我的证书
            </router-link>
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group key="g2">
          <template slot="title">
            <span>消息</span>
          </template>

          <a-menu-item key="3" @click="upInboxNotCnt">
            <a-icon type="mail" />
            <router-link to="/user/inbox" class="a-inline">
              <a-badge :count="inboxNotCnt" class="bdas-badge">
                消息通知
              </a-badge>
            </router-link>
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group key="g3">
          <template slot="title">
            <span>其他</span>
          </template>
          <a-menu-item key="4" class="logout" @click="exit">
            <a-icon type="logout" /> 退出登陆
          </a-menu-item>
        </a-menu-item-group>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="rightLayout">
      <div class="navbar-bg"></div>
      <div class="main-page">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
      <a-layout-footer style="text-align: center">
        Copyright © 2021 BDAS
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { userExit, getUserMe, inboxUnread } from "@/api/login";

export default {
  name: "User",
  data() {
    return {
      rightLayout: {
        marginLeft: "200px",
        transition: "margin-right 0.3s",
        height: "100vh",
      },
      inboxNotCnt: 0,
    };
  },
  methods: {
    load() {
      getUserMe()
        .then((res) => {
          // console.log("返回值：", res);
          if (res.code != 0) {
            this.$message.error("未登录禁止访问！！！");
            console.log("未登录禁止访问", res);
            this.$router.push({
              path: `/`,
            });
          } else {
            this.$store.commit("setUserDate", res.data);
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          this.$router.push({
            path: `/`,
          });
          console.log("获取用户信息失败", error);
        });

      this.upInboxNotCnt();
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
    upInboxNotCnt() {
      inboxUnread().then((res) => {
        if (res.code == 0) {
          this.inboxNotCnt = res.data;
        }
      });
    },
    exit() {
      userExit();
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
  .a-inline {
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
