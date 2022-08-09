import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: () => import('../views/test.vue')
  },
  {
    path: '/prototype',
    name: 'prototype',
    component: () => import('../views/prototype.vue')
  },
  {
    path: '/ed',
    name: 'ed',
    component: () => import('../views/editor_test')
  },
  {
    path: '/email',
    name: 'email',
    component: () => import("../views/email.vue")
  },
  {
    path: '/textbustest',
    name: 'textbustest',
    component: () => import("../views/textbustest")
  },
  {
    path: '/teamdashboard',
    name: 'teamdashboard',
    component: () => import("../views/teamdashboard")
  },
  {

    path: '/projectdashboard',
    name: 'projectdashboard',
    component: () => import("../components/project/projectMain")

  },
  {

    path: '/filetreetest',
    name: 'filetreetest',
    component: () => import("../views/filetreetest")
  },
  {
    path: '/filetreetry',
    name: 'filetreetry',
    component: () => import("../views/filetreetry")
  },
  {
    path: '/memberMain',
    name: 'memberMain',
    component: () => import("../components/team/MemberManage.vue")
  },
  {
    path: '/pdftest',
    name: 'pdftest',
    component: () => import("../views/pdftest")
  },
  {
    path: '/project/uml',
    name: 'projectUML',
    component: () => import("../views/UML.vue")
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// 白名单， 不需要验证的路由

const whiteList = ['/', '/register', '/login', '/email', 'test']


// 全局验证的路由守卫
// router.beforeEach((to, from, next) => {
//   if (whiteList.indexOf(to.path) !== -1) {
//     // 放行，进入下一个路由
//     next()
//   } else if (!JSON.parse(sessionStorage.getItem('IfLogin'))) {
//     next('/');
//   } else {
//     next()
//   }
// })
