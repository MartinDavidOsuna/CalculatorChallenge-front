<template>
    <div class="row">
        <HeaderMenu></HeaderMenu>
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <DataTable :data="RecordList" :columns="columns" class="table table-striped table-bordered display"
                :options="{responsive:true, autoWidth:false, dom:'frtip'}">
                    <thead>
                        <tr>
                            <th>Operation Id</th>
                            <th>Operation</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Operation Result</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                </DataTable>
                <!-- Remind Passowrd -->
                <div class="alert alert-danger" role="alert" v-if="error">
                   Are you sure yo want to delete register {{error_msg}} ?
                </div>
            </div>

        </div>
       

        
    </div>
</template>
<script>
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import ButtonsHtml15 from 'datatables.net-buttons/js/buttons.html5'
import 'datatables.net-responsive-bs5';
import HeaderMenu from '@/components/HeaderMenu.vue';


DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml15);


export default {
    name:"RecordsView",
    components:{
        DataTable,
        HeaderMenu
    },
    data(){
        return {
            RecordList:null,
            error: false,
            error_msg: "",
            columns:[
                {data: 'id' },
                {data: 'type' },
                {data: null, render: function(data)
                {return ('$' + new Intl.NumberFormat('en-us').format(data.amount))}},
                {data: null, render: function(data)
                {return ('$' + new Intl.NumberFormat('en-us').format(data.user_balance))}},
                {data: 'operation_response' },
                {data: null, render: function(data)
                {return (formatDate(new Date(data.date)))}},
                {data: null, orderable: false, render: function (data) { return '<button class="btn" id="delete" data-id="' + data.id + '"><i class="bi bi-trash delete"></button>'; }},
            ]
        }
    },
    
    mounted: function(){
        if(localStorage.userId){
            let payload = {
                        token : localStorage.token,
                        id: localStorage.userId
                    }
            this.axios.post(this.$API_URL+"/lastRecords",payload).then( data =>
                    this.RecordList=data.data
            );
        }
        
    }
    
}

function formatDate(date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}




import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'


function deleteRecord(recordId){
        let API_URL = "http://martinosuna.com:8090/api/V1";
        if(localStorage.token){
            let payload = {
                token : localStorage.token,
                id: recordId
            }
            axios.post(API_URL+"/deleteRecord",payload).then(function(){
                console.log("register "+recordId+" softdeleted successfuly!");
                location.reload();
                }
            );
        }
}


$(document).on('click', '#delete', function(){
    let id = $(this).data('id');
    
    deleteRecord(id);
})

</script>
<style>
@import 'datatables.net-bs5';

.delete{
    color:firebrick;
    font-size: 16px;
}
</style>
