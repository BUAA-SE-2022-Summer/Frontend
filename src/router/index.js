import Vue from 'vue'
import VueRouter from 'vue-router'
import prototype from '../views/PrototypeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('../views/Welcome_page')
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login_page')
  },
  {
    path: '/rigister',
    name: 'rigister',
    component: () => import('../views/rigister_page')
  },
  {
    path: '/user_center',
    name: 'user_center',
    component: () => import('../views/user_center')
  },
  {
    path: '/true_user_center',
    name: 'true_user_center',
    component: () => import('../views/true_user_center')
  },
  {
    path: '/dashboard/prototype',
    name: 'prototype',
    component: prototype
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
