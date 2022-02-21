import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../view/home.vue'
import Welcome from '../view/Welcome.vue'
import UserList from '../view/user/UserList.vue'
import PermissionList from '../view/PermissionList.vue'



Vue.use(Router)

const routes = [
  {
    path:'/',
    redirect:'/login'     //访问/,重定向到/login
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:Welcome,
      },
      {
        path:'/userList',
        component:UserList,
      },
      {
        path:'/permissionList',
        component:PermissionList,
      },
    ]
  },

]

const router = new Router({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
// to表示要访问的路径
// from表示从哪个路径跳转而来
// next是一个函数，表示放行
// next('/login')表示强制跳转到/login
if(to.path==='/login')return next()
const tokenStr=sessionStorage.getItem('token')
if(!tokenStr)return next('/login')
next()
})

export default router
