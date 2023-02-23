<template>
    <HeaderMenu></HeaderMenu>
    <div class="container">
        
    <div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Operation</th>
                <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "record in RecordList" :key="record.type">
                <td>{{ record.type }}</td>
                <td>{{ record.cost }} USD</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    
</template>
<script>
import HeaderMenu from '@/components/HeaderMenu.vue';


export default {
    name:"PricingView",
    beforeCreate(){
        if(!localStorage.token){
            this.$router.push('/')
        }
    },
    data(){
        return {
            RecordList:null,
            page:1
        }
    },
    components:{
       HeaderMenu
    },
    mounted: function(){
        let payload = {
                        token : localStorage.token
                    }
        this.axios.post(this.$API_URL+"/operations",payload).then( data =>
            this.RecordList=data.data
        );
    }
}
</script>
<style  scoped>
  
</style>