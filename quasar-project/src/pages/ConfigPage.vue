<template>
  <q-page class="row items-start justify-evenly">
    <div>
      <p>Config</p>

      <q-input v-model="sheetFullPath" label="Path to spreadsheet" />

      <q-btn>Save</q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'ConfigPage'
});

const sheetFullPath = ref('');
</script>
