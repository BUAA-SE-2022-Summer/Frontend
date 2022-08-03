import Vue from 'vue'
import VueRouter from 'vue-router'
import prototype from '../views/PrototypeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/prototype',
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
