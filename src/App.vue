<template>
  <div class="container">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Vue3-Stepper</h1>
    <Stepper
      v-model="num"
      :steps="steps"
      :max="3"
    />
    <div class="btns">
      <button @click="num++">增加</button>
      <button @click="num--">减少</button>
    </div>
  </div>

</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import Stepper from "@/components/Stepper.vue";
const num = ref(0)
const steps = reactive([{text:'1',label:'One'},{text:'2',label:'Two'}])
// const vaildator = (index:number)=>{
//   if(index>1){return true}
// }
</script>

<style>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
}
h1{
  font-size:30px;
}
p{margin: 0;padding: 0;}
button {
  outline: none;
  padding: 0;
  border: none;
  border: 0;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  background-color: transparent;
  cursor: pointer;
}
.btns{
  width: 50%;
  display: flex;
  justify-content:space-between;
  align-items: center;
  margin-top: 50px;
}
.btns button{
  height: 50px;
  padding: 0 20px;
  font-size: 14px;
  color:#fff;
  background-color: #07c160;
  border-radius:8px;
}
</style>
