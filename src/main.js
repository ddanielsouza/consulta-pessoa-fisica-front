import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'iview/dist/styles/iview.css';
import {Conf} from './conf';

Vue.router = router;
Vue.config.productionTip = false;

new Conf()
  .requests()
  .auth()
  .iView();

new Vue({ router, render: h => h(App) }).$mount("#app");