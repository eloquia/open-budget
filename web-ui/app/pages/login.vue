<script setup lang="ts">
import { ref } from 'vue'

const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3003/confirm'
    }
  })
  if (error) console.log(error)
}
</script>

<template>
  <div>
    <UButton @click="signInWithOtp">
      Sign In with E-Mail
    </UButton>
    <input
      v-model="email"
      type="email"
    >
  </div>
</template>
