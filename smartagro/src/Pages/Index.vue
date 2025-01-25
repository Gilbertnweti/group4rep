<template>
    <div>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container text-center py-5">
          <h1 class="display-4 fw-bold">Welcome to Smart AgroLTD</h1>
          <p class="lead">Empowering Agriculture with Innovative Solutions</p>
        </div>
      </section>
  
      <section class="products-section bg-light py-5">
          <!-- Employees Body -->

      <div class="container employees-body p-3">
          <h1 class="text-left mb-4">Our Employees</h1>
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
      </section>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
import endpoint from "../helpers/endpoint";
  
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
  /* Styling as before */
  .hero-section {
    background: linear-gradient(to right, #28a745, #8bc34a);
    color: white;
  }
  
  .hero-section .container {
    padding: 100px 0;
  }
  
  .products-section {
    padding: 50px 0;
  }
  
  .card img {
    height: 200px;
    object-fit: cover;
  }
  
  h2 {
    color: #28a745;
  }
  </style>
  