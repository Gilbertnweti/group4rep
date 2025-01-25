<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center" href="/">
          <img :src="logo" alt="Smart AgroLTD Logo" height="40" class="me-2" />
          <span class="fw-bold d-none d-md-inline">Smart AgroLTD</span>
        </a>
  
        <!-- Right Icons -->
        <div class="d-flex align-items-center">
          <!-- Notifications -->
          <div class="dropdown me-3">
            <a
              class="dropdown-toggle"
              type="button"
              id="notificationsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-bell fs-4"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
              <li><a class="dropdown-item" href="#">Notification 1</a></li>
              <li><a class="dropdown-item" href="#">Notification 2</a></li>
              <li><a class="dropdown-item" href="#">Notification 3</a></li>
            </ul>
          </div>
  
          <!-- Profile -->
          <div class="dropdown">
            <a
              class="dropdown-toggle"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle fs-4"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </div>
  
          <!-- Toggle Button for Small Screens -->
          <button
            class="ms-3 navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#responsiveMenu"
            aria-controls="responsiveMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
</template>

<script setup>
  import logo from '../assets/images/smartlogo.png';
</script>

<style scoped>
  .navbar-brand span {
    font-size: 1.25rem;
  }
</style>
  