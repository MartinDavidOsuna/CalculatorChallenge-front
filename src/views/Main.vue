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

export default {
    name:"MainView",
    beforeCreate(){
        if(!localStorage.token){
            this.$router.push('/')
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


