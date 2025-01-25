<template>
    <form @submit.prevent="handleVerifyOtp">
      <div class="mb-3">
        <label for="otp" class="form-label">Enter OTP</label>
        <input
          type="number"
          id="otp"
          v-model="otp"
          class="form-control"
          placeholder="Enter the OTP sent to your username"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Verify OTP</button>
    </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const otp = ref('');
  
  const handleVerifyOtp = () => {
    router.push('/auth/reset-password')
  };
</script>

<style>
</style>
  