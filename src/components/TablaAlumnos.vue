<script setup lang="ts">
import type { AlumnoDTO } from '@/types/alumnoDTO'
import { getAlumnos } from '@/services/alumnosService'
import { ref, onMounted } from 'vue'
import { ViewMode } from '@/types/ViewMode'

const alumnos = ref<AlumnoDTO[]>([])

onMounted(async () => {
  alumnos.value = await getAlumnos()
})

</script>

<template>
  <div>
    <h2>Lista de alumnos</h2>
    <ul>
      <li v-for="alumno in alumnos" :key="alumno.dni">
        <router-link :to="{
           name: 'detalleAlumno',
           params: { dni: alumno.dni},
           query: {mode:ViewMode.VER}
            }">
          {{ alumno.nombre }} - {{ alumno.edad }} años - {{ alumno.dni }}
        </router-link>

      </li>
    </ul>
  </div>
</template>
  