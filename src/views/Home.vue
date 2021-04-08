<template>
  <div>
    <div id="nav">
      <div class="container home-nav">
        <router-link class="link-line nav-font" to="/"
          >DBAS学位认证系统</router-link
        >
        <router-link class="link-line nav-font bdas-right" :to="navBntUrl">
          <div class="nav-bnt">
            <a-icon :type=iconType />&nbsp;{{ navBntMsg }}
          </div>
        </router-link>
      </div>
    </div>
    <div class="hero-wrapper">
      <!-- <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" /> -->
      <div class="hero">
        <div class="container">
          <div class="home-left">
            <h1>基于区块链的学位学历认证系统</h1>
            <div class="home-left-m-text">
              通过vnt区块链加密保存您的信息，提供安全可信的学历证书管理认证服务
            </div>
            <div class="home-left-bnt-box">
              <router-link
                class="link-line home-left-bnt bnt home-left-bnt-primary"
                to="/authentication"
                >立即验证&nbsp;<a-icon type="arrow-right" /></router-link
              ><br />
              <router-link class="link-line home-left-bnt bnt" to="/login"
                >登录<a-icon type="right"
              /></router-link>
              <router-link
                class="link-line bnt home-left-bnt home-left-bnt-r"
                to="/register"
                >注册<a-icon type="right"
              /></router-link>
            </div>
          </div>
          <div class="home-right">
            <img class="home-right-img" src="@/assets/ill.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="callout container">
      <a-row type="flex" justify="start">
        <a-col :span="12">
          <div class="callout-text-s">为什么选择BDAS学位认证系统</div>
          <div class="callout-text-l">迄今为止</div>
        </a-col>
        <a-col :span="4">
          <div class="callout-text-h2">{{ universityNum }}</div>
          <div class="callout-text-primary">入驻学校</div>
        </a-col>
        <a-col :span="4">
          <div class="callout-text-h2">{{ userNum }}</div>
          <div class="callout-text-primary">满意用户</div>
        </a-col>
        <a-col :span="4">
          <div class="callout-text-h2">{{ certificateNum }}</div>
          <div class="callout-text-primary">上链证书</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
 import { getMe } from "@/api/login";

export default {
  name: "Home",
  data() {
    return {
      iconType:"login",
      navBntMsg: "登录",
      navBntUrl: "/login",
      universityNum: 100,
      userNum: 10000000,
      certificateNum: 20000000,
    };
  },
  methods: {
    load() {
      getMe().then((res) => {
        switch (res.data) {
          case "user":
            this.navBntMsg = "用户中心";
            this.navBntUrl = "/user";
            this.iconType="cluster";
            break;
          case "university":
            this.navBntMsg = "用户中心";
            this.navBntUrl = "/university";
            this.iconType="cluster";
            break;
          default:
            this.navBntMsg = "登录";
            this.navBntUrl = "/login";
            this.iconType="login";
        }
      });
    },
  },
  mounted() {
    this.load();
  },
  // components: {
  //   HelloWorld,
  // },
};
</script>

<style lang="less">
#nav {
  left: 0;
  right: 0;
  background-color: transparent;
  padding-top: 20px;
  padding-bottom: 20px;
  height: auto;
  position: absolute;
  z-index: 999;
  .home-nav {
    display: flex;
  }
}
.nav-font {
  font-weight: 700;
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}

.hero-wrapper {
  display: inline-block;
  width: 100%;
  height: 580px;
  .hero {
    width: 100%;
    position: relative;
    color: #fff;
    .container {
      display: flex;
      align-items: center;
      min-height: 650px;
      max-width: 1140px;
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
  }
}

.hero:after {
  width: 100%;
  border-radius: 0;
  transform: skewY(-5deg);
  content: " ";
  background-image: linear-gradient(to bottom, #697ded, #5e30c1);
  position: absolute;
  top: -180px;
  right: 0;
  bottom: -50px;
  z-index: -1;
}

.nav-bnt {
  background-color: #fff;
  border-color: #fff;
  color: #000;
  line-height: 25px;
  padding: 7px 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border-radius: 30px;
  &:hover {
    background-color: rgb(224, 225, 249);
  }
}
.home-left {
  padding: 160px 80px 100px 0;
  color: #fff;
  flex-grow: 0;
  width: calc(100% / 2);
  text-align: left !important;
  h1 {
    color: #fff;
    font-weight: 700;
    line-height: 54px;
    font-size: 2.5rem;
  }
}
.home-left-m-text {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  line-height: 32px;
  margin-top: 15px;
  font-size: 18px;
}
.home-left-bnt-box {
  margin-top: 40px;
  .bnt {
    font-weight: 600;
  }
  .home-left-bnt-primary {
    margin-bottom: 10px;
    width: 233px;
  }
  .home-left-bnt {
    font-size: 16px;
    border-radius: 30px;
    padding: 12px 30px;
    box-shadow: 0 0 30px rgb(252 189 37 / 40%);

    background-color: #6777ef;
    border-color: #6777ef;
    &:hover {
      color: #fff;
      background-color: #465aec;
    }
  }
  .home-left-bnt-r {
    background-color: #ffa426;
    border-color: #ffa426;
    margin-left: 10px;
    &:hover {
      background-color: #fa9200;
    }
  }
}
.home-right {
  padding-left: 40px;
  color: #fff;
  flex-grow: 0;
  width: calc(100% / 2);
  .home-right-img {
    width: 100%;
  }
}

.callout {
  background-color: #fff;
  box-shadow: 0 0 25px rgba(103, 119, 239, 0.1);
  margin-top: 50px;
  border-radius: 3px;
  padding: 60px 50px;
  display: block;
  text-align: left;
  .callout-text-s {
    font-weight: 500;
    font-size: 14px !important;
    letter-spacing: 2px;
    color: #98a6ad !important;
  }
  .callout-text-l {
    font-size: 2rem;
    font-weight: 700 !important;
    &::before {
      content: " ";
      border-radius: 5px;
      height: 8px;
      width: 50px;
      background-color: #6777ef;
      display: inline-block;
      margin-top: 20px;
      margin-right: 15px;
    }
  }
  .callout-text-h2 {
    font-weight: 700 !important;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-family: inherit;
    text-align: center !important;
  }
  .callout-text-primary {
    letter-spacing: 2px;
    color: #6777ef !important;
    text-align: center !important;
    font-weight: 700 !important;
  }
}
</style>
