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
    component: HomeView,
    meta: {
      title: "Login",
    }
  },
  {
    path: '/cadastrar',
    name: 'SignUp',
    component: SignUpView,
    meta: {
      title: "Cadastro"
    }
  },
  {
    path: '/estudantes',
    name: 'Students',
    component: StudentsView,
    meta: {
      title: "Estudantes",
      auth: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Grupo A` : "Grupo A";

  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('authToken')?.length) {
      next();
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});

export default router
