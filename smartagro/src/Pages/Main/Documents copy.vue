<template>
    <div class="github-document-upload-container">
      <!-- Header -->
      <header class="github-document-upload-header px-3 py-2">
        <div class="container d-flex align-items-center justify-content-between">
          <h5 class="m-0">GitHub Document Upload</h5>
          <button class="btn btn-primary btn-sm" @click="fetchDocuments">Refresh</button>
        </div>
      </header>
  
      <!-- Main Content Row -->
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
                  <label for="documentPath" class="form-label">File Path in Repository</label>
                  <input
                    type="text"
                    id="documentPath"
                    v-model="documentPath"
                    class="form-control"
                    placeholder="e.g., docs/myfile.txt"
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
                      <strong>{{ doc.path }}</strong>
                    </div>
                    <a :href="doc.download_url" target="_blank" class="btn btn-sm btn-outline-primary">
                      View
                    </a>

                    <a href="#" class="btn btn-sm btn-outline-primary"
                    @click.prevent="viewDocument(doc.download_url, doc.name)"
                    >
                    View
                    </a>
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

  const viewDocument = async (url, name) => {
  try {
    // Fetch the file as binary data
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const mimeType = response.headers["content-type"];

    // Create a Blob from the binary data
    const blob = new Blob([response.data], { type: mimeType });

    // Create a temporary object URL for the Blob
    const blobURL = URL.createObjectURL(blob);

    // Handle the file based on its MIME type
    if (mimeType.startsWith("image/")) {
      // Open images directly in a new tab
      window.open(blobURL, "_blank");
    } else if (mimeType.startsWith("text/")) {
      // Open text files as plain text
      window.open(blobURL, "_blank");
    } else {
      // For other files, initiate a download
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = name; // Set the file name
      link.click();

      // Clean up after the download
      URL.revokeObjectURL(blobURL);
    }
  } catch (error) {
    console.error("Error viewing document:", error.message);
    alert("Failed to fetch the document. Please try again.");
  }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #dee2e6;
    margin-bottom: 5px;
    border-radius: 4px;
  }
  </style>
  