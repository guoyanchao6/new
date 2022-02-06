import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式
import './assets/css/global.css'
//引入elementui
import { Button, Form,FormItem,Input } from 'element-ui';
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
