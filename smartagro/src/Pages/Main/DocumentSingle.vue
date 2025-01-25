<template>
    <div class="document-viewer-container">
      <!-- Header -->
      <header class="document-viewer-header px-3 py-2">
        <div class="container d-flex align-items-center justify-content-between">
          <h5 class="m-0">GitHub Document Viewer</h5>
        </div>
      </header>
  
      <!-- Input Form -->
      <div class="container mt-4">
        <form @submit.prevent="fetchDocument">
          <div class="mb-3">
            <label for="documentPath" class="form-label">Document Path</label>
            <input
              type="text"
              id="documentPath"
              v-model="documentPath"
              class="form-control"
              placeholder="e.g., docs/myfile.txt"
              required
            />
          </div>
          <button class="btn btn-primary" type="submit">View Document</button>
        </form>
      </div>
  
      <!-- Document Display -->
      <div class="container mt-4">
        <div v-if="loading" class="text-center">
          <p>Loading document...</p>
        </div>
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>
        <div v-else-if="documentContent">
          <!-- Text Documents -->
          <div v-if="isTextDocument" class="text-document border rounded p-3">
            <pre>{{ documentContent }}</pre>
          </div>
          <!-- Images -->
          <div v-else-if="isImage" class="image-document">
            <img :src="documentContent" alt="Document" class="img-fluid" />
          </div>
          <!-- Unsupported Documents -->
          <div v-else class="alert alert-warning">
            <p>Unable to display this type of document. Please try downloading it.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
import endpoint from "../../helpers/endpoint";
  
  // States
  const documentPath = ref("");
  const documentContent = ref(null);
  const error = ref(null);
  const loading = ref(false);
  
  // Computed Properties
  const isTextDocument = computed(() => {
    return documentContent.value && typeof documentContent.value === "string";
  });
  const isImage = computed(() => {
    return documentContent.value && documentContent.value.startsWith("data:image");
  });
  
  // Fetch Document Function
  const fetchDocument = async () => {
    if (!documentPath.value) {
      error.value = "Document path is required.";
      return;
    }
  
    try {
      loading.value = true;
      error.value = null;
  
      const response = await axios.get(
        `${endpoint}/github/documents/${documentPath.value}`
      );
  
      if (response.data.content) {
        const mimeType = response.headers["content-type"];
        if (mimeType.startsWith("image/")) {
          // Convert content for images
          documentContent.value = `data:${mimeType};base64,${response.data.content}`;
        } else {
          // Handle text-based content
          documentContent.value = response.data.content;
        }
      } else {
        error.value = "No content found in the document.";
      }
    } catch (err) {
      error.value = err.response?.data?.message || "An error occurred while fetching the document.";
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .document-viewer-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .document-viewer-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  .text-document {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
    max-height: 500px;
  }
  .image-document img {
    max-width: 100%;
    border-radius: 5px;
  }
  </style>
  