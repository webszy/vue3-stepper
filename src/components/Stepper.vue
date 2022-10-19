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

<script setup lang="ts">
import {ref,computed,unref,} from 'vue'
interface IStep{
  text:string;
  label:string;
}
interface IProps {
  modelValue:number;
  steps:IStep[];
  activeColor:string;
  inActiveColor:string;
  progressPadding:string;
  max?:number;
}
const defaultProps:IProps = {
  modelValue:1,
  steps:[{text:'1',label:'One'},{text:'2',label:'Two'}],
  activeColor:'#AD0CD3',
  inActiveColor:'F6F6F6',
  progressPadding:'70px'
}

const props = withDefaults(defineProps<IProps>(),defaultProps)

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
const activeClass = index=>{
  if(props.max && index + 1 > props.max){
    return  ''
  }
  return index <= props.modelValue - 1 ? 'active' : ''
}
const handleClick = (index)=>{
  if(index === 1){return }
  let num = index + 1
  if(props.max && num>props.max){
    num = props.max
  }
  return emits('update:modelValue',num)
}
</script>

<style scoped>
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
  height:auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s ease;
  position: absolute;
  top:0;
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
