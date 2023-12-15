import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'


import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const myApp = createApp(App);
myApp.use(ToastPlugin);

myApp.mount('#app')

