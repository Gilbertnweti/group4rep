<template>
    <div class="github-document-upload-container">
      <!-- Header -->
      <header class="github-document-upload-header px-3 py-2">
        <div class="container d-flex align-items-center justify-content-between">
          <h5 class="m-0">GitHub Document Upload</h5>
          <button class="btn btn-primary btn-sm" @click="fetchDocuments">Refresh</button>
        </div>
      </header>
  
      <!-- Breadcrumb Navigation -->
      <nav aria-label="breadcrumb" class="mt-3">
        <ol class="breadcrumb container">
          <li
            v-for="(crumb, index) in breadcrumbs"
            :key="index"
            class="breadcrumb-item"
            :class="{ active: index === breadcrumbs.length - 1 }"
            aria-current="page"
          >
            <a v-if="index !== breadcrumbs.length - 1" href="#" @click.prevent="navigateTo(crumb.path)">
              {{ crumb.name }}
            </a>
            <span v-else>{{ crumb.name }}</span>
          </li>
        </ol>
      </nav>
  
      <!-- Main Content -->
      <div class="container mt-4">
        <div class="row">
          <!-- Upload Form (col-3) -->
          <div class="col-12 col-md-3">
            <div class="form-container p-3 border bg-light my-2 rounded">
              <h6>Upload Document</h6>
              <form @submit.prevent="uploadDocument">
                <div class="mb-3">
                  <label for="documentFile" class="form-label">Select File</label>
                  <input
                    type="file"
                    id="documentFile"
                    @change="handleFileInput"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="documentPath" class="form-label">File/Directory Path in Repository</label>
                  <input
                    type="text"
                    id="documentPath"
                    v-model="documentPath"
                    class="form-control"
                    placeholder="e.g., docs/myfile.txt or docs/subfolder/"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="commitMessage" class="form-label">Commit Message</label>
                  <input
                    type="text"
                    id="commitMessage"
                    v-model="commitMessage"
                    class="form-control"
                    placeholder="e.g., Adding a new document"
                    required
                  />
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary" type="submit" :disabled="isUploading">
                    <span v-if="isUploading">Uploading...</span>
                    <span v-else>Upload</span>
                  </button>
                </div>
              </form>
  
              <!-- Success/Error Messages -->
              <div v-if="message" :class="['mt-3 alert', message.type === 'success' ? 'alert-success' : 'alert-danger']">
                {{ message.text }}
              </div>
            </div>
          </div>
  
          <!-- Document List (col-9) -->
          <div class="col-12 col-md-9">
            <div class="document-list-container p-3 border rounded">
              <h6>Uploaded Documents</h6>
              <ul class="list-group mt-3">
                <li v-for="doc in uploadedDocuments" :key="doc.sha" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>
                        <span v-if="doc.type === 'file'">📄</span>
                        <span v-else-if="doc.type === 'dir'">..📁</span>
                        {{ doc.path }}
                      </strong>
                    </div>
                    <div>
                      <a
                        v-if="doc.type === 'file'"
                        :href="doc.download_url"
                        target="_blank"
                        class="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                      <button
                        v-if="doc.type === 'dir'"
                        @click="fetchDirectoryContents(doc.path)"
                        class="btn btn-sm btn-warning"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </li>
                <li v-if="uploadedDocuments.length === 0" class="list-group-item text-muted">
                  No documents uploaded yet.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  // States
  const file = ref(null);
  const documentPath = ref("");
  const commitMessage = ref("");
  const isUploading = ref(false);
  const uploadedDocuments = ref([]);
  const message = ref(null);
  const breadcrumbs = ref([{ name: "Root", path: "" }]);
  
  // API Base URL
  const API_BASE_URL = "http://localhost:3000/api/github";
  
  // Handle File Input
  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      file.value = selectedFile;
    }
  };
  
  // Upload Document to GitHub
  const uploadDocument = async () => {
    if (!file.value || !documentPath.value || !commitMessage.value) {
      message.value = { type: "danger", text: "All fields are required." };
      return;
    }
  
    try {
      isUploading.value = true;
  
      // Prepare the form data for the file upload
      const formData = new FormData();
      formData.append("file", file.value);
      formData.append("filePath", documentPath.value);
      formData.append("commitMessage", commitMessage.value);
  
      // Send file to the server
      const response = await axios.post(`${API_BASE_URL}/documents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Update the uploaded documents list
      uploadedDocuments.value.push(response.data);
  
      // Success message
      message.value = { type: "success", text: "Document uploaded successfully!" };
  
      // Reset form
      file.value = null;
      documentPath.value = "";
      commitMessage.value = "";
    } catch (error) {
      console.error("Error uploading document:", error.message);
      message.value = { type: "danger", text: "Failed to upload document. Please try again." };
    } finally {
      isUploading.value = false;
    }
  };
  
  // Fetch Uploaded Documents
  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/documents`);
      uploadedDocuments.value = response.data;
    } catch (error) {
      console.error("Error fetching documents:", error.message);
      message.value = { type: "danger", text: "Failed to fetch documents. Please try again." };
    }
  };
  
  // Fetch Directory Contents
  const fetchDirectoryContents = async (directoryPath) => {
    try {
        console.log(directoryPath);
        
      const response = await axios.get(`${API_BASE_URL}/documents`, {
        params: { path: directoryPath },
      });
      uploadedDocuments.value = response.data;
  
      // Update breadcrumbs
      breadcrumbs.value.push({ name: directoryPath.split("/").pop(), path: directoryPath });
      
    } catch (error) {
      console.error("Error fetching directory contents:", error.message);
      message.value = { type: "danger", text: "Failed to fetch directory contents. Please try again." };
    }
  };
  
  // Navigate to a breadcrumb
  const navigateTo = async (path) => {
    breadcrumbs.value = breadcrumbs.value.filter((crumb) => crumb.path === "" || crumb.path === path);
    await fetchDirectoryContents(path);
  };
  
  // Fetch documents on component mount
  onMounted(() => {
    fetchDocuments();
  });
  </script>
  
  <style scoped>
  .github-document-upload-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .github-document-upload-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  .form-container {
    background-color: #ffffff;
  }
  .document-list-container {
    background-color: #ffffff;
  }
  .list-group-item {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    padding: 10px;
    border: 1px solid #dee2e6;
    margin-bottom: 5px;
    border-radius: 4px;
  }
  </style>
  