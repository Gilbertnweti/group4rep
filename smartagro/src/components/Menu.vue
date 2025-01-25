<template>
    <div>
      <!-- Responsive Menu -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom py-2">
        <div class="container">
          <!-- Collapsible Menu -->
          <div class="collapse navbar-collapse" id="responsiveMenu">
            <ul class="navbar-nav d-flex justify-content-between w-100">
              <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/app/tasks">Tasks</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/app/documents">Documents</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/app/employees">Employees</a>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/app/transactions">Transactions</a>
              </li> -->
              <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/app/chat">Chat</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .navbar-brand {
    font-size: 1.25rem;
  }
  .nav-link {
    text-decoration: none;
  }
  </style>