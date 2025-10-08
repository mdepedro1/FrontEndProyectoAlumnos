import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddAlumnoView from '@/views/AddAlumnoView.vue'
import AlumnosView from '@/views/AlumnosView.vue'
import DetalleAlumnoView from '@/views/DetalleAlumnoView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/alumnos',
      name: 'listaAlumnos',
      component: AlumnosView,
    },
    {
      path: '/alumno/:dni',
      name: 'detalleAlumno',
      component: DetalleAlumnoView,
      props:route => ({
        dni:route.params.dni,
        mode: route.query.mode
      })
    },
    {
      path: '/nuevoAlumno',
      name: 'addAlumno',
      component: AddAlumnoView
    },
    {
      path: '/error',
      name: 'vistaError',
      component: ErrorView,
      props:true
    },

  ],
})

export default router
