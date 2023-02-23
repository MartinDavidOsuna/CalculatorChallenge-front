<template>
    
    <div>
        <HeaderMenu ></HeaderMenu>
        <div class="row">
            <CalculatorLayout></CalculatorLayout>

           
          
        </div>
       
    </div>
    
</template>
<script>
import HeaderMenu from '@/components/HeaderMenu.vue';
import CalculatorLayout from '@/components/CalculatorLayout.vue';



//import axios from 'axios';
export default {
    name:"HomePage",
    beforeCreate(){
        if(!localStorage.token){
            this.$router.push('/')
        }
    },
    data(){
        return {
            Listapacientes:null,
            pagina:1,
            
        }
    },
    components:{
       HeaderMenu,
       CalculatorLayout
       

    }
}
</script>
<style  scoped>
 
</style>


