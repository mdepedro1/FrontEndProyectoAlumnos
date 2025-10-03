<script setup lang="ts">


import router from '@/router';
import { modificarAlumno,getAlumnoByDni,crearAlumno,eliminarAlumno } from '@/services/alumnosService';
import {  type AlumnoDTO } from '@/types/alumnoDTO';
import { ViewMode} from '@/types/ViewMode';
import {ref, reactive, onMounted,computed, watch} from 'vue'
import { RouterLink, useRoute } from 'vue-router';

    const props = defineProps<{
      //propiedad modo para saber en que modo estamos (modo vista,añadir,eliminar o modificar)
      modo: ViewMode
      //cuando quiero ver los datos de un alumno especifico, necesito el dni en la ruta, y lo recibo con una propiedad
      dni?:number
    }>()

    const rutaConParametro = computed(() => {
      if (props.modo === ViewMode.MODIFICAR) return 'modifyAlumnoWithParam'
      return 'deleteAlumnoWithParam'
    })

    const route = useRoute()
    const dni = ref(Number(props.dni ?? route.params.dni ?? 0))


    const alumno = reactive <AlumnoDTO>({
      dni:0,
      nombre: '',
      edad:0
    });

    console.log('ruta con dni :', route.path,'   ',dni.value)

    console.log(route.fullPath)
    console.log(dni.value)

    const mensaje=ref('');
    const modificado=ref(false);
    const guardado=ref(false);
    const eliminado=ref(false);

    //Metodo para añadir alumno (ViewMode=AÑADIR)
    const guardarAlumno=async() =>{
      try{
        await crearAlumno(alumno)
        mensaje.value='Alumno guardado correctamente'
        guardado.value=true;

        alumno.dni=0
        alumno.edad=0
        alumno.nombre=''
        setTimeout(() => {
            router.push({ name: 'listaAlumnos' })
          }, 2000)
      }
      catch(error){
        guardado.value=false
        console.error(error)
        if (error instanceof Error) {
        mensaje.value = error.message
        }

      }
    };

    //Metodo para añadir alumno (ViewMode=MODIFICAR)
    const modify=async() =>{
      try{
        await modificarAlumno(alumno.dni,alumno)
        mensaje.value='Alumno modificado correctamente'
        modificado.value=true;
        setTimeout(() => {
            router.push({ name: 'listaAlumnos' })
          }, 2000)
      }
      catch(error){
        modificado.value=false
        console.error(error)
        if (error instanceof Error) {
        mensaje.value = error.message
        }

      }
    };

    // Método para evento click del boton mostrar datos del alumno
    //Con la modificacion de que haya un unico viewmode para eliminar y modificar, este metodo me sobra
    //porque cuando hago clic en el router-link de mostrar datos da un dni, y se carga la nueva pagina
    // como hay dni se ejecuta en el onmounted cargardatos alumno (la condicion para que se ejecute es que no sea viewmode añadir y que el dni este presente)
    /*
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
      */

    //Metodo para añadir alumno (ViewMode=ELIMINAR)
    const deleteAlumno=async()=>{
        try{
          await eliminarAlumno(alumno.dni)
          mensaje.value='Alumno eliminado correctamente'
          eliminado.value=true
          setTimeout(() => {
            router.push({ name: 'listaAlumnos' })
          }, 2000)

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

    //Metodo para añadir alumno (ViewMode=VER)
    const cargarDatosAlumno=async()=>{

        if(!Number.isInteger(dni.value)||!dni.value || (dni.value<=0)){
          router.push('/')
          return
        }
        try{
          console.log('entro aqui')
          const alumnoencontrado=await getAlumnoByDni(dni.value)
          alumno.nombre=alumnoencontrado.nombre
          alumno.edad=alumnoencontrado.edad
          alumno.dni=alumnoencontrado.dni
        }
        catch(error){
          console.error('Error al cargar el alumno',error)
          router.push('/')
        }

    }
    watch(
      () =>route.params.dni,
      (nuevodni)=>{
         dni.value = Number(nuevodni ?? 0)
         if(dni.value>0){
            cargarDatosAlumno()
         }

      },
      {immediate:true}
    )
    onMounted(()=>{
      if(!(props.modo==ViewMode.AÑADIR) && props.dni && dni.value>0 ){
        cargarDatosAlumno()
      }
    })

    //Metodo para  saber que funcion hay que usar
    const elegirMetodo=async()=>{
      if(props.modo==ViewMode.AÑADIR){
        await guardarAlumno()

      }
      else if(props.modo==ViewMode.MODIFICAR ){
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
        <input class="entradas" type="number" id="dni" v-model="alumno.dni" :readonly="modo==ViewMode.VER||dni>0   "  required />
        <RouterLink class="mostrarDatos" :to="{name: rutaConParametro,params:{dni:alumno.dni}}"
        v-if="dni <=0&&(props.modo==ViewMode.MODIFICAR  ||props.modo==ViewMode.ELIMINAR)"
         >
          Mostrar datos del alumno
        </RouterLink>
      </div>
      <div >
        <label for="nombre">Nombre:</label>
        <input class="entradas" type="text" id="nombre" v-model="alumno.nombre"  :readonly="modo==ViewMode.ELIMINAR||modo==ViewMode.VER" required />
      </div>
      <div >
        <label for="edad">Edad:</label>
        <input  class="entradas" type="number" id="edad" v-model="alumno.edad" :readonly="modo==ViewMode.ELIMINAR||modo==ViewMode.VER" required />
      </div>
      <button  class="boton" v-if="!(modo==ViewMode.VER)" type="submit">{{props.modo==ViewMode.AÑADIR ? 'Añadir Alumno' : props.modo==ViewMode.ELIMINAR  ? 'Eliminar Alumno' : 'Modificar alumno'}}</button>

      <div v-if="modo==ViewMode.VER" style="display: flex; flex-direction: row; gap: 10px;">
        <RouterLink :to="{name: 'modifyAlumnoWithParam',params:{dni:alumno.dni}}"
          class="boton" >Modificar alumno</RouterLink>
        <RouterLink :to="{name: 'deleteAlumnoWithParam',params:{dni:alumno.dni}}"
          class="boton">Eliminar alumno</RouterLink>
      </div>





    </form>
    <p v-if="modificado||guardado||eliminado" style="color: green;">{{ mensaje }}</p>
    <p v-else style="color: red;">{{ mensaje }}</p>
  </div>
</template>

<style>
  .mostrarDatos{
    display: block;
    width: 25%;
    font-size: 13px;
    border-radius: 8px;
    background-color: cadetblue ;
    color: white;

  }
</style>
