<script setup lang="ts">
import CamposAlumno from '@/components/CamposAlumno.vue';
import { ViewMode } from '@/types/ViewMode';
</script>

<template>
  <main>
    <CamposAlumno :modo="ViewMode.MODIFICAR" />
  </main>
</template>
