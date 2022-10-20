# vue3-stepper
A Stepper Component for Vue3

# How to use
## install
> npm i ue3-stepper --save

## import to your project
```vue
<template>
    <Stepper 
    v-model="num"
    :steps="steps"
    :max="3"
    />
</template>
<script setup>
    import Stepper from 'vue3-stepper/Stepper.vue'
    const num = ref(0)
    const steps = reactive([{text:'1',label:'One'},{text:'2',label:'Two'}])
</script>
```
## props 
| keyName         | type                | required | default value | description                  |
|-----------------|---------------------|----------|---------------|------------------------------|
| steps           | <{text,label}>Array | true     |               | the data to gen every step   |
| activeColor     | string              | false    | #AD0CD3       | color for current step  item |
| inActiveColor   | string              | false    | #F6F6F6       | color for other step item    |
| progressPadding | string              | false    | 70px          | the distance one the side    |
| max             | number              | false    |               | maxium step count            |
| vaildator       | function            | false    |               | return true will allow next  |
# How develop 
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
