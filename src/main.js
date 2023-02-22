import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import router from './router'
import "bootstrap-icons/font/bootstrap-icons.css";


let app = createApp(App);

app.config.globalProperties.$API_URL = "http://ec2-34-213-94-185.us-west-2.compute.amazonaws.com:8090/api"

app.use( VueAxios, Axios);

app.use(router);

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"

