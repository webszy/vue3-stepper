<template>
  <div class="box_step_line" ref="el">
    <div class="progress" id="progress"></div>
    <button class="circle"
         :class="activeClass(index)"
         v-for="(item,index) in props.steps"
         :key="item.text"
         :style="{left: circleLeft[index]}"
         @click="handleClick(index)"
    >
      <p>{{ item.text }}</p>
      <p>{{ item.label }}</p>
    </button>
  </div>
</template>

<script setup>
import {ref,computed,unref,} from 'vue'

const props = defineProps({
  modelValue:{type:Number,require:true,default:1},
  steps:{type:Array,required:false,default:()=>[{text:'1',label:'One'},{text:'2',label:'Two'}]},
  activeColor:{type:String,required:false,default:'#AD0CD3'},
  inActiveColor:{type:String,required:false,default:'#F6F6F6'},
  progressPadding:{type:String,required:false,default:'70px'},
  max: {type:Number, require:false},
  vaildator:{type:Function,required:false}
})
const emits = defineEmits(['update:modelValue'])
const el = ref(null)
const betweenNum = computed(()=>Math.floor(100/(props.steps.length+1)))
const circleLeft = computed(() => {
  if(unref(el)){
    const dom = unref(el)
    const result = []
    let j = 1
    for(let i=0;i<dom.children.length;i++){
      const e = dom.children[i]
      if(e.className.includes('circle')){
        // console.log(e.offsetWidth)
        result.push(`calc(${j*unref(betweenNum)}% - ${e.offsetWidth * 0.5}px)`)
        j++
      }
    }
    return result
  }
  return ['0','0','0']
})
const progressWidth = computed(() => {
  if(unref(el)){
    if(props.max && props.modelValue > props.max){
      return `${props.max * unref(betweenNum)}%`
    }
    return `${props.modelValue * unref(betweenNum)}%`
  }
})
const activeClass = (index)=>{
  if(props.max && index + 1 > props.max){
    return  ''
  }
  return index <= props.modelValue - 1 ? 'active' : ''
}
const handleClick = (index)=>{
  if(props.vaildator && !props.vaildator(index,props.steps)){
    return
  }
  let num = index + 1
  if(props.max && num > props.max){
    emits('update:modelValue',props.max)
    return
  }
  emits('update:modelValue',num)
}
</script>

<style scoped>
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
}
.box_step_line {
  position: relative;
  /*width: calc(100% - 40px);*/
  width: 100%;
  height:auto;
  min-height:42px;
}

.box_step_line::before {
  content: '';
  background-color: v-bind('props.inActiveColor');
  position: absolute;
  top: 9px;
  left: 0;
  height: 5px;
  width: 100%;
  z-index: -1;
  border-radius:3px;
}

.progress {
  background-color: v-bind('props.activeColor');
  position: absolute;
  top: 9px;
  left: 0;
  height: 5px;
  width: v-bind('progressWidth');
  max-width: 100%;
  z-index: -1;
  transition: 0.4s ease;
  overflow: hidden;
}

.circle {
  border-radius: 50%;
  height:30px;
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s ease;
  position: absolute;
  top:5px;
  padding:0 5px;
}
.circle p{
  font-family: Avenir, Avenir-Heavy;
  color:#828282;
  font-weight: 800;
}
.circle p:first-of-type{
  width:22px;
  height: 22px;
  font-size: 14px;
  border-radius:50%;
  border: 1PX solid #b7b7b7;
  text-align: center;
  line-height: 22px;
  background:v-bind('props.inActiveColor');
  margin-bottom: 2px;
  top:0;
}
.circle p:last-of-type{
  font-size: 12px;
}
.box_step_line .active p:first-of-type{
  border-color: v-bind('props.activeColor');
  background: v-bind('props.activeColor');
  color:#fff;
}
.box_step_line .active p:last-of-type{
  color:v-bind('props.activeColor');
}
</style>
