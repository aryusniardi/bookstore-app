import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import stores from '../stores/index'

Vue.use(Router)

const router = new Router({
  moed: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/Books.vue')
    },
    {
      path: '/book/:slug',
      name: 'book',
      component: () => import('../views/Book.vue')
    },
    {
      path: '/category/:slug',
      name: "category",
      component: () => import('../views/Category.vue')
    },
    {
      path: '/checkout',
      name: "checkout",
      component: () => import('../views/Checkout.vue'),
      meta: {auth: true}
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/Payment.vue'),
      meta: {auth: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: {auth: true}
    },
    {
      path: '/my-order',
      name: 'my-order',
      component: () => import('../views/MyOrder.vue'),
      meta: {auth: true}
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ],

})

router.beforeEach((to, from, next) => {
  // jika routing ada meta auth-nya maka
  if(to.matched.some(record => record.meta.auth)) {
    // if user == guest
    if(stores.getters['auth/guest']) {
      // Menampilkan pesan
      stores.dispatch('alert/set', {
        status: true,
        text: 'Login first',
        color: 'error'
      })
      stores.dispatch('setPrevUrl', to.path)

      // menampilkan form login
      stores.dispatch('dialog/setComponent', 'login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
