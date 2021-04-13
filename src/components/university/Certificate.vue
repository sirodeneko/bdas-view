<template>
  <div class="user-center">
    <div class="center-header"><h1>提交学历证书信息</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="证书信息填写" class="bdas-card" :headStyle="headStyles">
          <div
            slot="extra"
            style="display: flex; justify-content: center; margin-right: 20px"
          >
            <a-button type="primary"> 导入 </a-button>
          </div>
          <a-row type="flex" justify="center">
            <a-col :xs="24" :sm="20" :md="18">
              <a-form-model
                :model="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 14 }"
                class="admin-modify-form"
              >
                <a-form-model-item label="姓名">
                  <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="性别">
                  <a-select
                    default-value="1"
                    style="width: 80px"
                    v-model="form.sex"
                  >
                    <a-select-option value="1"> 男 </a-select-option>
                    <a-select-option value="2"> 女 </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-form-model-item label="民族">
                  <a-select
                    default-value="汉族"
                    style="width: 120px"
                    v-model="form.ethnic"
                  >
                    <a-select-option
                      v-for="item in nations"
                      :key="item"
                      :value="item"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-form-model-item label="生日">
                  <a-date-picker v-model="form.birthday" :format="dateFormat" />
                </a-form-model-item>

                <a-form-model-item label="身份证号">
                  <a-input v-model="form.card_code" />
                </a-form-model-item>
                <a-form-model-item label="学历类别">
                  <a-input v-model="form.education_category" />
                </a-form-model-item>
                <a-form-model-item label="层次">
                  <a-input v-model="form.level" />
                </a-form-model-item>
                <a-form-model-item label="学校">
                  <a-input v-model="form.university" disabled />
                </a-form-model-item>
                <a-form-model-item label="专业">
                  <a-input v-model="form.professional" />
                </a-form-model-item>
                <a-form-model-item label="学习形式">
                  <a-input v-model="form.learning_format" />
                </a-form-model-item>
                <a-form-model-item label="学制">
                  <a-input v-model="form.educational_system" />
                </a-form-model-item>
                <a-form-model-item label="入学日期">
                  <a-input v-model="form.admission_date" />
                </a-form-model-item>
                <a-form-model-item label="毕业日期">
                  <a-input v-model="form.graduation_date" />
                </a-form-model-item>
                <a-form-model-item label="是否结业">
                  <a-select style="width: 120px" v-model="form.status">
                    <a-select-option value="毕业"> 是 </a-select-option>
                    <a-select-option value="未毕业"> 否 </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item label="照片">
                  <a-upload
                    name="f1"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="/api/v1/file/upload"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                  >
                    <img
                      v-if="form.student_avatar"
                      width="120px"
                      :src="`/api/v1/file/download/` + form.student_avatar"
                    />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
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
import { universityCertificate } from "@/api/login";
import moment from "moment";

const nations = [
  "汉族",
  "蒙古族",
  "回族",
  "藏族",
  "维吾尔族",
  "苗族",
  "彝族",
  "壮族",
  "布依族",
  "朝鲜族",
  "满族",
  "侗族",
  "瑶族",
  "白族",
  "土家族",
  "哈尼族",
  "哈萨克族",
  "傣族",
  "黎族",
  "傈僳族",
  "佤族",
  "畲族",
  "高山族",
  "拉祜族",
  "水族",
  "东乡族",
  "纳西族",
  "景颇族",
  "柯尔克孜族",
  "土族",
  "达斡尔族",
  "仫佬族",
  "羌族",
  "布朗族",
  "撒拉族",
  "毛南族",
  "仡佬族",
  "锡伯族",
  "阿昌族",
  "普米族",
  "塔吉克族",
  "怒族",
  "乌孜别克族",
  "俄罗斯族",
  "鄂温克族",
  "德昂族",
  "保安族",
  "裕固族",
  "京族",
  "塔塔尔族",
  "独龙族",
  "鄂伦春族",
  "赫哲族",
  "门巴族",
  "珞巴族",
  "基诺族",
];

export default {
  name: "UniversityCertificate",
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
      form: {
        name: "",
        sex: "1",
        ethnic: "汉族",
        birthday: moment("2015/01/01", "YYYY/MM/DD"),
        card_code: "",
        education_category: "",
        level: "",
        university: this.$store.getters.getUniversityData.university_name,
        professional: "",
        learning_format: "",
        educational_system: "",
        admission_date: "",
        graduation_date: "",
        status: "毕业",
        student_avatar: "",
      },
      userInfo: this.$store.getters.getUniversityData,
      nations: nations,
      dateFormat: "YYYY/MM/DD",
      loading: false,
      imageUrl: "",
    };
  },
  methods: {
    load() {
      // 初始化函数
    },
    submitForm() {
      let form = {
        name: this.form.name,
        sex: Number(this.form.sex),
        ethnic: this.form.ethnic,
        birthday: this.form.birthday.unix(),
        card_code: this.form.card_code,
        education_category: this.form.education_category,
        level: this.form.level,
        university: this.form.university,
        professional: this.form.professional,
        learning_format: this.form.learning_format,
        educational_system: this.form.educational_system,
        admission_date: this.form.admission_date,
        graduation_date: this.form.graduation_date,
        status: this.form.status,
        student_avatar: this.form.student_avatar,
      };

      //console.log(form);
      universityCertificate(form)
        .then((res) => {
          if (res.code != 0) {
            this.$message.error("发送失败！！！" + res.msg);
            console.log("发送失败！！！", res);
          } else {
            this.$message.success("发送成功！！！");
            this.form = {
              name: "",
              sex: "1",
              ethnic: "汉族",
              birthday: moment("2015/01/01", "YYYY/MM/DD"),
              card_code: "",
              education_category: "",
              level: "",
              university: this.$store.getters.getUniversityData.university_name,
              professional: "",
              learning_format: "",
              educational_system: "",
              admission_date: "",
              graduation_date: "",
              status: "毕业",
              student_avatar: "",
            };
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          console.log("网络错误！！！", error);
        });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.form.student_avatar = info.file.response.data.fileName;
        this.loading = false;
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 10MB!");
      }
      return isJpgOrPng && isLt2M;
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

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
