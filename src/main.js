import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import router from './router'
import "bootstrap-icons/font/bootstrap-icons.css";
import mitt from 'mitt';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'jquery/dist/jquery.min.js';
import cors from 'cors';

let app = createApp(App);

app.config.globalProperties.$API_URL = "http://ec2-34-213-94-185.us-west-2.compute.amazonaws.com:8090/api/V1";

app.config.globalProperties.emitter = mitt();

app.use( VueAxios, Axios);

app.use(router);
app.use(cors);

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"

