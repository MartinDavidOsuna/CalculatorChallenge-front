
<template>
    <div class="row">
        <HeaderMenu></HeaderMenu>
        <div class="col-lg-8 offset-lg-2">
         <teleport to="#modals" >
            <div class="modal-bg" v-if="isModalOpen" @click="isModalOpen=false">
                <div class="modalst">
                    <div class="modal-dialog" >
                        <div class="modal-content">
                        <div>
                            <h3><i class="bi bi-exclamation-triangle deleting"></i> <span>Deleting record!</span></h3>
                        </div>
                        <div class="alert">
                            Are you sure you want to delete record {{ deleting_id }}?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary col-3" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary col-3" style="margin-left:30px;margin-right:30px;" @click.prevent="deleteRecord(deleting_id)">Yes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
        
            <div class="table-responsive">
                <div class="container">
                    <div class="row" >
                        <div class="col-6">
                            <div class="d-flex justify-content-start tablelabel">
                                <label class="p-2 labelOption" for="rowsPerPage">Show </label>
                                <select id="rowsPerPage" v-model="rowsPerPage">
                                    <option v-for="option in options" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                    </option>
                                </select>
                                <label class="p-2 labelOption" for="rowsPerPage"> rows per page</label>
                            </div>
                        </div>
                        <div class="col-6 text-right tablelabel">
                            <div class="d-flex justify-content-end">
                                <label class="labelSearch">Search: </label>
                                <input type="text" v-model="searchQuery">
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-bordered display">
                <thead>
                    <tr>
                        <th @click="sort('id')">Operation Id<span>{{ sortOrder === 'asc' ? '▲' : '▼' }}</span></th>
                        <th>Operation</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Operation Result</th>
                        <th @click="sort('date')">Operation Id <span >{{ sortOrder === 'asc' ? '▲' : '▼' }}</span></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredData.slice(
                        (currentPage - 1) * rowsPerPage,
                        currentPage * rowsPerPage
                    )" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ '$' + new Intl.NumberFormat('en-us').format(item.amount) }}</td>
                    <td>{{ '$' + new Intl.NumberFormat('en-us').format(item.user_balance) }}</td>
                    <td>{{ item.operation_response }}</td>
                    <td>{{ formatDate(new Date(item.date)) }}</td>
                    <td>
                        <button type="button" class="btn" id="delete" @click.prevent="isModalOpen = true;deleting_id=item.id"><i class="bi bi-trash delete"></i></button>
                    </td>
                    </tr>
                </tbody>
                </table>
                <div class="container">
                    <div class="row tablelabel" >
                        <div class="col-6">
                            <div class="d-flex justify-content-start">
                                <span>Showing {{ firstIndex-rowsPerPage }} to {{ lastIndex-rowsPerPage }} of {{ filteredData.length }} entries.</span>
                            </div>
                        </div>
                        <div class="col-6 text-right">
                            <div class="d-flex justify-content-end">
                                <b-button-group>
                                    <b-button v-if="currentPage > 1" @click="currentPage--" class="btn btn-primary">
                                        Prev
                                    </b-button>
                                    <b-button v-for="page in pagesToShow" :key="page" :class="{ 'btn btn-info': page === currentPage, 'btn btn-light': page !== currentPage }" @click="currentPage = page">
                                        {{ page }}
                                    </b-button>
                                    <b-button v-if="currentPage < totalPages" @click="currentPage++" class="btn btn-primary"> 
                                        Next 
                                    </b-button>
                                </b-button-group>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                   
                </div>
                
            </div>
        </div>
    </div>
</template>

<script >

import HeaderMenu from '@/components/HeaderMenu.vue';
import 'bootstrap';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
////////////////////////////////////
import { ref } from 'vue'
import { Teleport } from 'vue'
//////////////////////////

