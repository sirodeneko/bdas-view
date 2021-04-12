<template>
  <div class="user-center">
    <div class="center-header">
      <div @click="goBack" class="center-back">
        <a-icon type="arrow-left" />
      </div>
    </div>
    <a-row>
      <a-col :span="24" class="auth-view-card">
        <a-card class="shadow-light">
          <a-row type="flex" class="auth-view-card-row">
            <a-col flex="65px" class="auth-view-card-l">创建时间</a-col>
            <a-col>：{{ timeToString(auth.created_at) }}</a-col>
          </a-row>
          <a-row type="flex" class="auth-view-card-row">
            <a-col :span="24" :md="12">
              <a-row type="flex" class="auth-view-card-row">
                <a-col flex="65px" class="auth-view-card-l">用户id</a-col>
                <a-col>：{{ auth.student_ac_msg.user_id }}</a-col>
              </a-row>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row type="flex" class="auth-view-card-row">
                <a-col flex="65px" class="auth-view-card-l">姓名</a-col>
                <a-col>：{{ auth.student_ac_msg.name }}</a-col>
              </a-row>
            </a-col>
          </a-row>

          <a-row type="flex" class="auth-view-card-row">
            <a-col :span="24" :md="12">
              <a-row type="flex" class="auth-view-card-row" align="middle">
                <a-col flex="65px" class="auth-view-card-l">正面照</a-col>
                <a-col
                  >：
                  <img
                    style="width: 200px"
                    :src="
                      '/api/v1/file/download/' +
                      auth.student_ac_msg.front_face_img
                    "
                    preview="0"
                  />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24" :md="12">
              <a-row type="flex" class="auth-view-card-row" align="middle">
                <a-col flex="65px" class="auth-view-card-l">反面照</a-col>
                <a-col
                  >：
                  <img
                    style="width: 200px"
                    :src="
                      '/api/v1/file/download/' +
                      auth.student_ac_msg.back_face_img
                    "
                    preview="0"
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>

          <a-row style="margin-top: 20px">
            <a-col>
              <a-form-model
                :model="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 14 }"
                class="admin-modify-form"
              >
                <a-form-model-item label="是否通过">
                  <a-select
                    default-value="1"
                    style="width: 120px"
                    v-model="form.op"
                  >
                    <a-select-option value="1"> 不通过 </a-select-option>
                    <a-select-option value="0"> 通过 </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-form-model-item label="原因">
                  <a-textarea allow-clear v-model="form.msg" />
                  <a-button type="dashed" @click="setText">
                    身份证不清晰
                  </a-button>
                  <a-button type="dashed" @click="setText">
                    信息填写错误
                  </a-button>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
                  <a-button type="primary" @click="submitForm">
                    发送消息
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { anthUser } from "@/api/login";
import { unixtimeToString } from "@/components/tools";

export default {
  name: "UserAuthView",
  data() {
    return {
      auth: this.$store.getters.getUserAuth,
      imgUrl1: "",
      imgUrl2: "",
      form: {
        op: "0",
        msg: "",
      },
    };
  },
  methods: {
    load() {},
    goBack() {
      this.$router.go(-1);
    },
    timeToString(time) {
      return unixtimeToString(time);
    },
    setText(e) {
      this.form.msg = e.srcElement.innerText;
    },
    submitForm() {
      let form = {
        msg_id: this.auth.id,
        msg: this.form.msg,
        op: Number(this.form.op),
      };

      if (form.op != 0 && form.msg == "") {
        this.$message.error("请输入审核不通过原因");
        return;
      }
      anthUser(form)
        .then((res) => {
          if (res.code != 0) {
            this.$message.error("审核失败！！！" + res.msg);
            console.log("审核失败！！！", res);
          } else {
            this.$message.success("审核成功！！！");
            this.$router.push({
              path: `/boos/authUser`,
            });
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          console.log("网络错误！！！", error);
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
    .center-back {
      height: 30px;
      width: 30px;
      font-size: 20px;
      text-align: center;
      line-height: 30px;
      transition: all 0.5s;
      &:hover {
        background-color: #6777ef;
        border-radius: 3px;
        color: white;
      }
    }
  }
}
.auth-view-card {
  .auth-view-card-row {
    min-height: 40px;
  }
  .auth-view-card-l {
    font-size: 15px;
    text-align: right;
    font-weight: 600;
  }
  .auth-view-card-r {
    font-size: 15px;
  }
  img {
    border-radius: 4px;
  }
}
</style>
