<template>
  <div class="user-center">
    <div class="center-header"><h1>用户中心(管理员)</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="个人信息" class="bdas-card" :headStyle="headStyles">
          <div class="user-card-item">
            <span class="user-card-item-1">账号：</span>
            <span class="user-card-item-2">{{ userInfo.user_name }}&nbsp;(id:{{userInfo.id}})</span>
          </div>
          <div class="user-card-item">
            <span class="user-card-item-1">昵称：</span>
            <span class="user-card-item-2">{{ userInfo.nickname }}</span>
          </div>
          <div class="user-card-item">
            <span class="user-card-item-1">用户类型：</span>
            <span class="user-card-item-2">管理员</span>
          </div>
          
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import { userIdentityAuth, getUserMe } from "@/api/login";

export default {
  name: "AdminInfo",
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
      userInfo: this.$store.getters.getAdminData,
    };
  },
  methods: {
    load() {
      // 初始化函数
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
    .user-card-item {
      margin-bottom: 20px;
      .user-card-item-1 {
        font-weight: 700;
      }
      .user-card-item-3 {
        color: red;
        cursor: pointer;
      }
    }
  }
}
.user-info-auth-dialog {
  .ant-modal-header {
    border-bottom: 0px;
    .ant-modal-title {
      font-size: 16px;
      line-height: 28px;
      color: #6777ef;
      text-align: left;
      font-weight: 700;
    }
  }
  .ant-modal-footer {
    border-top: 0px;
  }
  .user-info-auth-dialog-form {
    .ant-form-item-label {
      font-weight: 700;
    }
  }
}
</style>
