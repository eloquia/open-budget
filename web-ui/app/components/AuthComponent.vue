<script setup>
const supabase = useSupabaseClient()

const showSignUp = ref(true)
const signUpEmailAddress = ref('')
const signUpPassword = ref('')
const signUpPasswordConfirmation = ref('')
const signUpError = ref(null)
const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

async function registerUser() {
  try {
    const { _, error } = await supabase.auth.signUp({
      email: signUpEmailAddress.value,
      password: signUpPassword.value,
    })
    if (error) {
      throw error
    } else {
      signUpError.value = null
    }

    // successMsg.value = "Check your email for confirmation"
  } catch (error) {
    signUpError.value = error
    console.warn(error)
  }
}
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div
      v-if="showSignUp"
      class="border-solid border-black dark:border-gray-700 rounded p-8"
    >
      <form
        class="row flex-center flex mb-8"
        @submit.prevent="registerUser"
      >
        <div class="col-6 form-widget flex flex-col gap-4">
          <h1 class="w-full self-center header">
            Ija
          </h1>
          <p class="description">
            Sign up with your email address
          </p>
          <div>
            <UInput
              v-model="signUpEmailAddress"
              class="inputField"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div>
            <UInput
              v-model="signUpPassword"
              class="inputField"
              type="password"
              placeholder="Your password"
            />
          </div>
          <div>
            <UInput
              v-model="signUpPasswordConfirmation"
              class="inputField"
              type="password"
              placeholder="Confirm your password"
            />
          </div>
          <div>
            <UButton
              type="submit"
              class="button block w-full"
              label="Sign Up"
              :disabled="loading || signUpPassword.value !== signUpPasswordConfirmation.value"
            />
          </div>
        </div>
      </form>

      <p v-if="signUpError" class="text-red-500">
        {{ signUpError }}
      </p>

      <UButton
        color="gray"
        variant="link"
        size="sm"
        @click="showSignUp = false"
      >
        Already have an account? Login
      </UButton>
    </div>

    <div v-else>
      <form
        class="row flex-center flex"
        @submit.prevent="handleLogin"
      >
        <div class="col-6 form-widget">
          <h1 class="w-full self-center header">
            Ija Money
          </h1>
          <p class="description">
            Sign in via magic link with your email below
          </p>
          <div>
            <input
              v-model="email"
              class="inputField"
              type="email"
              placeholder="Your email"
            >
          </div>
          <div>
            <input
              type="submit"
              class="button block"
              :value="loading ? 'Loading' : 'Send magic link'"
              :disabled="loading"
            >
          </div>
        </div>
      </form>

      <UButton
        color="gray"
        variant="link"
        size="sm"
        @click="showSignUp = false"
      >
        Don't have an account? Sign up
      </UButton>
    </div>
  </div>
</template>
