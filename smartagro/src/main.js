import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from "./router/index.routes.js";

const app = createApp(App)
app.use(router)
app.mount('#app')
