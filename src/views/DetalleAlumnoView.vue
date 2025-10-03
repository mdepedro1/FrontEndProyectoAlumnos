<script setup lang="ts">
import AlumnoEditorForm from '@/components/AlumnoEditorForm.vue'
import { ViewMode } from '@/types/ViewMode';
import { onMounted } from 'vue';

const props = defineProps<{
      //defino la propiedad aqui porque en el router.index le digo que el componente DetalleAlumnoView es el que recibe el dni a través
      // de la ruta. Tal y como lo estaba haciendo, el dni llegaba aquí y como es en AlumnoEditorForm donde intento usar el dni me aparece
      // como undefined
      dni?:string|number
    }>()
const dni=Number(props.dni ?? 0)
onMounted(()=>{
      console.log('props',props.dni)
      console.log('dni',dni)
    })
</script>

<template>
  <main>
      <AlumnoEditorForm :modo="ViewMode.VER"  :dni="dni"  />
  </main>
</template>

