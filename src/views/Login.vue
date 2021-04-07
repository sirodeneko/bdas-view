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
          <a-card title="登录" class="login-card" :headStyle="headStyles">
            <a-form
              :form="form"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              @submit="handleSubmit"
            >
              <a-form-item label="用户类型">
                <a-select
                  v-decorator="[
                    'u_type',
                    {
                      initialValue: 'user',
                      rules: [
                        {
                          required: true,
                          message: 'Please select your user_type!',
                        },
                      ],
                    },
                  ]"
                  placeholder="选择你的用户类型"
                  @change="handleSelectChange"
                >
                  <a-select-option value="user"> 普通用户 </a-select-option>
                  <a-select-option value="university">
                    学校用户
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="学校" v-show="isShowUniversity">
                <a-input
                  v-decorator="[
                    'university_name',
                    {
                      rules: [
                        {
                          required: isShowUniversity,
                          message: 'Please input yuor password!',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="用户名">
                <a-input
                  v-decorator="[
                    'user_name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input yuor name!',
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
                />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
                <a-button type="primary" html-type="submit"> Submit </a-button>
              </a-form-item>
            </a-form>
          </a-card>
          <br />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

import {postLogin} from '@/api/login';

export default {
  name: "Login",
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
      aaa:"user",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          postLogin(values).then((res)=>{
            console.log("返回值：",res);
          })
        } else {
          console.log("出错了，值是: ",values);
          console.log("出错了，错误是: ",err);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      //   this.form.setFieldsValue({
      //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      //   });
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
</style>
