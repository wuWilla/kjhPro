import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginContainer from './components/login/LoginContainer'

Vue.use(Router)

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    // base: "/kjh",
  routes: [
     {
       path: '/',
       redirect: '/home'
     },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
        path: '/product',
        name: '',
        component: () => import(/* webpackChunkName: "Product" */ './views/Product.vue')
    },
    {
        path: '/productDetail/:productID',
        name: 'ProductDetail',
        component: () => import(/* webpackChunkName: "Product" */ './views/ProductDetail.vue')
    },
    {
        path: "/activity",
        component: () => import(/* webpackChunkName: "Activity" */ "./views/Activity.vue"),
        children: [
            {
                path: "",
                redirect: "list"
            },
            {
                path: "list",
                name: "activity",
                component: () => import(/* webpackChunkName: "ActivityList" */ "./views/activity/list.vue")
            },
            {
                path: "open",
                name: "activityDetail",
                component: () => import(/* webpackChunkName: "Open" */ "./views/activity/Open.vue")
            },
            {
                path: "inverst",
                component: () => import(/* webpackChunkName: "Invest" */ "./views/activity/Inverst.vue")
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Login" */ './views/Register.vue')
    },
    {
        path: '/member',
        name: 'Member',
        component: () => import(/* webpackChunkName: "Member" */ './views/Member.vue')
    },
    {
        path: '/LoginContainer',
        name: 'LoginContainer',
        component: LoginContainer
    },
  ]
})
