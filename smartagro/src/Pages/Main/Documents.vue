<template>
    <div class="github-document-upload-container">
      <!-- Header -->
      <header class="github-document-upload-header px-3 py-2">
        <div class="container d-flex align-items-center justify-content-between">
          <h5 class="m-0">GitHub Document Management</h5>
          <button class="btn btn-primary btn-sm" @click="fetchDocuments">Refresh</button>
        </div>
      </header>
  
      <!-- Main Content -->
      <div class="container-fluid mt-3 ">
        <div class="row">
          <!-- Left Pane: Directory Management -->
          <div class="col-12  col-lg-3 bg-light border-end p-3">
            <h6 class="mb-4">Directory Management</h6>
  
            <!-- Create Directory Form -->
            <form @submit.prevent="createDirectory" class="mb-4">
              <div class="mb-3">
                <label for="directoryName" class="form-label">Directory Name</label>
                <input
                  type="text"
                  id="directoryName"
                  v-model="directoryName"
                  class="form-control"
                  placeholder="e.g., new-folder"
                  required
                />
              </div>
              <button class="btn btn-primary w-100" type="submit" :disabled="isUploading">
                <span v-if="isUploading">Creating...</span>
                <span v-else>Create Directory</span>
              </button>
            </form>
  
            <!-- Breadcrumb Navigation -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li
                  v-for="(crumb, index) in breadcrumbs"
                  :key="index"
                  class="breadcrumb-item"
                  :class="{ active: index === breadcrumbs.length - 1 }"
                >
                  <a
                    v-if="index !== breadcrumbs.length - 1"
                    href="#"
                    @click.prevent="navigateTo(crumb.path)"
                  >
                    {{ crumb.name }}
                  </a>
                  <span v-else>{{ crumb.name }}</span>
                </li>
              </ol>
            </nav>
          </div>
  
          <!-- Right Pane: File Management -->
          <div class="col-12  col-lg-9 p-3">
            <h6>File Management</h6>
  
            <!-- Upload File Form -->
            <form @submit.prevent="uploadDocument" class="mb-4" v-if="selectedDirectory">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label for="documentFile" class="form-label">Select File</label>
                  <input
                    type="file"
                    id="documentFile"
                    @change="handleFileInput"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-12 col-md-6">
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
              </div>
              <button
                class="btn btn-primary mt-3 w-100"
                type="submit"
                :disabled="isUploading || !selectedDirectory"
              >
                <span v-if="isUploading">Uploading...</span>
                <span v-else>Upload File</span>
              </button>
            </form>
  
            <!-- File/Directory List -->
            <div>
              <ul class="list-group">
                <li
                  v-for="doc in uploadedDocuments"
                  :key="doc.sha"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>
                      <span v-if="doc.type === 'file'">📄</span>
                      <span v-else-if="doc.type === 'dir'">📁</span>
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
import endpoint from "../../helpers/endpoint";

// States
const file = ref(null);
const directoryName = ref("");
const selectedDirectory = ref("");
const commitMessage = ref("");
const isUploading = ref(false);
const uploadedDocuments = ref([]);
const message = ref(null);
const breadcrumbs = ref([{ name: "Root", path: "" }]);

// API Base URL
const API_BASE_URL = endpoint + "/github";

// Handle File Input
const handleFileInput = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
  }
};

// Create Directory
const createDirectory = async () => {
  if (!directoryName.value) {
    message.value = { type: "danger", text: "Directory name is required." };
    return;
  }

  try {
    isUploading.value = true;

    // Send request to create an empty directory
    const response = await axios.post(`${API_BASE_URL}/create-directory`, {
      path: `${selectedDirectory.value}/${directoryName.value}`,
      commitMessage: `Creating directory ${directoryName.value}`,
    });

    // Success message and refresh
    message.value = { type: "success", text: "Directory created successfully!" };
    fetchDocuments();
    directoryName.value = "";
  } catch (error) {
    console.error("Error creating directory:", error.message);
    message.value = { type: "danger", text: "Failed to create directory. Please try again." };
  } finally {
    isUploading.value = false;
  }
};

// Upload File
const uploadDocument = async () => {
  if (!file.value || !selectedDirectory.value || !commitMessage.value) {
    message.value = { type: "danger", text: "All fields are required." };
    return;
  }

  try {
    isUploading.value = true;

    // Prepare the form data for the file upload
    const formData = new FormData();
    formData.append("file", file.value);
    formData.append("filePath", `${selectedDirectory.value}/${file.value.name}`);
    formData.append("commitMessage", commitMessage.value);

    // Send file to the server
    await axios.post(`${API_BASE_URL}/documents`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Success message
    message.value = { type: "success", text: "File uploaded successfully!" };
    fetchDocuments();
  } catch (error) {
    console.error("Error uploading document:", error.message);
    message.value = { type: "danger", text: "Failed to upload file. Please try again." };
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

      selectedDirectory.value = directoryPath;

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
  
// Fetch documents on mount
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



button {
  white-space: nowrap;
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

button.btn-warning {
  color: #ffffff;
}

@media (max-width: 768px) {
  .col-lg-3 {
    max-height: none;
    overflow: visible;
  }
}
</style>
