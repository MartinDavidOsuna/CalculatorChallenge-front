import {createRouter,createWebHashHistory} from 'vue-router'
import LoginPage from '../views/Login.vue'
import HomePage from '../views/Home.vue'
import RecordsView from '../views/Records.vue'
import PricingView from '../views/Pricing.vue'



const routes = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/calculator',
    component: HomePage
  },
  {
    path: '/records',
    component: RecordsView
  }
  ,
  {
    path: '/pricing',
    component: PricingView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router