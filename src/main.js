import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import router from './router'
import mitt from 'mitt';
import { BootstrapVue3 } from 'bootstrap-vue-3'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'jquery/dist/jquery.min.js';
import cors from 'cors';
import Notifications from '@kyvg/vue3-notification'

let app = createApp(App);

app.config.globalProperties.$API_URL = "http://martinosuna.com:8090/api/V1";

app.config.globalProperties.emitter = mitt();

app.use( VueAxios, Axios);
app.use(BootstrapVue3);
app.use(Notifications);
app.use(router);
app.use(cors);

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"

