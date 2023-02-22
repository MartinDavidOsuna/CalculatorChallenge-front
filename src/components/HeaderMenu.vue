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
                  <li class="nav-item">
                    <router-link class="link" to="/Pricing">PRICING</router-link>
                  </li>
                </ul>
                <span class="text-start ">{{ UserName }} /</span> 
                <span class="text-start p2">Credit:{{ UserBalance }}USD  </span>  
               
                <span class="navbar-text h4">
                    <a class="link" href="#">Sign Out</a>
                  </span>
              </div>
            </div>
          </nav>
      </div>

   
        
    </template>
<script>


export default {
    name:"HeaderMenu",
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
            const result = await this.axios.get(this.$API_URL+'/users/balance/'+this.UserId)
            .then( data =>{
                return data.data[0].balance;
            })  
           
            this.UserBalance = result;
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