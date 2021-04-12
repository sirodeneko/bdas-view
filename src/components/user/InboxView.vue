<template>
  <div class="user-center">
    <div class="center-header">
      <div @click="goBack" class="center-back">
        <a-icon type="arrow-left" />
      </div>
    </div>
    <a-row>
      <a-col :span="24" class="inbox-card">
        <a-card style="" class="shadow-light">
          <div class="inbox-title">{{ inbox.title }}</div>
          <div class="inbox-subtitle">{{ timeToString(inbox.created_at) }}</div>
          <div class="inbox-body" v-html="inbox.body"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import { userIdentityAuth, getUserMe } from "@/api/login";
//import { inboxList } from "@/api/login";
import { unixtimeToString } from "@/components/tools";

export default {
  name: "InboxView",
  data() {
    return {
      inbox: this.$store.getters.getInboxData,
    };
  },
  methods: {
    load() {},
    goBack() {
      this.$router.go(-1);
    },
    timeToString(time) {
      return unixtimeToString(time);
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
.inbox-card {
  text-align: center;
  .inbox-title {
    font-size: 25px;
    font-weight: 700;
  }
  .inbox-subtitle {
    color: rgba(0, 0, 0, 0.45);
  }
  .inbox-body {
    font-size: 16px;
    margin-top: 25px;
    text-align: left;
  }
}
</style>
