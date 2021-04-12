<template>
  <div class="user-center">
    <div class="center-header"><h1>添加用户</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="添加用户" class="bdas-card" :headStyle="headStyles">
          <a-row type="flex" justify="center">
            <a-col :xs="24" :sm="20" :md="12" :lg="8">
              <a-form :form="form" @submit="handleSubmit">
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
                            message: '请选择用户类型!',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
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
                    :allowClear="true"
                  />
                </a-form-item>
                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-bnt"
                  >
                    添加用户
                  </a-button>
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { universityRegister, postRegister } from "@/api/login";

export default {
  name: "AddUser",
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
      isShowUniversity: false,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    load() {
      // 初始化函数
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let postFunc;
          if (values.u_type == "user") {
            postFunc = postRegister;
          } else {
            postFunc = universityRegister;
          }
          values.password_confirm = values.password;

          postFunc(values)
            .then((res) => {
              // console.log("返回值：", res);
              if (res.code != 0) {
                this.$message.error("添加失败！！！" + res.msg);
                console.log("添加失败", res);
              } else {
                this.$message.success("添加成功！！！");
                this.form.resetFields();
              }
            })
            .catch((error) => {
              this.$message.error("网络错误！！！");
              console.log("网络错误！！！", error);
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
