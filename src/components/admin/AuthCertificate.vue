<template>
  <div class="user-center">
    <div class="center-header"><h1>证书认证审核</h1></div>
    <a-row>
      <a-col :span="24">
        <a-card title="消息列表" class="bdas-card" :headStyle="headStyles">
          <a-row class="inbox-card">
            <a-col :span="24">
              <a-row class="inbox-header inbox-background">
                <a-col :span="6">编号 </a-col>
                <a-col :span="6">创建时间 </a-col>
                <a-col :span="6">用户 </a-col>
                <a-col :span="6">操作 </a-col>
              </a-row>
              <a-empty v-if="isEmpty" style="height: 300px" />
              <a-row
                v-else
                v-for="(item, index) in data"
                :key="item.id"
                :class="index % 2 != 0 ? 'inbox-background' : ''"
              >
                <a-col :span="6">{{ item.id }} </a-col>
                <a-col :span="6">{{ timeToString(item.created_at) }} </a-col>
                <a-col :span="6"
                  >{{ item.educational_ac_msg.university }}
                </a-col>
                <a-col :span="6">
                  <a-button type="primary" @click="openAuth(item)">
                    审核
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
import { msgList } from "@/api/login";
import { unixtimeToString } from "@/components/tools";

export default {
  name: "AuthUser",
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
      from: {},
      isEmpty: true,
      pageSize: 10,
      page: 1,
      total: 0,
    };
  },
  methods: {
    load() {
      // 初始化函数
      this.getMsgList(0).then((data) => {
        this.total = data.total;
        this.data = data.items;
        if (data.total != 0) {
          this.isEmpty = false;
        }
      });
    },
    getMsgList(offset) {
      let form = {
        m_type: "educational qualifications",
        limit: this.pageSize,
        offset: offset,
      };
      return msgList(form)
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
    pageChange(page, pageSize) {
      //console.log(page, pageSize);
      this.getMsgList((page - 1) * pageSize).then((data) => {
        this.total = data.total;
        this.data = data.items;
        //console.log(data);
      });
    },
    timeToString(time) {
      return unixtimeToString(time);
    },
    openAuth(item) {
      this.$store.commit("setUserAuth", item);
      this.$router.push({
        path: `/boos/authCertificateView`,
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
