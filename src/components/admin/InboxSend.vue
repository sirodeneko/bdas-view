<template>
  <div class="user-center">
    <div class="center-header"><h1>发送消息通知</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="查询用户" class="bdas-card" :headStyle="headStyles">
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
            <a-col :xs="24" :sm="20" :md="18">
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
                  {{ form.university_name }}
                </a-form-model-item>
                <a-form-model-item label="账号">
                  {{ form.user_name }}
                </a-form-model-item>
                <a-form-model-item label="昵称">
                  {{ form.nickname }}
                </a-form-model-item>

                <a-form-model-item label="标题">
                  <a-input v-model="form.title" />
                </a-form-model-item>
                <a-form-model-item label="正文">
                  <a-textarea allow-clear v-model="form.body" />
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
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { userInfo,inboxSend } from "@/api/login";

export default {
  name: "InboxSend",
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
        name: "邹小白",
        u_type: "user",
        body: "",
        title: "",
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
            if (this.form.u_type != "user") {
              this.form.university_name = res.data.university_name;
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
      let form = {
        u_type: this.form.u_type,
        id: this.form.id,
        body: this.form.body,
        title: this.form.title,
      };
      inboxSend(form)
        .then((res) => {
          if (res.code != 0) {
            this.$message.error("发送失败！！！" + res.msg);
            console.log("发送失败！！！", res);
          } else {
            this.$message.success("发送成功！！！");
            this.form.title="";
            this.form.body="";
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
