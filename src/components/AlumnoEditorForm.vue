<script setup lang="ts">


import { modificarAlumno,getAlumnoByDni,crearAlumno,eliminarAlumno } from '@/services/alumnosService';
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
    const eliminado=ref(false);
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
        eliminado.value=false
        console.error(error)
        alumno.nombre=''
        alumno.edad=0
        if (error instanceof Error) {
        mensaje.value = error.message
        }
      }
    }

    const deleteAlumno=async()=>{
        try{
          await eliminarAlumno(alumno.dni)
          mensaje.value='Alumno eliminado correctamente'
          eliminado.value=true
        }
        catch(error){
          eliminado.value=false
          console.error(error)
          if(error instanceof Error){
              mensaje.value=error.message
          }
          alumno.nombre=''
          alumno.edad=0

        }
    }

    const elegirMetodo=async()=>{
      if(props.modo==ViewMode.AÑADIR){
        await guardarAlumno()
      }
      else if(props.modo==ViewMode.MODIFICAR){
        await modify()
      }
      else if(props.modo==ViewMode.ELIMINAR){
        await deleteAlumno()
      }
    }


</script>



<template>
  <div class="modifyAlumno">
    <form @submit.prevent="elegirMetodo">
      <div>
        <label for="dni">DNI:</label>
        <input class="entradas" type="number" id="dni" v-model="alumno.dni"  required />
        <button v-if="props.modo==ViewMode.MODIFICAR||props.modo==ViewMode.ELIMINAR" @click.prevent="mostrarDatos">Mostrar datos del alumno</button>
      </div>
      <div >
        <label for="nombre">Nombre:</label>
        <input class="entradas" type="text" id="nombre" v-model="alumno.nombre"  :readonly="modo==ViewMode.ELIMINAR" required />
      </div>
      <div >
        <label for="edad">Edad:</label>
        <input  class="entradas" type="number" id="edad" v-model="alumno.edad" :readonly="modo==ViewMode.ELIMINAR" required />
      </div>
      <button  class="boton" type="submit">{{props.modo==ViewMode.AÑADIR ? 'Añadir Alumno' : props.modo==ViewMode.ELIMINAR ? 'Eliminar Alumno' : 'Modificar alumno'}}</button>
    </form>
    <p v-if="modificado||guardado||eliminado" style="color: green;">{{ mensaje }}</p>
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
