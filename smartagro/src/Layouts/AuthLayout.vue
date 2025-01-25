<template>
    <div class="auth-container">
      <div class="auth-card">
        <div class="text-center mb-4">
          <img :src="logo" alt="Smart AgroLTD Logo" class="auth-logo" />
        </div>
        <router-view/>
      </div>
    </div>
</template>

<script setup>
  import { ref } from 'vue';
  import logo from '../assets/images/smartlogo.png';
  
  const username = ref('');
  const password = ref('');
  
  const handleSubmit = () => {
    alert(`Logging in as: ${username.value}`);
  };
  </script>
  
  <style scoped>
  /* Background */
  .auth-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(135, 206, 250, 0.4), rgba(176, 224, 230, 0.4));
    backdrop-filter: blur(10px);
  }
  
  /* Auth Card */
  .auth-card {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  /* Logo */
  .auth-logo {
    width: 100px;
  }
  
  /* Form Input Styling */
  .form-control {
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1rem;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
    padding: 0.75rem;
    font-size: 1rem;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
</style>
  