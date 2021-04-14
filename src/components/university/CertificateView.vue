<template>
  <div class="user-center">
    <div class="center-header">
      <div @click="goBack" class="center-back">
        <a-icon type="arrow-left" />
      </div>
    </div>
    <a-row>
      <a-col :span="24">
        <a-card class="bdas-card">
          <a-row type="flex" justify="center">
            <a-col :xs="24" :sm="20" :md="18">
              <a-form-model
                :model="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 14 }"
                class="admin-modify-form"
              >
                <a-form-model-item label="姓名">
                  <a-input v-model="form.name" disabled />
                </a-form-model-item>
                <a-form-model-item label="性别">
                  <a-select
                    default-value="1"
                    style="width: 80px"
                    v-model="form.sex"
                    disabled
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
                    disabled
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
                  <a-date-picker
                    v-model="form.birthday"
                    :format="dateFormat"
                    disabled
                  />
                </a-form-model-item>

                <a-form-model-item label="身份证号">
                  <a-input v-model="form.card_code" disabled />
                </a-form-model-item>
                <a-form-model-item label="学历类别">
                  <a-input v-model="form.education_category" disabled />
                </a-form-model-item>
                <a-form-model-item label="层次">
                  <a-input v-model="form.level" disabled />
                </a-form-model-item>
                <a-form-model-item label="学校">
                  <a-input v-model="form.university" disabled />
                </a-form-model-item>
                <a-form-model-item label="专业">
                  <a-input v-model="form.professional" disabled />
                </a-form-model-item>
                <a-form-model-item label="学习形式">
                  <a-input v-model="form.learning_format" disabled />
                </a-form-model-item>
                <a-form-model-item label="学制">
                  <a-input v-model="form.educational_system" disabled />
                </a-form-model-item>
                <a-form-model-item label="入学日期">
                  <a-input v-model="form.admission_date" disabled />
                </a-form-model-item>
                <a-form-model-item label="毕业日期">
                  <a-input v-model="form.graduation_date" disabled />
                </a-form-model-item>
                <a-form-model-item label="是否结业">
                  <a-select style="width: 120px" v-model="form.status" disabled>
                    <a-select-option value="毕业"> 是 </a-select-option>
                    <a-select-option value="未毕业"> 否 </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item label="照片">
                  <img
                    v-if="form.student_avatar"
                    width="120px"
                    :src="`/api/v1/file/download/` + form.student_avatar"
                  />
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
import { universityCertificateMsg } from "@/api/login";
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
      MsgInfo: this.$store.getters.getCertificate,
      nations: nations,
      dateFormat: "YYYY/MM/DD",
      loading: false,
      imageUrl: "",
    };
  },
  methods: {
    load() {
      // 初始化函数
      this.getData();
    },
    goBack() {
      this.$router.go(-1);
    },
    getData() {
      let form = {
        msg_id: this.MsgInfo.message_id,
      };
      universityCertificateMsg(form)
        .then((res) => {
          // console.log("返回值：", res);
          if (res.code != 0) {
            this.$message.error("获取失败");
            console.log("获取失败", res);
          } else {
            this.form = res.data.educational_ac_msg;
            this.form.birthday = moment(res.data.educational_ac_msg.birthday);
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
