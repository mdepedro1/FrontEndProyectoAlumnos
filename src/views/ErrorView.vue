<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dni = route.query.dni ? Number(route.query.dni) : undefined
const msg = route.query.msg ? String(route.query.msg) : undefined

const dnierror = computed(() => {
      if (isNaN(Number(dni))) return 'nan'
      return 'valido'
    })
</script>

<template>
  <main>
    <h1>Vaya, algo ha ido mal</h1>
    <h2 v-if="msg">{{ msg }}</h2>
    <h2 v-if="dni !== undefined && dnierror==='nan'">El dni no puede ser texto</h2>
    <h2 v-if="dni !== undefined && dnierror==='valido'">No existe un alumno con dni {{ dni }}</h2>
  </main>
</template>

