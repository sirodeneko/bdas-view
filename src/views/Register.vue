<template>
  <div style="background-color: rgb(244, 246, 249)">
    <div class="container login">
      <a-row type="flex" justify="center">
        <a-col :xs="24" :sm="20" :md="12" :lg="8">
          <div class="login-brand">
            <img
              class="shadow-light"
              src="@/assets/stisla-fill.svg"
              width="100"
            />
          </div>
          <a-card title="注册" class="login-card" :headStyle="headStyles">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item label="昵称">
                <a-input
                  v-decorator="[
                    'nickname',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input yuor nickname!',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="账号">
                <a-input
                  v-decorator="[
                    'user_name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input yuor user_name!',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="密码">
                <a-input
                  v-decorator="[
                    'password',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input yuor password!',
                        },
                      ],
                    },
                  ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item label="确认密码">
                <a-input
                  v-decorator="[
                    'password_confirm',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input yuor password!',
                        },
                      ],
                    },
                  ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  class="login-form-bnt"
                >
                  注册
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
          <div class="login-bottom">
            已经有了账号？<a href="/login">马上登录 👉</a>
          </div>
          <div class="login-bottom">Copyright © 2021 BDAS</div>
          <br />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

import { postRegister } from "@/api/login";

export default {
  name: "Register",
  data() {
    return {
      headStyles: {
        "border-top": "2px solid #6777ef",
        "font-size": "16px",
        "line-height": "28px",
        color: "#6777ef",
        "padding-right": "10px",
        "margin-bottom": "0",
        "text-align": "left",
        "font-weight": 700,
      },
      isShowUniversity: false,
      form: this.$form.createForm(this, { name: "coordinated" }),
      aaa: "user",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          postRegister(values)
            .then((res) => {
              // console.log("返回值：", res);
              if (res.code != 0) {
                this.$message.error("注册失败！！！" + res.msg);
                console.log("注册失败", res);
              } else {
                this.$message.success("注册成功，请登陆");
                this.$router.push({
                  path: `/login`,
                });
              }
            })
            .catch((error) => {
              this.$message.error("注册失败！！！");
              console.error("注册失败", error);
            });
        } else {
          console.log("出错了，值是: ", values);
          console.log("出错了，错误是: ", err);
        }
      });
    },
    handleSelectChange(value) {
      //console.log(value);
      if (value == "university") {
        this.isShowUniversity = true;
      } else {
        this.isShowUniversity = false;
      }
    },
  },
  // components: {
  //   HelloWorld,
  // },
};
</script>
<style lang="less">
.login {
  padding-top: 48px;
}
.login-brand {
  margin: 20px 0;
  margin-bottom: 40px;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #666;
  text-align: center;
  img {
    border-radius: 50% !important;
  }
}
.login-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  background-color: #fff;
  border-radius: 3px;
  font-weight: 700;
}
.login-form-bnt {
  width: 100%;
}
.login-bottom {
  margin-top: 50px;
  text-align: center;
  color: #98a6ad;
}
</style>
