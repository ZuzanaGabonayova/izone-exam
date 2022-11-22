import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'about',
    component: AboutView
  },
  {
    path: '/shop',
    name: 'ShopView',
    component: () => import('../views/ShopView.vue')
  },
  {
    path: '/cart',
    name: 'CartView',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/adminlogin',
    name: 'AdminLoginView',
    component: () => import('../views/AdminLoginView.vue')
  },
  {
    path: '/editview',
    name: 'EditView',
    component: () => import('../views/EditDevicesView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addview',
    name: 'AddView',
    component: () => import('../views/AddDevicesView.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {

  return new Promise((resolve, reject) => {
    const removeEventListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeEventListener();
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth){
    if(await getCurrentUser){
      next();
    }
  }
  else{
    next();
  }
})

export default router
