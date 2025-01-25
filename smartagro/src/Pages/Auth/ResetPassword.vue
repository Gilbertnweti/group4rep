<template>
    <form @submit.prevent="handleResetPassword">
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          class="form-control"
          placeholder="Enter your new password"
          required
        />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          class="form-control"
          placeholder="Confirm your new password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Reset Password</button>
    </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  const handleResetPassword = () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('Passwords do not match!');
      return;
    }
    router.push('/auth/login')
  };
</script>

<style>
</style>
  