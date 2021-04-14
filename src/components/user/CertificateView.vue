<template>
  <div class="user-center">
    <div class="center-header"><h1>证书下载</h1></div>
    <a-row>
      <a-col :span="24">
        <a-row type="flex" :gutter="16">
          <a-empty v-if="isempty" :span="24" style="width: 100%" />
          <a-col
            v-else
            v-for="item in data"
            :key="item.id"
            style="width: 200px"
          >
            <a-card class="certificate-card">
              <div>
                <p><span>学历：</span> {{ item.level }}</p>
              </div>
              <div>
                <p><span>专业：</span>{{ item.professional }}</p>
              </div>
              <div>
                <p><span>编号：</span>{{ item.id }}</p>
              </div>
              <div style="display: flex; justify-self: start">
                <span>地址：</span>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>点击复制</span>
                  </template>
                  <div
                    class="certificate-card-line"
                    @click="copyText(item.address)"
                  >
                    {{ item.address }}
                  </div>
                </a-tooltip>
              </div>
              <template slot="actions" class="ant-card-actions" >
                <div class="certificate-card-footer">查看&nbsp;<a-icon type="arrow-right" /></div>
              </template>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import { userCertification } from "@/api/login";

export default {
  name: "UserCertificateView",
  data() {
    return {
      isempty: true,
      data: {},
      id:this.$route.params.id,
    };
  },
  methods: {
    load() {
      console.log("参数",this.id);
      // 初始化函数
      // userCertification().then((res) => {
      //     // console.log("返回值：", res);
      //     if (res.code != 0) {
      //       this.$message.error("获取证书失败");
      //       console.log("获取证书失败", res);
      //     } else {
      //       if(res.data.total!=0){
      //         this.isempty=false;
      //         this.data=res.data.items;
      //       }
      //     }
      //   })
      //   .catch((error) => {
      //     this.$message.error("网络错误！！！");
      //     console.log("网络错误！！！", error);
      //   });
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
    white-space: nowrap;
    span {
      font-weight: 700;
    }
    .certificate-card-line {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    ul{
      background-color: #6777EF;
      border-radius:0 0 3px 3px;
      transition: 0.3s all;
      &:hover{
        background-color: #4156fa;
      }
    }
    .certificate-card-footer{
      color: white;
    }
  }
}
</style>