export default {
        name:"RecordsView",
        props: {
            visible: Boolean,
            variant:String
        },
        components:{
            HeaderMenu,
            Teleport
        },
        data(){
            return {
                currentPage: 1,
                rowsPerPage: 10,
                searchQuery: "",
                sortColumn: '',
                sortOrder: '',
                RecordList:[],
                isDeleting: false,
                deleting_id: "",
                notify:false,
                notify_message:"",
                OpenClose:this.visible,
                options: [
                    { label: '5', value: 5 },
                    { label: '10', value: 10 },
                    { label: '20', value: 20 },
                    { label: '50', value: 50 }
                ],
                isModalOpen : ref(false) 
        }
    },
    methods:{
 
    async fetchData(){
        let payload = {
                    token : localStorage.token,
                    id: localStorage.userId
                }
        const data = await this.axios.post(this.$API_URL+"/lastRecords",payload);
        
        this.RecordList = data.data;
    },
    async deleteRecord(recordId){
        
        this.isDeleting=false;
        if(localStorage.token){
            let payload = {
                token : localStorage.token,
                id: recordId
            }
            this.notify_message = await this.axios.post(this.$API_URL+"/deleteRecord",payload).then(function(){
                return;
            });
            this.$notify({ type: "success", text: "Register "+recordId+" deleted!" })
            const index = this.RecordList.findIndex(item => item.id === recordId);
            if (index !== -1) {
                this.RecordList.splice(index, 1);
            }
            
        }
    },

    formatDate(date) {
        return (
            [
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
                date.getFullYear(),
                ].join('-') +
                ' ' +
            [
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
                this.padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    },
    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    },
    setPage(page) {
        this.currentPage = page;
    },
    sort(column) {
        if (this.sortedColumn === column) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortedColumn = column;
            this.sortOrder = 'asc';
        }

        this.RecordList.sort((a, b) => {
            const modifier = this.sortOrder === 'desc' ? -1 : 1;
            if (a[column] < b[column]) return -1 * modifier;
            if (a[column] > b[column]) return 1 * modifier;
            return 0;
        });
    },
    },
    mounted() {
        this.fetchData()
    },
    computed: {
        filteredData() {
            return this.RecordList.filter(row => {
            const searchRegex = new RegExp(this.searchQuery, 'i');
            return searchRegex.test(row.id) ||
               searchRegex.test(row.type) ||
               searchRegex.test(row.date) ||
               searchRegex.test(row.operation_response);
            });
        },
        displayedData() {
        const start = this.currentPage * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        return this.filteredData.slice(start, end);
        },
        firstIndex() {
        return (this.currentPage * this.rowsPerPage) + 1;
        },
        lastIndex() {
            return Math.min((this.currentPage + 1) * this.rowsPerPage, this.filteredData.length);
        },
        totalPages() {
            return Math.ceil(this.RecordList.length / this.rowsPerPage);
        },
        pagesToShow() {
            const startPage = Math.max(1, this.currentPage - 1);
            const endPage = Math.min(this.totalPages, startPage + 2);
            let pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    watch: { 
      visible: function(newVal, oldVal) { // watch it
        this.OpenClose =newVal;
        console.log('new' +newVal+ '==' +oldVal)
      }
    }
    
}
</script>

<style>
@import 'datatables.net-bs5';

@import 'bootstrap/dist/css/bootstrap.css';

.delete{
    color:firebrick;
    font-size: 16px;
}

.current-page {
  background-color: #007bff;
  color: #fff;
}
.tablelabel{
    font-size: 13px; 
    
}
.alert{
    font-size: 13px; 
    
}
.tablelabel{
    font-size: 13px; 
    
}

.modal-bg{
  position:fixed;
  top:0;
  left:0;
  width: 100vw;
  height:100vh;

  background-color: rgba(159, 159, 161, 0.4);

  display:flex;
  justify-content:center;
  align-items: center;
}

.modalst{
  position: relative;
  background: white;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0,0,0,0.1);
}
.deleting{
    color: red;
}

.yesbutton{
    padding-left:50px;
}

@media only screen and (max-width: 1000px) {
    select{
        height: 30px;
    }

    input{
        width: 70%;
    }    

    .labelOption{
        font-size: 10px;
        
    }

    .labelSearch{
        font-size: 10px;
        margin-top: 5px;
        margin-right: 3px;
    }
}
</style>
