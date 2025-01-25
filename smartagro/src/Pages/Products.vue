<template>
    <div class="container py-5">
      <h1 class="text-center mb-4">Our Products</h1>
  
      <!-- Original Products -->
      <h2 class="text-primary mb-3">Raw Products</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
          <div class="card h-100">
            <img :src="product.image" class="card-img-top" :alt="product.name" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.short }}</p>
              <p class="text-muted fw-bold">Price: {{ product.price }} XAF</p>
              <router-link
                :to="{ name: 'ProductSingle', params: { id: product.id } }"
                class="btn btn-primary"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Processed Products -->
      <h2 class="text-primary mt-5 mb-3">Processed Products</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="product in pro_products" :key="product.id">
          <div class="card h-100">
            <img :src="product.image" class="card-img-top" :alt="product.name" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.short }}</p>
              <p class="text-muted fw-bold">Price: {{ product.price }} XAF</p>
              <router-link
                :to="{ name: 'ProductSingle', params: { id: product.id } }"
                class="btn btn-primary"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import data from '../assets/data.js';
  
  const products = data.products; // Raw products
  const pro_products = data.pro_products; // Processed products
</script>

<style scoped>
  .card img {
    height: 200px;
    object-fit: cover;
  }
  
  h2 {
    color: #28a745;
  }
</style>
  