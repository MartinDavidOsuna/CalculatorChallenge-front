<template>
    <HeaderMenu></HeaderMenu>
    <div class="container">
        
    <div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Operation Id</th>
                <th scope="col">Operation</th>
                <th scope="col">Amount</th>
                <th scope="col">Balance</th>
                <th scope="col">Operation Result</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "record in RecordList" :key="record.id">
                <th scope="row">{{ record.id }}</th>
                <td>{{ record.type }}</td>
                <td>{{ record.amount }}</td>
                <td>{{ record.user_balance }}</td>
                <td>{{ record.operation_response }}</td>
                <td>{{ record.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    
</template>
<script>
import HeaderMenu from '@/components/HeaderMenu.vue';


export default {
    name:"RecordsView",
    data(){
        return {
            RecordList:null,
            page:1
        }
    },
    components:{
       HeaderMenu
    },
    methods:{
            editar(id){
                this.$router.push('/editar/' + id);
            },
            nuevo(){
                this.$router.push('/nuevo');
            }
    },
    mounted: function(){
        
        this.axios.get(this.$API_URL+"/lastRecords/"+localStorage.userId).then( data =>
            this.RecordList=data.data
        );
    }
}
</script>
<style  scoped>
  
</style>