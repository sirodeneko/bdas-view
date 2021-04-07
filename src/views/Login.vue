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
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 16 }"
              @submit="handleSubmit"
            >
              <a-form-item label="Note">
                <a-input
                  v-decorator="[
                    'note',
                    {
                      rules: [
                        { required: true, message: 'Please input your note!' },
                      ],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="Gender">
                <a-select
                  v-decorator="[
                    'gender',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select your gender!',
                        },
                      ],
                    },
                  ]"
                  placeholder="Select a option and change input text above"
                  @change="handleSelectChange"
                >
                  <a-select-option value="male"> male </a-select-option>
                  <a-select-option value="female"> female </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
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
    };
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
}
</style>
