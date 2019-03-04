import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

let routes = [
  {
    path: '',
    redirect: '/home',
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name: '',
    leaf: true,
    children: [
      { path: '/home', component: () => import('@/views/home'), name: '首页', icon: "el-icon-news" }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '商品',
    icon: 'el-icon-goods',
    children: [
      { path: '/goods/list', component: () => import('@/views/goods/list'), name: '商品列表', icon: 'el-icon-tickets' },
      { path: '/goods/categories', component: () => import('@/views/goods/categories'), name: '商品分类', icon: 'el-icon-sort' },
    ]
  },
  {
    path: '/404',
    hidden: true,
    name: '',
    component: () => import('@/views/404')
  },
  {
    path: '*',
    hidden: true,
    redirect: '/404',
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router