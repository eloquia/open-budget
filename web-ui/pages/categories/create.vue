<template>
  <h1>Create Category</h1>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const runtimeConfig = useRuntimeConfig();

const supabase = createClient(`https://${runtimeConfig.supabaseProjectId}.supabase.co`, runtimeConfig.supabaseAnonKey);
const categories = ref([]);

async function getCountries() {
  const { data } = await supabase.from('categories').select()
  categories.value = data
};

</script>
