<template>
  <div class="user-center">
    <div class="center-header"><h1>证书下载</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card class="certificate-card">
          <div style="display: flex; justify-self: start; margin-bottom: 15px">
            <div style="font-weight: 700">证书地址:</div>
            <div
              style="
                margin-right: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ item.address }}
            </div>
            <div
              style="cursor: pointer; margin-right: 15px"
              @click="copyText(item.address)"
            >
              复制地址
            </div>
            <a :href="'/api/v1/user/certification/file/' + data">
              <div
                style="cursor: pointer; color: #6793ef"
                @click="copyText(item.address)"
              >
                下载证书
              </div></a
            >
          </div>
          <img
            style="width: 100%"
            :src="'/api/v1/user/certification/file/' + data"
            preview="0"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { userCertificationFile } from "@/api/login";

export default {
  name: "UserCertificateView",
  data() {
    return {
      isempty: true,
      data: "",
      item: this.$store.getters.getCertificate,
      id: this.$route.params.id,
    };
  },
  methods: {
    load() {
      //console.log("参数",this.id);
      //初始化函数
      let form = {
        id: this.id,
      };
      userCertificationFile(form)
        .then((res) => {
          // console.log("返回值：", res);
          if (res.code != 0) {
            this.$message.error("获取证书失败");
            console.log("获取证书失败", res);
          } else {
            this.data = res.data;
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          console.log("网络错误！！！", error);
        });
    },
    copyText(str) {
      var aux = document.createElement("input");
      aux.setAttribute("value", str);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$message.success("复制成功");
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
  .certificate-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
    border-radius: 3px;
  }
}
</style>
