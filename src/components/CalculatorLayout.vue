<template>
    
    <div class="col-lg-6">
        <form @submit.prevent="calculate">
            <div class="calculator card">
                
                <input type="text" class="calculator-screen z-depth-1" v-model="expression" disabled />
            
                
                <div class="calculator-keys">
            
                <button type="button" class="operator btn btn-info" v-on:click="handleOperator('+')" >+</button>
                <button type="button" class="operator btn btn-info" v-on:click="handleOperator('-')">-</button>
                <button type="button" class="operator btn btn-info" v-on:click="handleOperator('*')">&times;</button>
                <button type="button" class="operator btn btn-info" v-on:click="handleOperator('/')">&divide;</button>
            
                <button type="button" v-on:click="inputDigit('7')" class="btn btn-light waves-effect">7</button>
                <button type="button" v-on:click="inputDigit('8')" class="btn btn-light waves-effect">8</button>
                <button type="button" v-on:click="inputDigit('9')" class="btn btn-light waves-effect">9</button>
                <button type="button" v-on:click="doSqrt()" class="operator btn btn-info">&radic;</button>
            
                <button type="button" v-on:click="inputDigit('4')" class="btn btn-light waves-effect">4</button>
                <button type="button" v-on:click="inputDigit('5')" class="btn btn-light waves-effect">5</button>
                <button type="button" v-on:click="inputDigit('6')" class="btn btn-light waves-effect">6</button>
                <button type="button" v-on:click=" resetCalculator();doString()" class="operator btn btn-info">Str</button>
            
                <button type="button" v-on:click="inputDigit('1')" class="btn btn-light waves-effect">1</button>
                <button type="button" v-on:click="inputDigit('2')" class="btn btn-light waves-effect">2</button>
                <button type="button" v-on:click="inputDigit('3')" class="btn btn-light waves-effect">3</button>
            
            
                <button type="button" v-on:click="inputDigit('0')" class="btn btn-light waves-effect">0</button>
                <button type="button" v-on:click="inputDecimal('.')" class="decimal function btn btn-secondary">.</button>
                <button type="button" v-on:click="resetCalculator()" class="all-clear function btn btn-danger btn-sm">AC</button>
            
                
                
                <button type="button" class="equal-sign operator btn btn-success" v-on:click="doOperation()" value="=">=</button>
                
                </div>
            
            </div>
        </form>
        <!-- Remind Passowrd -->
        <div class="alert alert-danger" role="alert" v-if="error" style="width:400px">
            {{error_msg}}
        </div>
       
        
    </div>
</template>
<script>

