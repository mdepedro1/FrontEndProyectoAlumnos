import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddAlumnoView from '@/views/AddAlumnoView.vue'
import ModifyAlumnoView from '@/views/ModifyAlumnoView.vue'
import DeleteAlumnoView from '@/views/DeleteAlumnoView.vue'

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
    {
      path: '/cambiarAlumno',
      name: 'modifyAlumno',
      component: ModifyAlumnoView
    },
    {
      path: '/eliminarAlumno',
      name: 'deleteAlumno',
      component: DeleteAlumnoView
    },

  ],
})

export default router
