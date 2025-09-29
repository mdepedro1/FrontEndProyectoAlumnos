import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddAlumnoView from '@/views/AddAlumnoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/nuevoAlumno',
      name: 'addAlumno',
      component: AddAlumnoView
    },
  ],
})

export default router
