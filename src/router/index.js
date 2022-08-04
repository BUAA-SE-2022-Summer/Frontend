import Vue from 'vue'
import VueRouter from 'vue-router'
import prototype from '../views/PrototypeView.vue'
import dashBoard from "../views/Dashboard.vue"
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/namecard',
    name: 'namecard',
    component: () => import('../views/NameCard')
  },
  {
    path: '/',
    name: 'welcome',
    component: () => import('../views/Welcome_page')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login_page')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register_page')
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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashBoard,
    children: [
      {
        path: '/dashboard/team',
        name: 'teamMain',
        component: () => import('../components/team/TeamMain.vue')
      },
      {
        path: '/dashboard/demo',
        name: 'demo',
        component: () => import('../components/demo/DemoMain.vue'),
        children: [
          {
            path: '/dashboard/demo/console',
            name: 'console',
            component: () => import('../components/demo/DemoConsole.vue')
          },
          {
            path: '/dashboard/demo/create',
            name: 'create',
            component: () => import('../components/demo/DemoCreate.vue')
          },
          {
            path: '/dashboard/demo/star',
            name: 'star',
            component: () => import('../components/demo/DemoStar.vue')
          },
          {
            path: '/dashboard/demo/join',
            name: 'join',
            component: () => import('../components/demo/DemoJoin.vue')
          },
          {
            path: '/dashboard/demo/trash',
            name: 'trash',
            component: () => import('../components/demo/DemoTrash.vue')
          },
        ]
      }
    ]
  }
]
// {
//   path: '/dashboard/demo',
//   name: 'demo',
//   component: () => import('../views/projectMain.vue')
// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// 白名单， 不需要验证的路由
const whiteList = ['/', '/register', '/login']

// 全局验证的路由守卫
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    // 放行，进入下一个路由
    next()
  } else if (!JSON.parse(sessionStorage.getItem('IfLogin'))) {
    next('/');
  } else {
    next()
  }
})