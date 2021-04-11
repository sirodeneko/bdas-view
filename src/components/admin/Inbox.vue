<template>
  <div class="user-center">
    <div class="center-header">
      <h1>消息列表(管理员)</h1>
      <a-button type="primary" style="margin-left: auto"
        ><router-link to="/boos/sendInbox"
          ><a-icon type="plus" /> 发送消息
        </router-link>
      </a-button>
    </div>
    <a-row>
      <a-col :span="24" class="inbox-card">
        <a-card style="" class="shadow-light">
          <a-row class="inbox-header inbox-background">
            <a-col :span="3">编号 </a-col>
            <a-col :span="5">创建时间 </a-col>
            <a-col :span="8">标题 </a-col>
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
            <a-col :span="8">{{ item.title }} </a-col>
            <a-col :span="4">
              <div v-if="item.state == 1">已读</div>
              <div v-else style="color: red">未读</div>
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
import { inboxList,inboxLook } from "@/api/login";
import { unixtimeToString } from "@/components/tools";

export default {
  name: "AdminInbox",
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
      data: [],
      isEmpty: true,
      pageSize: 10,
      page: 1,
      total: 10,
    };
  },
  methods: {
    async load() {
      // 初始化函数
      let inboxTotal = await this.getInboxList(0);
      this.total = inboxTotal.total;
      this.data = inboxTotal.items;
      if (inboxTotal.total != 0) {
        this.isEmpty = false;
      }
    },

    pageChange(page, pageSize) {
      //console.log(page, pageSize);
      this.getInboxList((page - 1) * pageSize).then((data) => {
        this.total = data.total;
        this.data = data.items;
        console.log(data);
      });
    },

    getInboxList(offset) {
      let form = {
        limit: 10,
        offset: offset,
      };
      return inboxList(form)
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
      inboxLook({inbox_id:item.id});
      item.state=1;
      this.$store.commit("setInboxData", item);
      this.$router.push({
        path: `/boos/inboxView`,
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
