<template>
  <div class="user-center">
    <div class="center-header"><h1>用户中心</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="个人信息" class="bdas-card" :headStyle="headStyles">
          <div class="user-card-item">
            <span class="user-card-item-1">账号：</span>
            <span class="user-card-item-2">{{ userInfo.user_name }}</span>
          </div>
          <div class="user-card-item">
            <span class="user-card-item-1">昵称：</span>
            <span class="user-card-item-2">{{ userInfo.nickname }}</span>
          </div>
          <div class="user-card-item">
            <span class="user-card-item-1">实名认证：</span>
            <span class="user-card-item-2">{{ isActive() }}</span>
            <span
              class="user-card-item-3"
              v-show="isShowAuth"
              @click="openAuth"
            >
              立即实名认证
            </span>
            <a-modal
              title="实名认证"
              :visible="authVisible"
              :confirm-loading="authConfirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              okText="确认"
              cancelText="取消"
              :centered="true"
              class="user-info-auth-dialog"
            >
              <a-form-model :model="form" class="user-info-auth-dialog-form">
                <a-form-model-item label="姓名">
                  <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="身份证号">
                  <a-input
                    v-model="form.card_code"
                    placeholder="请输入你的身份证号"
                  />
                </a-form-model-item>
                <a-form-model-item label="身份证正面照">
                  <a-upload
                    name="f1"
                    action="/api/v1/file/upload"
                    list-type="picture"
                    accept="image/*"
                    :file-list="fileList1"
                    :withCredentials="true"
                    @change="(value) => uploadHandleChange(value, 0)"
                    :before-upload="beforeUpload"
                  >
                    <a-button> <a-icon type="upload" /> 上传 </a-button>
                  </a-upload>
                </a-form-model-item>
                <a-form-model-item label="身份证反面照">
                  <a-upload
                    name="f1"
                    action="/api/v1/file/upload"
                    list-type="picture"
                    accept="image/*"
                    :file-list="fileList2"
                    :withCredentials="true"
                    @change="(value) => uploadHandleChange(value, 1)"
                    :before-upload="beforeUpload"
                  >
                    <a-button> <a-icon type="upload" /> 上传 </a-button>
                  </a-upload>
                </a-form-model-item>
              </a-form-model>
            </a-modal>
          </div>
          <div class="user-card-item">
            <span class="user-card-item-1">姓名：</span>
            <span class="user-card-item-2">{{
              userInfo.name ? "未实名认证" : userInfo.name
            }}</span>
          </div>
          <div class="user-card-item">
            <span class="user-card-item-1">身份证号：</span>
            <span class="user-card-item-2">{{
              userInfo.card_code ? "未实名认证" : userInfo.card_code
            }}</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { userIdentityAuth, getUserMe } from "@/api/login";

export default {
  name: "UserInfo",
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
      userInfo: this.$store.getters.getUserDate,
      isShowAuth: false,
      authVisible: false,
      authConfirmLoading: false,
      form: {
        name: "",
        card_code: "",
        front_face_img: "",
        back_face_img: "",
      },
      fileList1: [],
      fileList2: [],
    };
  },
  methods: {
    load() {
      this.userInfo = this.$store.getters.getUserDate;
    },
    isActive() {
      if (this.userInfo.status == "inactive") {
        this.isShowAuth = true;
      } else {
        this.isShowAuth = false;
      }
      switch (this.userInfo.status) {
        case "active":
          return "实名认证通过";
        case "authenticating":
          return "实名认证审核中";
        case "inactive":
          return "未实名认证";
        case "suspend":
          return "封禁中";
        default:
          return "未知状态";
      }
    },
    openAuth() {
      this.authVisible = true;
    },
    handleOk() {
      this.confirmLoading = true;
      if (
        this.form.back_face_img == "" ||
        this.form.front_face_img == "" ||
        !this.validatorIDCard(this.form.card_code) ||
        this.form.name == ""
      ) {
          //console.log(this.form);
        this.$message.error("输入为空或者身份证号输入错误");
        this.confirmLoading = false;
        return;
      }

      userIdentityAuth(this.form)
        .then((res) => {
          // console.log("返回值：", res);
          if (res.code != 0) {
            this.$message.error("请求失败！！！" + res.msg);
            console.log("请求失败！！！", res);
          } else {
            this.$message.success("发送成功！！！等待审核");
            this.authVisible = false;
            this.uploadUserInfo();
          }
          this.confirmLoading = false;
        })
        .catch((error) => {
          this.$message.error("网络错误");
          console.log("网络错误", error);
        });
    },
    handleCancel() {
      this.authVisible = false;
    },
    uploadHandleChange(info, op) {
      console.log(info, op);
      let fileList = [...info.fileList];

      // 限制上传的数量
      fileList = fileList.slice(-1);

      fileList = fileList.map((file) => {
        if (file.response) {
          // 获取返回的值
          //console.log("这是什么:", file.response);
          file.url = "/api/v1/file/download/" + file.response.data.fileName;
          if (op == 0) {
            this.form.front_face_img = file.response.data.fileName;
          } else if (op == 1) {
            this.form.back_face_img = file.response.data.fileName;
          }
        }
        return file;
      });
      if (op == 0) {
        this.fileList1 = fileList;
      } else if (op == 1) {
        this.fileList2 = fileList;
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("只能上传jpg或者png图片");
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("图片必须小于10M");
      }
      return isJpgOrPng && isLt10M;
    },
    uploadUserInfo() {
      getUserMe()
        .then((res) => {
          // console.log("返回值：", res);
          if (res.code != 0) {
            this.$message.error("获取用户信息失败");
            console.log("获取用户信息失败", res);
          } else {
            this.$store.commit("setUserDate", res.data);
            this.userInfo = res.data;
          }
        })
        .catch(() => {
          this.$message.error("网络错误！！！");
        });
    },
    validatorIDCard(idcode) {
      idcode = idcode.toString();
      let idreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      return idreg.test(idcode);
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
