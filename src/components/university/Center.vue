<template>
  <div class="user-center">
    <div class="center-header"><h1>首页</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="公告" class="bdas-card" :headStyle="headStyles">
          <div class="">
            <strong>
              你好，欢迎使用DBAS学位学历认证系统。
              <br />
              本系统是基于区块链进行用户学历信息的存储，
              保证用户的学历信息的真实性，不可篡改性。
              <br />
              同时，对链上数据进行加密处理，以保证用户信息的安全性。
              <br />
              本系统为演示系统，仅对主要功能进行实现。
              <br />
              <br />
              管理员登陆地址：<a href="/login/boos">点击这里</a>
              <br />
              管理员账号:zlh123456
              <br />
              高校账号:un123456 宇宙第一大学
              <br />
              普通用户账号:yf123456
              <br />
              密码统一 12345678
              <br />
              <br />
            </strong>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "UniversityCenter",
  data() {
    return {
      headStyles: {
        // "border-top": "2px solid #6777ef",
        "font-size": "16px",
        "line-height": "28px",
        color: "#6777ef",
        "padding-right": "10px",
        "margin-bottom": "0",
        "text-align": "left",
        "font-weight": 700,
      },
    };
  },
  methods: {},
  created() {},
  // components: {
  //   HelloWorld,
  // },
};
</script>

<style lang="less">
.user-center {
  .center-header {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
    background-color: #fff;
    border-radius: 3px;
    border: none;
    position: relative;
    margin-bottom: 30px;
    padding: 20px;
    display: flex;
    align-items: center;
    h1 {
      margin-bottom: 0;
      font-weight: 700;
      display: inline-block;
      font-size: 24px;
      margin-top: 3px;
      color: #34395e;
    }
  }
  .bdas-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  }
}
</style>
