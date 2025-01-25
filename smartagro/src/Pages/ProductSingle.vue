<template>
  <div class="container py-5">
    <div class="row">
      <!-- Product Image -->
      <div class="col-md-6">
        <img :src="product.image" :alt="product.name" class="img-fluid rounded shadow-sm" />
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <h1 class="display-5 fw-bold">{{ product.name }}</h1>
        <p class="text-muted mb-3">{{ product.short }}</p>
        <p class="text-muted fw-bold">Price: {{ product.price }} XAF</p>
        <p>{{ product.description }}</p>

        <!-- Actions -->
        <div class="mt-4">
          <button class="btn btn-primary btn-lg me-2">Add to Cart</button>
          <!-- <button class="btn btn-outline-secondary btn-lg" @click="goBack">Back to Products</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import data from '../assets/data.js';

const route = useRoute();
const productId = parseInt(route.params.id); // Get the product ID from the route

// Find the product by ID from both arrays
const product = computed(() =>
  [...data.products, ...data.pro_products].find((item) => item.id === productId)
);
</script>

<style scoped>
/* Styling as before */
img {
  object-fit: cover;
  max-height: 400px;
}

h1 {
  color: #28a745;
}

.btn {
  padding: 10px 20px;
}
</style>
