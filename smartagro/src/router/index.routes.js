import { createRouter, createWebHistory } from 'vue-router';

// Import layouts
import AppLayout from '../Layouts/AppLayout.vue';
import AuthLayout from '../Layouts/AuthLayout.vue';
import MainLayout from '../Layouts/MainLayout.vue';

// Import pages
import Login from '../Pages/Auth/Login.vue';
import ForgotPassword from '../Pages/Auth/ForgotPassword.vue';
import OtpCode from '../Pages/Auth/OtpCode.vue';
import ResetPassword from '../Pages/Auth/ResetPassword.vue';

// Import pages
import Index from '../Pages/Index.vue';
import Products from '../Pages/Products.vue';
import AllProducts from '../Pages/Main/AllProducts.vue';
import ProductSingle from '../Pages/ProductSingle.vue';
import Dashboard from '../Pages/Main/Dashboard.vue';
import Chat from '../Pages/Main/Chat.vue';
import Users from '../Pages/Main/Users.vue';
import Tasks from '../Pages/Main/Tasks.vue';
import Employee from '../Pages/Main/Employees.vue';
import Documents from '../Pages/Main/Documents.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '/', name: 'Index', component: Index },
      { path: 'products', name: 'Products', component: Products },
      { path: 'product/:id', name: 'ProductSingle', component: ProductSingle },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: Login },
      { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword },
      { path: 'otp-code', name: 'OtpCode', component: OtpCode },
      { path: 'reset-password', name: 'ResetPassword', component: ResetPassword },
    ],
  },
  {
    path: '/app',
    component: AppLayout,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'chat', name: 'Chat', component: Chat },
      { path: 'tasks', name: 'Task', component: Tasks },
      { path: 'products', name: 'AllProducts', component: AllProducts },
      { path: 'employees', name: 'Employees', component: Employee },
      { path: 'documents', name: 'Documents', component: Documents },
      { path: 'users', name: 'Users', component: Users },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
