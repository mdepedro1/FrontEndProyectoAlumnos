<script setup lang="ts">
import AlumnoEditorForm from '@/components/AlumnoEditorForm.vue'
import { ViewMode } from '@/types/ViewMode';

</script>

<template>
  <main>
      <AlumnoEditorForm :modo="ViewMode.VER"  />
  </main>
</template>

