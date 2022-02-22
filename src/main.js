import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 导入全局样式
import './assets/css/global.css'
//引入elementui
import {MessageBox, Option,Select,Dialog, Pagination,Switch,Tooltip, TableColumn, Table,Button, Form,FormItem,Input,Message,Container, Header, Aside, Main, Menu, Submenu, MenuItem, Col,Row,Breadcrumb, BreadcrumbItem,Card} from 'element-ui'
// 导入阿里图标
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(Option);
Vue.use(Select);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.prototype.$axios=axios
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
//配置请求根路径
axios.defaults.baseURL='http://127.0.0.1'
axios.interceptors.request.use((config)=>{
  console.log(config)
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
