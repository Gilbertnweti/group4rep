<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center" href="/">
          <img :src="logo" alt="Smart AgroLTD Logo" height="50" class="me-2" />
          <h1 class="h5 m-0 d-none d-md-inline">Smart AgroLTD</h1>
        </a>

        <!-- Toggler for Mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas Menu for Mobile -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a href="/" class="nav-link" :class="{ 'text-primary': activeLink === 'home' }">Home</a>
              </li>
              <li class="nav-item">
                <a href="/products" class="nav-link" :class="{ 'text-primary': activeLink === 'products' }">Products</a>
              </li>
              <li class="nav-item">
                <a href="/auth/login" class="nav-link" :class="{ 'text-primary': activeLink === 'login' }">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import logo from "../assets/images/smartlogo.png";

const activeLink = 'home'; // Dynamically set based on the route
</script>

<style scoped>
.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-nav .nav-link {
  color: #000;
  font-size: 1rem;
}

.nav-link.text-primary {
  font-weight: bold;
}

.offcanvas {
  background-color: #f8f9fa;
}
</style>
