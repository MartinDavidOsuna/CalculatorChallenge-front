<template>
        <div class="header g-lg-3">
            <nav class="navbar navbar-dark navbar-expand-lg bg-primary">
            <div class="container-fluid">
              <h1><i class="bi bi-calculator brand"></i></h1>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <router-link class="link" to="/calculator">CALCULATOR</router-link>
                    
                  </li>
                  <li class="nav-item">
                    <router-link class="link" to="/Records">RECORDS</router-link>
                  </li>
                  
                </ul>
           
                <span class="text-start ">{{ UserName }} /</span> 
                <span class="text-start p2">Credit : {{ UserBalance }}usd  </span>  
               
                <span class="navbar-text h4">
                    <router-link class="link" v-on:click="logOut()" to="/"><a class="button" >Sign Out</a></router-link>
                    
                  </span>
                  
              </div>
              
            </div>
            
          </nav>
          
          
      </div>
      <notifications position="bottombottom right" />
   
        
    </template>
<script>

export default {
    name:"HeaderMenu",
    created(){
        this.emitter.on('updateBalance', async() => await this.getBalance());
        
    },
    data(){
        return {
            UserName:localStorage.username,
            User:localStorage.user,
            UserId:localStorage.userId,
            UserBalance : 0,
            LastRecords : {}
        }
    },
    methods:{
        async getBalance(){
            if(this.UserId){
              let payload = {
                token : localStorage.token,
                id: this.UserId
              }
              const result = await this.axios.post(this.$API_URL+'/users/balance/',payload)
              .then( data =>{
                  return data.data[0].balance;
              })  
            
              this.UserBalance = '$' + new Intl.NumberFormat('en-us').format(result);
            }
        },
        getBalanceInicial(){
          
          this.getBalance();
        },
        logOut(){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
        }
    },
    beforeMount() {
      
        this.getBalance()
    }
}


</script>
<style scoped>

ul,
.link {
    font-weight: 500;
    color: #fff;
    list-style: none;
    text-decoration: none;
}

li {
    text-transform: uppercase;
    padding: 10px;
    margin-left: 16px;
}

.link{
    font-size: 14px;
    transition: .5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
}

.brand{
    color: #fff;
}

.text-start{
        font-weight: 500;
        color: #fff;
        font-size: 18px;
        padding-right: 5px;
    }

    .text-end{
        font-weight: 500;
        color: #fff;
        font-size: 18px;
        
    }

</style>