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
    children:[
      {
        path:'/dashboard/main',
        name:'main',
        component: () => import('../views/projectMain.vue')
      },
      {
        path:'/dashboard/team',
        name:'main',
        component: () => import('../components/team/TeamMain.vue')
      }
    ]
  },
  // {
  //   path: '/dashboard/demo',
  //   name: 'demo',
  //   component: () => import('../views/projectMain.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
