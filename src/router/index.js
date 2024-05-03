import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home'
import SignUpView from '../views/home/sign-up'
import StudentsView from '../views/students'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/cadastrar',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/estudantes',
    name: 'Students',
    component: StudentsView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
