<template>
  <div class="tasks-container">
    <!-- Tasks Header -->
    <header class="tasks-header px-3 py-2">
      <div class="container d-flex align-items-center justify-content-between">
        <h5 class="m-0">Tasks</h5>
        <button class="btn btn-primary btn-sm" @click="toggleTaskModal">
          Add Task
        </button>
      </div>
    </header>

    <!-- Tasks Body -->
    <div class="container tasks-body p-3">
      <div class="task-list">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="task-item border rounded p-3 mb-3"
          :class="{ 'task-completed': task.completed }"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6>{{ task.description }}</h6>
              <div class="d-flex align-items-center">
                <img
                  :src="'https://ui-avatars.com/api/?name=' + task.assignee + '&background=random'"
                  alt="Assignee Avatar"
                  class="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <span>Performer: {{ task.performer?.name }}</span>
              </div>
              <div class="mt-2">
                <i class="bi bi-calendar-event me-2"></i>
                <span>Creator: {{ task.creator?.name }}</span>
              </div>
              <div class="mt-2 text-success">
                <span>Status: {{ task.status }}</span>
              </div>
            </div>
            <div>
              <button
                v-if="!task.completed"
                class="btn btn-success btn-sm me-2"
                @click="markTaskComplete(task.id)"
              >
                Complete
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Task Modal -->
    <!-- Add Task Modal -->
    <div v-if="showTaskModal" class="task-modal">
      <div class="modal-content p-4">
        <h5>Add New Task</h5>
        <form @submit.prevent="addTask">
          <div class="mb-3">
            <label for="taskDescription" class="form-label">Description</label>
            <textarea
              id="taskDescription"
              v-model="newTask.description"
              class="form-control"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="taskStatus" class="form-label">Status</label>
            <select
              id="taskStatus"
              v-model="newTask.status"
              class="form-select"
              required
            >
              <option disabled value="">Select Status</option>
              <option value="unassigned">Unassigned</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="taskCreator" class="form-label">Creator</label>
            <select
              id="taskCreator"
              v-model="newTask.creator"
              class="form-select"
              required
            >
              <option disabled value="">Select Creator</option>
              <option v-for="user in employees" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="taskPerformer" class="form-label">Performer</label>
            <select
              id="taskPerformer"
              v-model="newTask.performer"
              class="form-select"
              required
            >
              <option disabled value="">Select Performer</option>
              <option v-for="user in employees" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-secondary me-2"
              type="button"
              @click="toggleTaskModal"
            >
              Cancel
            </button>
            <button class="btn btn-primary" type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import endpoint from '../../helpers/endpoint';

const tasks = ref([]);
const employees = ref([]);
const newTask = ref({
  description: "",
  status: "",
  creator: "",
  performer: "",
});

const showTaskModal = ref(false);

// API base URL
const API_BASE_URL = endpoint;

// Toggle Task Modal
const toggleTaskModal = () => {
  showTaskModal.value = !showTaskModal.value;
};

// Fetch Tasks from Backend
const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    
    console.log(response.data);
    
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
  }
};

// Fetch employees from Backend
const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    employees.value = response.data;
  } catch (error) {
    console.error("Error fetching employees:", error.message);
  }
};

// Add a New Task
const addTask = async () => {
  if (
    newTask.value.description &&
    newTask.value.status &&
    newTask.value.creator &&
    newTask.value.performer
  ) {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, {
        description: newTask.value.description,
        status: newTask.value.status,
        creator: newTask.value.creator, // Employee ID of creator
        performer: newTask.value.performer, // Employee ID of performer
      });

      // Add the new task to the tasks array
      fetchTasks()

      // Reset the newTask object
      newTask.value = {
        description: "",
        status: "",
        creator: "",
        performer: "",
      };

      // Close the modal
      toggleTaskModal();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  } else {
    console.warn("All fields are required to add a new task.");
  }
};


// Mark Task as Complete
const markTaskComplete = async (taskId) => {
  try {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, {
        ...task,
        status: "complete",
      });
      task.completed = response.data.completed;
    }
  } catch (error) {
    console.error("Error marking task complete:", error.message);
  }
};

// Delete a Task
const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    tasks.value = tasks.value.filter((t) => t.id !== taskId);
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
};

// Fetch data on component mount
onMounted(() => {
  fetchTasks();
  fetchEmployees();
});
</script>

<style scoped>
/* Same styles as before */
.tasks-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tasks-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
.tasks-body {
  flex: 1;
  overflow-y: auto;
}
.task-item {
  transition: background-color 0.3s ease;
}
.task-item.task-completed {
  background-color: #aee0f4aa;
}
.task-modal {
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
