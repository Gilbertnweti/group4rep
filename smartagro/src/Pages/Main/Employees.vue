<template>
    <div class="employees-container">
      <!-- Employees Header -->
      <header class="employees-header px-3 py-2">
        <div class="container d-flex align-items-center justify-content-between">
          <h5 class="m-0">Employees</h5>
          <button class="btn btn-primary btn-sm" @click="toggleEmployeeModal">
            Add Employee
          </button>
        </div>
      </header>
  
      <!-- Employees Body -->
      <div class="container employees-body p-3">
        <div class="employee-list">
          <div
            v-for="employee in employees"
            :key="employee.id"
            class="employee-item border rounded p-3 mb-3"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6>{{ employee.name }}</h6>
                <div>
                  <i class="bi bi-envelope me-2"></i>
                  <span>{{ employee.email }}</span>
                </div>
                <div class="mt-2">
                  <i class="bi bi-briefcase me-2"></i>
                  <span>Role: {{ employee.role?.name }}</span>
                </div>
                <div class="mt-2">
                  <i class="bi bi-building me-2"></i>
                  <span>Department: {{ employee.department?.name }}</span>
                </div>
              </div>
              <div>
                <button class="btn btn-warning btn-sm me-2" @click="editEmployee(employee)">
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteEmployee(employee.id)">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Add/Edit Employee Modal -->
      <div v-if="showEmployeeModal" class="employee-modal">
        <div class="modal-content p-4">
          <h5>{{ isEditing ? "Edit Employee" : "Add New Employee" }}</h5>
          <form @submit.prevent="isEditing ? updateEmployee() : addEmployee()">
            <div class="mb-3">
              <label for="employeeName" class="form-label">Name</label>
              <input
                type="text"
                id="employeeName"
                v-model="currentEmployee.name"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="employeeEmail" class="form-label">Email</label>
              <input
                type="email"
                id="employeeEmail"
                v-model="currentEmployee.email"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="employeeRole" class="form-label">Role</label>
              <select
                id="employeeRole"
                v-model="currentEmployee.role"
                class="form-select"
                required
              >
                <option disabled value="">Select Role</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="employeeDepartment" class="form-label">Department</label>
              <select
                id="employeeDepartment"
                v-model="currentEmployee.department"
                class="form-select"
                required
              >
                <option disabled value="">Select Department</option>
                <option v-for="department in departments" :key="department.id" :value="department.id">
                  {{ department.name }}
                </option>
              </select>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-secondary me-2" type="button" @click="toggleEmployeeModal">
                Cancel
              </button>
              <button class="btn btn-primary" type="submit">{{ isEditing ? "Update" : "Add" }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
import endpoint from "../../helpers/endpoint";
  
  // States
  const employees = ref([]);
  const roles = ref([]);
  const departments = ref([]);
  const currentEmployee = ref({
    name: "",
    email: "",
    role: "",
    department: "",
  });
  const showEmployeeModal = ref(false);
  const isEditing = ref(false);
  
  // API base URL
  const API_BASE_URL = endpoint;
  
  // Toggle Employee Modal
  const toggleEmployeeModal = () => {
    showEmployeeModal.value = !showEmployeeModal.value;
    if (!showEmployeeModal.value) {
      resetCurrentEmployee();
      isEditing.value = false;
    }
  };
  
  // Reset Current Employee
  const resetCurrentEmployee = () => {
    currentEmployee.value = {
      name: "",
      email: "",
      role: "",
      department: "",
    };
  };
  
  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      employees.value = response.data;
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };
  
  // Fetch Roles
  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roles`);
      roles.value = response.data;
    } catch (error) {
      console.error("Error fetching roles:", error.message);
    }
  };
  
  // Fetch Departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/departments`);
      departments.value = response.data;
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };
  
  // Add Employee
  const addEmployee = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employees`, currentEmployee.value);
      employees.value.push(response.data);
      toggleEmployeeModal();
    } catch (error) {
      console.error("Error adding employee:", error.message);
    }
  };
  
  // Edit Employee
  const editEmployee = (employee) => {
    currentEmployee.value = { ...employee, role: employee.role.id, department: employee.department.id };
    isEditing.value = true;
    toggleEmployeeModal();
  };
  
  // Update Employee
  const updateEmployee = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/employees/${currentEmployee.value.id}`,
        currentEmployee.value
      );
      const index = employees.value.findIndex((e) => e.id === response.data.id);
      if (index !== -1) {
        employees.value[index] = response.data;
      }
      toggleEmployeeModal();
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };
  
  // Delete Employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/employees/${id}`);
      employees.value = employees.value.filter((e) => e.id !== id);
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };
  
  // Fetch Data on Component Mount
  onMounted(() => {
    fetchEmployees();
    fetchRoles();
    fetchDepartments();
  });
  </script>
  
  <style scoped>
  /* Same styles as tasks */
  .employees-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .employees-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  .employees-body {
    flex: 1;
    overflow-y: auto;
  }
  .employee-item {
    transition: background-color 0.3s ease;
  }
  .employee-modal {
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
  