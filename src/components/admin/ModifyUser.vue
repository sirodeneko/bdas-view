<template>
  <div class="user-center">
    <div class="center-header"><h1>修改用户信息</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="修改用户" class="bdas-card" :headStyle="headStyles">
          <div slot="extra" style="display: flex; justify-content: center">
            <a-select
              default-value="user"
              style="width: 100px; margin-right: 5px"
              v-model="queryForm.u_type"
            >
              <a-select-option value="user"> 普通用户 </a-select-option>
              <a-select-option value="university"> 学校用户 </a-select-option>
            </a-select>
            <a-input
              placeholder="用户id"
              style="width: 100px; margin-right: 5px"
              v-model="queryForm.uid"
            />
            <a-button type="primary" @click="handleButton"> 查询 </a-button>
          </div>
          <a-empty v-if="isEmpty" style="height: 500px" />
          <a-row type="flex" justify="center" v-else>
            <a-col :xs="24" :sm="20" :md="12">
              <a-form-model
                :model="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 14 }"
                class="admin-modify-form"
              >
                <a-form-model-item label="ID">
                  {{ form.id }}
                </a-form-model-item>
                <a-form-model-item label="学校" v-if="form.u_type != 'user'">
                  <a-input v-model="form.university_name" required />
                </a-form-model-item>
                <a-form-model-item label="账号">
                  {{ form.user_name }}
                </a-form-model-item>
                <a-form-model-item label="昵称">
                  <a-input v-model="form.nickname" required />
                </a-form-model-item>
                <a-form-model-item label="状态">
                  <a-select
                    default-value="user"
                    style="width: 80px; margin-right: 5px"
                    v-model="form.status"
                  >
                    <a-select-option value="active"> 激活 </a-select-option>
                    <a-select-option value="inactive"> 未激活 </a-select-option>
                    <a-select-option value="suspend"> 封禁 </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-form-model-item
                  label="身份证号"
                  v-if="form.u_type == 'user'"
                >
                  <a-input v-model="form.card_code" />
                </a-form-model-item>
                <a-form-model-item
                  label="修改身份证号"
                  v-if="form.u_type == 'user'"
                >
                  <a-switch v-model="form.delivery" />
                </a-form-model-item>
                <a-form-model-item label="新密码">
                  <a-input v-model="form.new_password" />
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
                  <a-button type="primary" @click="submitForm">
                    Submit
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
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { userInfo, modifyUser, modifyUniversity } from "@/api/login";

export default {
  name: "ModifyUser",
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
      form: {
        id: 1,
        user_name: "sirosiro",
        university_name: "xx大学",
        nickname: "小白小白",
        status: "inactive",
        name: "邹小白",
        card_code: "xxxxxxxxxxxxxxxxx",
        u_type: "user",
        new_password: "",
        delivery: false,
      },
      queryForm: {
        u_type: "user",
        uid: "",
      },
      isEmpty: true,
    };
  },
  methods: {
    load() {
      // 初始化函数
    },
    handleButton() {
      // 参数校验
      if (this.queryForm.uid == "" || isNaN(this.queryForm.uid)) {
        this.$message.error("请输入正确的用户id,注意:不是账号");
        return;
      }
      this.queryForm.uid = parseInt(this.queryForm.uid);
      userInfo(this.queryForm)
        .then((res) => {
          if (res.code != 0) {
            this.$message.error("查询失败！！！" + res.msg);
            console.log("查询失败", res);
            this.isEmpty = true;
          } else {
            this.form.u_type = this.queryForm.u_type;
            this.form.id = res.data.id;
            this.form.user_name = res.data.user_name;
            this.form.nickname = res.data.nickname;
            this.form.status = res.data.status;
            this.form.delivery = false;
            if (this.form.u_type != "user") {
              this.form.university_name = res.data.university_name;
            } else {
              this.form.card_code = res.data.card_code;
            }
            this.isEmpty = false;
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          console.log("网络错误！！！", error);
        });
    },
    submitForm() {
      let postFunc;
      let form = this.form;
      let card_code = form.card_code;
      if (this.form.u_type == "user") {
        postFunc = modifyUser;
      } else {
        postFunc = modifyUniversity;
      }

      if (!form.delivery) {
        form.card_code = "";
      }
      postFunc(form)
        .then((res) => {
          if (res.code != 0) {
            this.$message.error("修改失败！！！" + res.msg);
            console.log("修改失败", res);
          } else {
            this.form.delivery = false;
            this.$message.success("修改成功！！！");
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          console.log("网络错误！！！", error);
        });
      form.card_code = card_code;
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
.admin-modify-form {
  .ant-form-item-label {
    font-weight: 700;
  }
}
</style>
