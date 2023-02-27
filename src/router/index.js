import {createRouter,createWebHashHistory} from 'vue-router'
import LoginView from '../views/Login.vue'
import MainView from '../views/Main.vue'
import RecordsView from '../views/Records.vue'




const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/calculator',
    component: MainView,
  },
  {
    path: '/records',
    component: RecordsView
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router