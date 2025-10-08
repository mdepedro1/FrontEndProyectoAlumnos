<script setup lang="ts">


import router from '@/router';
import { modificarAlumno,getAlumnoByDni,crearAlumno,eliminarAlumno } from '@/services/alumnosService';
import {  type AlumnoDTO } from '@/types/alumnoDTO';
import { ViewMode} from '@/types/ViewMode';
import {ref, reactive,watch, onMounted, onBeforeMount} from 'vue'
import { RouterLink, useRoute } from 'vue-router';



    const props = defineProps<{
      //propiedad modo para saber en que modo estamos (modo vista,añadir,eliminar o modificar)
      modo: ViewMode
      //cuando quiero ver los datos de un alumno especifico, necesito el dni en la ruta, y lo recibo con una propiedad
      dni?:number
    }>()


    //
    //
    //importante para los siguientes dias
    //
    onBeforeMount(() => {
      viewMode.value = props.modo;
    });



    const route = useRoute()
    const dni = ref(props.dni !== undefined ? Number(props.dni) :
                route.params.dni !== undefined ? Number(route.params.dni) : null);

    console.log('dni recibido ',dni.value)

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
    const viewMode = ref<ViewMode>();

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
    /*
    const mostrarDatos=async()=>{
      console.log('dni mostrar ',dni.value)
      if(dni.value==null || isNaN(dni.value) || (dni.value===0 && props.dni)){
        router.push({ name: 'listaAlumnos' })
        return
      }
      try{

        const encontrado=await getAlumnoByDni(dni.value)
        if(encontrado && encontrado.nombre){
          alumno.nombre=encontrado.nombre
          alumno.edad=encontrado.edad
          mensaje.value=''
        }
      }catch(error){
        router.push({ name: 'listaAlumnos' })
        modificado.value=false
        eliminado.value=false
        console.error(error)
        alumno.nombre=''
        alumno.edad=0
        if (error instanceof Error) {
        mensaje.value = error.message
        }
      }
    }*/


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
        console.log('dni en el cargar: ', dni.value)
        if(!Number.isInteger(dni.value)||!dni.value || (dni.value<=0) || isNaN(dni.value)){
          router.push({
            name:'vistaError',
            query:{
              dni:dni.value
            }
          })
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
          const mensaje = error instanceof Error ? error.message : String(error);
          router.push({
            name:'vistaError',
            query:{
              dni:dni.value,
              msg:mensaje
            }
          })
        }

    }
    /* forma de hacer las funciones mas limpia
        async function guardarAlumno2(){

        }
    */

    //me defino una variable readonly, que con el watch, cada vez que cambie dependiendo de que en modo estemos me sirve para
    //decirle a los inputs si son de modo read only o no (en vez de ver si el viewmode es uno o otro todo el rato)
    const readonly = ref(false);
    watch(() =>route.query.mode,
      (nuevoModo) => {
        if(nuevoModo!==undefined){
          viewMode.value=Number(nuevoModo)
        }
      },


    )


    watch(viewMode, () => {
      if(viewMode.value == ViewMode.VER||viewMode.value==ViewMode.ELIMINAR){
        readonly.value = true;
      }else{
        readonly.value=false
      }
    })

    watch(
      () => route.params.dni,
      (nuevodni) => {
        if (nuevodni === undefined) {
          dni.value = null;
          alumno.dni=0
          alumno.nombre=''
          alumno.edad=0
          return;
        }
        console.log('pars ',nuevodni)
        const parsed = Number(nuevodni)
        console.log('pars ',parsed)
        if ( isNaN(parsed) || parsed <= 0) {
          router.push({
            name:'vistaError',
            query:{
              dni:nuevodni,
            }
          })
          return
        }

        dni.value = parsed
        cargarDatosAlumno()
      },

    )

    onMounted(()=>{
      console.log('entra aqui 1?')
      if(!(props.modo==ViewMode.AÑADIR)){
        console.log('entra aqui 2?')
        if(dni.value !== null && dni.value!==0  ){
          if(isNaN(dni.value)){
              router.push({
            name:'vistaError',
            query:{
              dni:dni.value,
            }
          })
          }
          console.log('entra aqui 3?')
          cargarDatosAlumno()
        }
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
        <input class="entradas" type="number" id="dni" v-model="alumno.dni" :readonly="readonly||(dni ?? 0)>0   "  required />

      </div>
      <div >
        <label for="nombre">Nombre:</label>
        <input class="entradas" type="text" id="nombre" v-model="alumno.nombre"  :readonly="readonly" required />
      </div>
      <div >
        <label for="edad">Edad:</label>
        <input  class="entradas" type="number" id="edad" v-model="alumno.edad" :readonly="readonly" required />
      </div>
      <button  class="boton" v-if="!(modo==ViewMode.VER)" type="submit">{{props.modo==ViewMode.AÑADIR ? 'Añadir Alumno' : props.modo==ViewMode.ELIMINAR  ? 'Eliminar Alumno' : 'Modificar alumno'}}</button>

      <div v-if="modo==ViewMode.VER" style="display: flex; flex-direction: row; gap: 10px;">
        <RouterLink :to="{name: 'detalleAlumno',params:{dni:alumno.dni},query:{mode:ViewMode.MODIFICAR}}"
          class="boton" >Modificar alumno</RouterLink>
        <RouterLink :to="{name: 'detalleAlumno',params:{dni:alumno.dni},query:{mode:ViewMode.ELIMINAR}}"
          class="boton">Eliminar alumno</RouterLink>

      </div>

      <div  style="display: flex; flex-direction: row; gap: 10px;padding-top: 8px;">
          <RouterLink :to="{name: 'listaAlumnos'}"
          class="boton">Cancelar</RouterLink>
      </div>





    </form>
    <p v-if="modificado||guardado||eliminado" style="color: green;">{{ mensaje }}</p>
    <p v-else style="color: red;">{{ mensaje }}</p>
  </div>
</template>


