<template>
    <div class="products-container">
      <!-- Page Header -->
      <header class="products-header ">
        <div class="container d-flex align-items-center justify-content-between px-3 py-2">
            <h5 class="m-0">Products</h5>
            <button class="btn btn-primary btn-sm" @click="toggleProductModal">
            Add Product
            </button>
        </div>
      </header>
  
      <!-- Products List -->
      <div class="container products-list p-3">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card border rounded d-flex align-items-center p-3 mb-3"
        >
          <img
            :src="product.image"
            alt="Product Image"
            class="rounded me-3"
            width="130"
            height="130"
          />
          <div class="product-details flex-grow-1">
            <h6 class="mb-1">{{ product.name }}</h6>
            <p class="mb-1">
              <strong>Short:</strong> {{ product.short }}
              <br />
              <strong>Description:</strong> {{ product.description }}
            </p>
            <p class="mb-0">
              <strong>Price:</strong> XAF {{ product.price.toFixed(2) }}
              <br />
              <strong>Stock:</strong> {{ product.stock || 0 }}
            </p>
          <div class="product-actions">
            <button class="btn btn-sm btn-secondary me-2" @click="editProduct(product)">
              Edit
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">
              Delete
            </button>
          </div>
          </div>
        </div>
      </div>
  
      <!-- Add/Edit Product Modal -->
      <div v-if="showProductModal" class="product-modal">
        <div class="modal-content p-4">
          <h5>{{ editingProduct ? "Edit Product" : "Add Product" }}</h5>
          <form @submit.prevent="saveProduct">
            <div class="mb-3">
              <label for="productName" class="form-label">Name</label>
              <input
                type="text"
                id="productName"
                v-model="newProduct.name"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="productCategory" class="form-label">Category</label>
              <input
                type="text"
                id="productCategory"
                v-model="newProduct.category"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="productBrand" class="form-label">Brand</label>
              <input
                type="text"
                id="productBrand"
                v-model="newProduct.brand"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="productPrice" class="form-label">Price</label>
              <input
                type="number"
                id="productPrice"
                v-model="newProduct.price"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="productStock" class="form-label">Stock</label>
              <input
                type="number"
                id="productStock"
                v-model="newProduct.stock"
                class="form-control"
                required
              />
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-secondary me-2" type="button" @click="toggleProductModal">
                Cancel
              </button>
              <button class="btn btn-primary" type="submit">
                {{ editingProduct ? "Save Changes" : "Add Product" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { ref } from "vue";
  import data from '../../assets/data'

  const products = [...data.products, ...data.pro_products];
  
  const newProduct = ref({
    name: "",
    short: "",
    description: "",
    price: 0,
    stock: 0,
    image: "https://via.placeholder.com/100",
  });
  
  const showProductModal = ref(false);
  const editingProduct = ref(null);
  
  // Methods
  const toggleProductModal = () => {
    showProductModal.value = !showProductModal.value;
    if (!showProductModal.value) {
      editingProduct.value = null;
      resetNewProduct();
    }
  };
  
  const resetNewProduct = () => {
    newProduct.value = {
      name: "",
      category: "",
      brand: "",
      price: 0,
      stock: 0,
      image: "https://via.placeholder.com/100",
    };
  };
  
  const saveProduct = () => {
    if (editingProduct.value) {
      // Update existing product
      Object.assign(editingProduct.value, newProduct.value);
    } else {
      // Add new product
      products.value.push({
        id: products.value.length + 1,
        ...newProduct.value,
      });
    }
    toggleProductModal();
  };
  
  const editProduct = (product) => {
    editingProduct.value = product;
    Object.assign(newProduct.value, product);
    toggleProductModal();
  };
  
  const deleteProduct = (productId) => {
    products.value = products.value.filter((product) => product.id !== productId);
  };
</script>

<style scoped>
  .products-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .products-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  
  .products-list {
    flex: 2;
    overflow-y: auto;
  }
  
  .product-card {
    transition: background-color 0.3s ease;
  }
  
  .product-card:hover {
    background-color: #f8f9fa;
  }
  
  .product-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
</style>
  