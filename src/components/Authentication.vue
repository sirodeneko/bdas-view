<template>
  <div class="user-center">
    <div class="container auth">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card class="auth-card" title="证书校验" :headStyle="headStyles">
            <img width="100%" src="@/assets/data_center.svg" alt="" />
            基于证书文件进行认证，
            通过对比区块链中保存的学历信息和证书文件的特征码，
            可验证证书的真伪。
            <template slot="actions" class="ant-card-actions">
              <div class="certificate-card-footer" @click="openAuthFile">
                立即前往&nbsp;<a-icon type="arrow-right" />
              </div>
            </template>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="auth-card" title="学历查询" :headStyle="headStyles">
            <img
              width="68%"
              src="@/assets/waiting_notifications.svg"
              alt=""
              style="display: block; margin: 0 auto"
            />
            基于证书地址信息进行查询， 通过提供必要的地址信息与用户信息，
            可在区块链中查询用户的基本学历信息。
            <template slot="actions" class="ant-card-actions">
              <div class="certificate-card-footer" @click="openAuthMsg">
                立即前往&nbsp;<a-icon type="arrow-right" />
              </div>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import { userIdentityAuth, getUserMe } from "@/api/login";

export default {
  name: "Authentication",
  data() {
    return {
      headStyles: {
        // "border-top": "2px solid #6777ef",
        "font-size": "16px",
        "line-height": "28px",
        color: "#6777ef",
        "margin-bottom": "0",
        "text-align": "center",
        "font-weight": 700,
      },
    };
  },
  methods: {
    load() {
      // 初始化函数
    },
    openAuthFile() {
        this.$router.push({
        path: `/authFile`,
      });
    },
    openAuthMsg() {
        this.$router.push({
        path: `/authMsg`,
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
.user-center {
  background-color: rgb(244, 246, 249);
  min-height:100vh;
  .auth {
    padding-top: 100px;
    max-width: 600px;
    .auth-card {
      border-top: 2px solid #6777ef;
      font-weight: 600;
      .ant-card-body {
        height: 330px;
      }
      ul {
        background-color: #6777ef;
        border-radius: 0 0 3px 3px;
        transition: 0.3s all;
        &:hover {
          background-color: #4156fa;
        }
      }
      .certificate-card-footer {
        color: white;
      }
    }
  }
}
</style>
