<template>
    <form @submit.prevent="handleSubmit">
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
        <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
        />
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
        <a href="/auth/forgot-password" class="text-primary">Forgot Password?</a>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
    
  const username = ref('');
  const password = ref('');
  
  const handleSubmit = () => {
    router.push('/app/dashboard')
  };
</script>

<style>

</style>