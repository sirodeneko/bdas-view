<template>
  <div class="user-center">
    <div class="center-header">
      <h1>历史提交信息</h1>
    </div>
    <a-row>
      <a-col :span="24" class="inbox-card">
        <a-card
          :headStyle="headStyles"
          title="查询历史提交"
          class="shadow-light"
        >
          <div slot="extra" style="display: flex; justify-content: center">
            <a-month-picker
              style="width: 150px; margin-right: 5px"
              v-model="form.time_limit"
              :format="dateFormat"
              placeholder="选择月份"
            />
            <a-select
              style="width: 80px; margin-right: 5px"
              v-model="form.status"
            >
              <a-select-option value="1"> 等待 </a-select-option>
              <a-select-option value="2"> 运行中 </a-select-option>
              <a-select-option value="3"> 失败 </a-select-option>
              <a-select-option value="4"> 成功 </a-select-option>
              <a-select-option value="5"> 不通过 </a-select-option>
            </a-select>
            <a-input
              placeholder="学生姓名"
              style="width: 100px; margin-right: 5px"
              v-model="form.name"
            />
            <a-button type="primary" @click="handleButton"> 查询 </a-button>
          </div>

          <a-row class="inbox-header inbox-background">
            <a-col :span="3">编号 </a-col>
            <a-col :span="5">创建时间 </a-col>
            <a-col :span="8">学生姓名 </a-col>
            <a-col :span="4">状态 </a-col>
            <a-col :span="4">操作 </a-col>
          </a-row>
          <a-empty v-if="isEmpty" style="height: 300px" />
          <a-row
            v-else
            v-for="(item, index) in data"
            :key="item.id"
            :class="index % 2 != 0 ? 'inbox-background' : ''"
          >
            <a-col :span="3">{{ item.id }} </a-col>
            <a-col :span="5">{{ timeToString(item.created_at) }} </a-col>
            <a-col :span="8">{{ item.student_name }} </a-col>
            <a-col :span="4">
              <div v-if="item.states == 1">等待审核</div>
              <div v-else-if="item.states == 2">运行中</div>
              <div v-else-if="item.states == 3" style="color: red">失败</div>
              <div v-else-if="item.states == 4" style="color: #0075ff">
                成功
              </div>
              <div v-else-if="item.states == 5" style="color: red">不通过</div>
              <div v-else style="color: red">未知</div>
            </a-col>
            <a-col :span="4">
              <a-button type="primary" @click="openInbox(item)">
                查看
              </a-button>
            </a-col>
          </a-row>
          <a-row class="inbox-footer" type="flex" justify="end">
            <a-pagination
              :hideOnSinglePage="true"
              :defaultPageSize="pageSize"
              :total="total"
              :current="current"
              @change="pageChange"
            />
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import { userIdentityAuth, getUserMe } from "@/api/login";
import { universityCertificateList } from "@/api/login";
import { unixtimeToString } from "@/components/tools";
import moment from "moment";

export default {
  name: "UserInbox",
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
      dateFormat: "YYYY/MM/DD",
      data: [],
      isEmpty: true,
      pageSize: 10,
      page: 1,
      total: 10,
      current: 1,
      form: {
        time_limit: moment(0),
        name: "",
        status: "",
      },
    };
  },
  methods: {
    async load() {
      // 初始化函数
      let inboxTotal = await this.getList(0, this.form);
      this.total = inboxTotal.total;
      this.data = inboxTotal.items;
      if (inboxTotal.total != 0) {
        this.isEmpty = false;
      }
    },

    pageChange(page, pageSize) {
      //console.log(page, pageSize);
      this.getInboxList((page - 1) * pageSize, this.form).then((data) => {
        this.total = data.total;
        this.data = data.items;
        console.log(data);
      });
    },

    getList(offset, data) {
      let form = {
        limit: 10,
        offset: offset,
        time_limit: data.time_limit.unix(),
        name: data.name,
        status: Number(data.status),
      };
      console.log(form);
      return universityCertificateList(form)
        .then((res) => {
          // console.log("返回值：", res);
          if (res.code != 0) {
            this.$message.error("获取失败");
            console.log("获取失败", res);
          } else {
            return res.data;
          }
        })
        .catch((error) => {
          this.$message.error("网络错误！！！");
          console.log("网络错误！！！", error);
        });
    },
    timeToString(time) {
      return unixtimeToString(time);
    },
    openInbox(item) {
      this.$store.commit("setCertificate", item);
      this.$router.push({
        path: `/university/certificateView`,
      });
    },
    handleButton() {
      this.getList(0, this.form).then((data) => {
        this.total = data.total;
        this.data = data.items;
        this.current = 1;
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
}
.inbox-card {
  .ant-card {
    border-radius: 4px;
  }
  .ant-row {
    height: 60px;
    line-height: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    .ant-col {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .inbox-header {
    font-weight: 700;
  }
  .inbox-background {
    background-color: rgba(0, 0, 0, 0.02);
  }
  .inbox-footer {
    padding: 15px;
    .ant-pagination-item-link {
      display: block;
    }
  }
}
</style>
