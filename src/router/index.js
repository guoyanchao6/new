import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import index from '../view/layout/index.vue'
import Home from '../view/home/index.vue'
import UserList from '../view/user/UserList.vue'
import rightsList from '../view/power/rights.vue'
import rolesList from '../view/power/roles.vue'
import goodsCategories from '../view/goods/cate.vue'



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
    path:'/index',
    component:index,
    redirect:'/home',
    children:[
      {
        path:'/home',
        component:Home,
      },
      {
        path:'/userList',
        component:UserList,
      },
      {
        path:'/rightsList',
        component:rightsList,
      },
      {
        path:'/rolesList',
        component:rolesList,
      },
      {
        path:'/goodsCategories',
        component:goodsCategories,
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
