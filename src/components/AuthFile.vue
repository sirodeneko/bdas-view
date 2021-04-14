<template>
  <div class="user-center">
    <div class="container authbox">
      <div class="center-header">
        <div @click="goBack" class="center-back">
          <a-icon type="arrow-left" />
        </div>
        <h1>证书校验</h1>
      </div>

      <a-row>
        <a-col :span="24">
          <a-card
            title="上传证书进行校验"
            class="bdas-card"
            :headStyle="headStyles"
          >
            <a-form-model
              :label-col="{ span: 4, md: { offset: 6 } }"
              :wrapper-col="{ span: 16, md: 8 }"
            >
              <a-form-model-item label="证书编号">
                <a-input v-model="form.file_id" />
              </a-form-model-item>
              <a-form-model-item label="上传证书">
                <a-upload
                  name="f1"
                  :multiple="false"
                  action="/api/v1/file/upload"
                  @change="handleChange"
                  :file-list="fileList"
                >
                  <a-button> <a-icon type="upload" /> 点击上传 </a-button>
                </a-upload>
              </a-form-model-item>
              <a-form-model-item
                :wrapper-col="{ md: { offset: 10 }, offset: 4 }"
              >
                <a-button type="primary" @click="handleButton"> 查询 </a-button>
              </a-form-model-item>
            </a-form-model>
            <a-empty v-if="isEmpty" style="height: 300px" />

            <a-descriptions v-else bordered title="查询成功" size="middle">
              <a-descriptions-item label="姓名">
                {{ item.name }}
              </a-descriptions-item>
              <a-descriptions-item label="性别"
                >{{ item.sex == 1 ? "男" : "女" }}
              </a-descriptions-item>
              <a-descriptions-item label="民族">
                {{ item.ethnic }}
              </a-descriptions-item>
              <a-descriptions-item label="生日"
                >{{ getTimeStr(item.birthday) }}
              </a-descriptions-item>
              <a-descriptions-item label="身份证号">
                {{ item.card_code }}
              </a-descriptions-item>
              <a-descriptions-item label="学历类别">
                {{ item.education_category }}
              </a-descriptions-item>
              <a-descriptions-item label="层次">
                {{ item.level }}
              </a-descriptions-item>
              <a-descriptions-item label="学校">
                {{ item.university }}
              </a-descriptions-item>
              <a-descriptions-item label="专业">
                {{ item.professional }}
              </a-descriptions-item>
              <a-descriptions-item label="学习形式">
                {{ item.learning_format }}
              </a-descriptions-item>
              <a-descriptions-item label="学制">
                {{ item.educational_system }}
              </a-descriptions-item>
              <a-descriptions-item label="入学日期">
                {{ item.admission_date }}
              </a-descriptions-item>
              <a-descriptions-item label="毕业日期">
                {{ item.graduation_date }}
              </a-descriptions-item>
              <a-descriptions-item label="状态">
                {{ item.status }}
              </a-descriptions-item>
              <a-descriptions-item label="证书验证码">
                {{ item.file_hash }}
              </a-descriptions-item>
            </a-descriptions>
            <!-- <a-row>
              <a-col :span="24" :md="12"> xxx </a-col>
              <a-col :span="24" :md="12">xxx</a-col>
            </a-row> -->
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { acFile } from "@/api/login";
const key = "updatable";
export default {
  name: "AuthFile",
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
      fileList: [],
      isEmpty: true,
      form: {
        file_url: "",
        file_id: "",
      },
      item: {},
      loadingKey: "key",
    };
  },
  methods: {
    load() {
      // 初始化函数
    },
    handleChange(info) {
      let fileList = [...info.fileList];
      // 限制上传的数量
      fileList = fileList.slice(-1);
      fileList = fileList.map((file) => {
        if (file.response) {
          // 获取返回的值
          //console.log("这是什么:", file.response);
          this.form.file_url = file.response.data.fileName;
        }
        return file;
      });
      this.fileList = fileList;
    },
    handleButton() {
      let form = {
        file_url: this.form.file_url,
        file_id: Number(this.form.file_id),
      };
      console.log(form);
      if (!form.file_url || form.file_id == 0) {
        this.$message.error("填写的信息有误！");
        return;
      }
      this.$message.loading({ content: "Loading...", key });
      this.isEmpty = true;
      acFile(form)
        .then((res) => {
          if (res.code != 0) {
            console.log("获取失败！！！", res);
            this.$message.error({
              content: "获取失败，" + res.msg,
              key,
              duration: 2,
            });
          } else {
            if (res.data == false) {
              this.$message.error({
                content: "输入信息错误，查询不到证书",
                key,
                duration: 2,
              });
            } else {
              this.item = res.data;
              this.$message.success({ content: "获取成功!", key, duration: 2 });
              this.isEmpty = false;
            }
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          console.log("网络错误！！！", error);
        });
    },
    goBack() {
      this.$router.push({
        path: `/`,
      });
    },
    getTimeStr(cjsj) {
      if (cjsj / 10000000000 <= 1) {
        cjsj = cjsj * 1000;
      }
      var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "日";
      return Y + M + D;
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
    .authbox {
      max-width: 1000px;
    }
  }
}
</style>
