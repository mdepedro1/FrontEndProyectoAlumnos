<script setup lang="ts">

import { crearAlumno } from '@/services/alumnosService';
import type { AlumnoDTO } from '@/types/alumnoDTO';
import {ref, reactive} from 'vue'


    const alumno = reactive <AlumnoDTO>({
      dni:0,
      nombre: '',
      edad:0
    });
    const mensaje=ref('');
    const guardado=ref(false);
    const guardarAlumno=async() =>{
      try{
        await crearAlumno(alumno)
        mensaje.value='Alumno guardado correctamente'
        guardado.value=true;

        alumno.dni=0
        alumno.edad=0
        alumno.nombre=''
      }
      catch(error){
        guardado.value=false
        console.error(error)
        if (error instanceof Error) {
        mensaje.value = error.message
        }

      }
    };




</script>


<template>
  <div class="addAlumno">
    <form @submit.prevent="guardarAlumno">
      <div >
        <label for="dni">DNI:</label>
        <input class="entradas" type="number" id="dni" v-model="alumno.dni"  required />
      </div>
      <div >
        <label for="nombre">Nombre:</label>
        <input class="entradas" type="text" id="nombre" v-model="alumno.nombre"  required />
      </div>
      <div >
        <label for="edad">Edad:</label>
        <input  class="entradas" type="number" id="edad" v-model="alumno.edad" required />
      </div>
      <button class="boton" type="submit">Añadir alumno</button>
    </form>
    <p v-if="guardado" style="color: green;">{{ mensaje }}</p>
    <p v-else style="color: red;">{{ mensaje }}</p>
  </div>
</template>



