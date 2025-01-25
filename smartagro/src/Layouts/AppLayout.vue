<template>
    <div>
      <!-- Main Navigation -->
      <MainNav />
  
      <!-- Menu below Main Navigation -->
      <Menu />
  
      <!-- Dashboard Content -->
      <main class="main">
        <router-view />
      </main>
  
      <!-- Footer -->
      <footer class="bg-light text-center py-3">
        <p class="m-0">&copy; 2025 Smart AgroLTD. All rights reserved.</p>
      </footer>
    </div>
</template>

<script setup>
  import MainNav from '../components/MainNav.vue';
  import Menu from '../components/Menu.vue';
</script>
  