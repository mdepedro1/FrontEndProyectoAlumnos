<script setup lang="ts">


import { modificarAlumno,getAlumnoByDni,crearAlumno } from '@/services/alumnosService';
import {  type AlumnoDTO } from '@/types/alumnoDTO';
import { ViewMode} from '@/types/ViewMode';
import {ref, reactive} from 'vue'

    const props = defineProps<{
      modo: ViewMode
    }>()

    const alumno = reactive <AlumnoDTO>({
      dni:0,
      nombre: '',
      edad:0
    });
    const mensaje=ref('');
    const modificado=ref(false);
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

    const modify=async() =>{
      try{
        await modificarAlumno(alumno.dni,alumno)
        mensaje.value='Alumno modificado correctamente'
        modificado.value=true;
      }
      catch(error){
        modificado.value=false
        console.error(error)
        if (error instanceof Error) {
        mensaje.value = error.message
        }

      }
    };

    const mostrarDatos=async()=>{
      try{
        const encontrado=await getAlumnoByDni(alumno.dni)
        if(encontrado && encontrado.nombre){
          alumno.nombre=encontrado.nombre
          alumno.edad=encontrado.edad
          mensaje.value=''
        }
      }catch(error){
        modificado.value=false
        console.error(error)
        alumno.nombre=''
        alumno.edad=0
        if (error instanceof Error) {
        mensaje.value = error.message
        }
      }
    }
    const elegirMetodo=async()=>{
      if(props.modo==ViewMode.AÑADIR){
        await guardarAlumno()
      }
      else if(props.modo==ViewMode.MODIFICAR){
        await modify()
      }
    }


</script>






<template>
  <div class="modifyAlumno">
    <form @submit.prevent="elegirMetodo">
      <div>
        <label for="dni">DNI:</label>
        <input class="entradas" type="number" id="dni" v-model="alumno.dni"  required />
        <button v-if="props.modo==ViewMode.MODIFICAR" @click.prevent="mostrarDatos">Mostrar datos del alumno</button>
      </div>
      <div >
        <label for="nombre">Nombre:</label>
        <input class="entradas" type="text" id="nombre" v-model="alumno.nombre"  required />
      </div>
      <div >
        <label for="edad">Edad:</label>
        <input  class="entradas" type="number" id="edad" v-model="alumno.edad" required />
      </div>
      <button  class="boton" type="submit">{{props.modo==ViewMode.AÑADIR ? 'Añadir Alumno' :'Modificar alumno'}}</button>
    </form>
    <p v-if="modificado||guardado" style="color: green;">{{ mensaje }}</p>
    <p v-else style="color: red;">{{ mensaje }}</p>
  </div>
</template>

<style>
  button{
    display: block;
    border-radius: 8px;
    background-color: cadetblue ;
    color: white;

  }
</style>
