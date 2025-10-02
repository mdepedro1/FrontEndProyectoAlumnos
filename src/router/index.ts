import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddAlumnoView from '@/views/AddAlumnoView.vue'
import ModifyAlumnoView from '@/views/ModifyAlumnoView.vue'
import DeleteAlumnoView from '@/views/DeleteAlumnoView.vue'
import AlumnosView from '@/views/AlumnosView.vue'
import DetalleAlumnoView from '@/views/DetalleAlumnoView.vue'
import ModifyAlumnoWithParamView from '@/views/ModifyAlumnoWithParamView.vue'
import DeleteAlumnoWithParamView from '@/views/DeleteAlumnoWithParamView.vue'

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
      path: '/alumnos/:dni',
      name: 'detalleAlumno',
      component: DetalleAlumnoView,
      props:true

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
      path: '/cambiarAlumno/:dni',
      name: 'modifyAlumnoWithParam',
      component: ModifyAlumnoWithParamView,
      props:true
    },
    {
      path: '/eliminarAlumno',
      name: 'deleteAlumno',
      component: DeleteAlumnoView
    },
    {
      path: '/eliminarAlumno/:dni',
      name: 'deleteAlumnoWithParam',
      component: DeleteAlumnoWithParamView,
      props:true
    },

  ],
})

export default router
