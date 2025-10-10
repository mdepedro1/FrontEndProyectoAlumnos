<script setup lang="ts">
import type { AlumnoDTO } from '@/types/alumnoDTO'
import { getAlumnos } from '@/services/alumnosService'
import { ref, onMounted, watch } from 'vue'
import { ViewMode } from '@/types/ViewMode'
import { RouterLink } from 'vue-router'

const alumnos = ref<AlumnoDTO[]>([])
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  alumnos.value = await getAlumnos()
  loading.value = false;
})

watch(loading,
  ()=>{
    if(loading.value){

    }
  }

)

</script>

<template>
  <div>
    <div v-if="loading" class="cargando">
      <img src="@/assets/loading.gif" />
    </div>
    <div v-else>
      <h2>Lista de alumnos</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>DNI</th>
          <th >Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.dni">
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.edad }} años</td>
          <td>{{ alumno.dni }}</td>
          <td>
            <RouterLink class="iconos" :to="{name:'detalleAlumno',params:{dni:alumno.dni},query:{mode:ViewMode.VER}}">
              <img  src="@/assets/eye.png" alt="imagen de un ojo que lleva a modo ver" width="24" height="24" title="Ver informacion del alumno" >
            </RouterLink>
            <RouterLink class="iconos" :to="{name:'detalleAlumno',params:{dni:alumno.dni},query:{mode:ViewMode.MODIFICAR}}">
              <img  src="@/assets/editar.png" alt="imagen de un lapiz que lleva a modo edicion" width="24" height="24" title="Modificar alumno" >
            </RouterLink>
            <RouterLink class="iconos" :to="{name:'detalleAlumno',params:{dni:alumno.dni},query:{mode:ViewMode.ELIMINAR}}">
              <img  src="@/assets/delete.png" alt="imagen de una papelera que lleva a modo eliminar" width="24" height="24" title="Eliminar alumno" >
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    </div>

  </div>
</template>

<style>

.cargando img {
  background-color: #f7ede2;
  width: 100%;
  height: 100%;
}

.iconos{
  background-color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-right:  16px ;

}
.iconos:hover{
  background-color: gray;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f3f3f3;
  font-weight: bold;
}
td {
  background-color: #ddd;
}

</style>
