import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashbord.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    // child: [
    //   {
    //     path: '/dashboard/dashboard-1',
    //     name: 'dashboard-1',
    //     //component: () => import('../views/Dashboard-1.vue')
    //   },
    //   {
    //     path: '/dashboard/dashboard-2',
    //     name: 'dashboard-2',
    //     //component: () => import('../views/Dashboard-2.vue')
    //   },
    // ]
  },
  {
    path: '/dashboard/demo',
    name: 'demo',
    component: () => import('../views/demo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
