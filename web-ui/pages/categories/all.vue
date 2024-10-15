<template>
  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const runtimeConfig = useRuntimeConfig();

const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>');
const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>
