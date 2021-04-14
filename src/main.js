import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
import ECharts from "vue-echarts";
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.use(Antd);
Vue.use(preview);

Vue.component("v-chart", ECharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