export default {
    name:"CalculatorLayout",
    created: function()  {
        var payload={
            token : localStorage.token
        }
        this.axios.post(this.$API_URL+"/operations",payload).then( data =>
            this.operationPrice= data.data
        );
    },
    data(){
        return {
            expression: "0",
            operationPrice: null,
            userBalance : 0,
            userId : localStorage.userId,
            error: false,
            error_msg: "",
        }
    },
    methods:{
        inputDigit(digit) {
            this.error= false;
            this.error_msg= "";
            if(!calculator.isResult){
                const { displayValue, waitingForSecondOperand } = calculator;
                
                if (waitingForSecondOperand === true) {
                    calculator.displayValue += digit;
                    calculator.secondOperand = digit;
                    this.expression = calculator.displayValue;
                    calculator.waitingForSecondOperand = false;
                } else {
                    if (!calculator.secondOperand){
                        calculator.displayValue = displayValue === '0' ? this.expression = digit : this.expression = displayValue + digit;
                    }else{
                        calculator.secondOperand += digit; 
                        calculator.displayValue += digit;
                        this.expression = calculator.displayValue;
                    }
                }
            }else{
                this.error= true;
                this.error_msg= "Press AC to start a new operation";
            }
        },
        inputDecimal(dot) {
            if(!calculator.isResult){
                // If the `displayValue` does not contain a decimal point
                if (!calculator.displayValue.includes(dot)) {
                    // Append the decimal point
                    calculator.displayValue += dot;
                    this.expression = calculator.displayValue;
                }else{
                    if (calculator.secondOperand && calculator.displayValue.split(dot).length == 2){
                        // Append the decimal point to second operator
                    calculator.displayValue += dot;
                    calculator.secondOperand += dot;
                    this.expression = calculator.displayValue;
                    }
                }
            }else{
                this.error= true;
                this.error_msg= "Press AC to start a new operation";
            }
        },
        async handleOperator(nextOperator) {
            const { firstOperand, displayValue, operator } = calculator
            const inputValue = parseFloat(displayValue);
            
            if (operator && calculator.waitingForSecondOperand)  {
                this.error= true;
                this.error_msg= "You can do only one operation at a time";
               
                return;
            }
            if(calculator.isResult){
                this.error= true;
                this.error_msg= "Press AC to start a new operation";
                return;
            }

            if (firstOperand == null) {
                calculator.firstOperand = inputValue;
                calculator.displayValue += nextOperator;
                this.expression = calculator.displayValue;
            } else if (operator) {
                this.error= true;
                this.error_msg= "You can do only one operation at a time";
                
            }
            calculator.waitingForSecondOperand = true;
            calculator.operator = nextOperator;
        },
        resetCalculator() {
            calculator.displayValue = '0';
            calculator.firstOperand = null;
            calculator.secondOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
            this.expression = calculator.displayValue;
            calculator.isResult=false;
            this.error= false;
            this.error_msg= "";
        },
        async doOperation(){
            
            if(!calculator.isResult && calculator.operator){
                const opWord = operatorToWord(calculator.operator);
                var price = operatorToPrice(calculator.operator,this.operationPrice);
                
                if(price <= this.userBalance ){
                    let payload = {
                        token : localStorage.token,
                        operation: opWord,
                        value1 : calculator.firstOperand,
                        value2 :calculator.secondOperand
                    }
                    const result = await this.axios.post(this.$API_URL+'/operation/',payload)
                        .then( data =>{
                            
                            if(String(data.data).includes(".")){
                                
                                return parseFloat(data.data).toFixed(2);
                            }else{
                                return data.data;
                            }
                        })
                    calculator.displayValue = String(result);
                    this.expression += "=" + calculator.displayValue;
                    calculator.firstOperand = result;
                    calculator.waitingForSecondOperand = true;
                    calculator.isResult=true;
                    this.emitter.emit('updateBalance');
                    this.getBalance();
                   
                   
                  
                }else{
                    this.error= true;
                    this.error_msg= "Not enough credit to perform this operation";
                }
            }else{
                this.error= true;
                this.error_msg= "Press AC to start a new operation";
            }
        },
        async doSqrt(){
            if(!calculator.isResult && !calculator.operator){
                var price = operatorToPrice("sqr",this.operationPrice);
                let payload = {
                        token : localStorage.token,
                        operation: "sqr",
                        value1 : calculator.displayValue,
                        value2 :""
                    }
                if(price <= this.userBalance ){
                    const result = await this.axios.post(this.$API_URL+'/operation',payload)
                    .then( data =>{
                        return parseFloat(data.data).toFixed(2);
                    })
                    calculator.displayValue = String.fromCharCode(8730) + calculator.displayValue +"="+ String(result);
                    this.expression = calculator.displayValue;
                    calculator.isResult=true;
                    this.emitter.emit('updateBalance');
                    this.getBalance();
                }else{
                    this.error= true;
                    this.error_msg= "Not enough credit to perform this operation";
                }
            }else{
                this.error= true;
                this.error_msg= "Press AC to start a new operation";
            }
        },
        async doString(){
            var price = operatorToPrice("str",this.operationPrice);
            let payload = {
                        token : localStorage.token,
                        operation: "rnd",
                        value1 :"",
                        value2 :""
                    }
            if(price <= this.userBalance ){
                const result = await this.axios.post(this.$API_URL+'/operation',payload)
                .then( data =>{
                    return data.data;
                })
                calculator.displayValue = String(result);
                this.expression = calculator.displayValue;
                calculator.isResult=true;
                this.emitter.emit('updateBalance');
                this.emitter.emit('newOperation',calculator.displayValue);
                this.getBalance();
            }else{
                this.error= true;
                this.error_msg= "Not enough credit to perform this operation";
            }
        },
        async getBalance(){
            
            if(this.userId){
                let payload = {
                        token : localStorage.token,
                        id: this.userId
                    }
                const result = await this.axios.post(this.$API_URL+'/users/balance/',payload)
                .then( data =>{
                    return data.data[0].balance;
                })  
            
            
                this.userBalance = result;
                
            }
        }

    },
    beforeMount() {
        this.getBalance()
    }
}


const calculator = {
  displayValue: '0',
  firstOperand: null,
  secondOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  isResult: null
};


function operatorToWord (operator) {
    
    var word = "";

    switch(operator){
        case "/" :  word = "div";
                    break;
        case "*" : word = "mul";
                    break;
        case '+' : word = "add";
                    break;
        case "-" : word = "sub";
                    break;
    }
    return word;
    
}

function operatorToPrice (operator,pricesOP) {
    var prices = pricesOP;
    var price = "";
    var name = "";
   
    switch(operator){
        case "/" :  name = "division";
                    break;
        case "*" : name = "multiplication";
                    break;
        case '+' : name = "addition";
                    break;
        case "-" : name = "substraction";
                    break;
        case "sqr" : name = "square_root";
                    break;
        case "str" : name = "random_string";
                    break;
    }

    for(var i = 0; i< prices.length; i++ ){
        if (prices[i].type == name){
            price = prices[i].cost;
        }
    }
    
    return price;
    
}














</script>
<style  scoped>
    .calculator {
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
}

.calculator-screen {
  width: 100%;
  height: 80px;
  border: none;
  background-color: #252525;
  color: #fff;
  text-align: right;
  padding-right: 20px;
  padding-left: 10px;
  font-size: 2vmax;
}

button {
  height: 60px;
  font-size: 2rem!important;
}

.equal-sign {
  height: 98%;
  grid-area: 4 / 4 / 6 / 5;
}

.calculator-keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
}


</style>


