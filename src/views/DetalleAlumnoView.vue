<script setup lang="ts">
import AlumnoEditorForm from '@/components/AlumnoEditorForm.vue'
import { ViewMode } from '@/types/ViewMode';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const props = defineProps<{
      //defino la propiedad aqui porque en el router.index le digo que el componente DetalleAlumnoView es el que recibe el dni a través
      // de la ruta. Tal y como lo estaba haciendo, el dni llegaba aquí y como es en AlumnoEditorForm donde intento usar el dni me aparece
      // como undefined
      dni?:string|number
      mode?:number
    }>()
const dni=Number(props.dni ?? 0)
const modo = computed(() => Number(route.query.mode ?? ViewMode.VER))
onMounted(()=>{
      console.log('props',props.dni)
      console.log('dni',dni)
    })
</script>

<template>
  <main>
      <AlumnoEditorForm :modo="modo"  :dni="dni"  />
  </main>
</template>

