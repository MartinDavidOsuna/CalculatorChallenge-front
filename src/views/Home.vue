<template>
    
    <div>
        <HeaderMenu></HeaderMenu>
        <div class="row">
            <CalculatorLayout></CalculatorLayout>

            <HistoryPanel></HistoryPanel>
          
        </div>
       
    </div>
    
</template>
<script>
import HeaderMenu from '@/components/HeaderMenu.vue';
import CalculatorLayout from '@/components/CalculatorLayout.vue';
import HistoryPanel from '@/components/HistoryPanel.vue';


//import axios from 'axios';
export default {
    name:"HomePage",
    data(){
        return {
            Listapacientes:null,
            pagina:1,
            
        }
    },
    components:{
       HeaderMenu,
       CalculatorLayout,
       HistoryPanel

    },
    methods:{
            editar(id){
                this.$router.push('/editar/' + id);
            },
            nuevo(){
                this.$router.push('/nuevo');
            }
            
    }
}
</script>
<style  scoped>
 
</style>


