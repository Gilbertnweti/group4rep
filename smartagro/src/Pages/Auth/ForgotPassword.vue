<template>
    <form @submit.prevent="handleForgotPassword">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
          placeholder="Enter your username"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Send OTP</button>
    </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const username = ref('');

  const router = useRouter();
  
  const handleForgotPassword = () => {
    router.push('/auth/otp-code');
  };
</script>

<style>
</style>
  