const { defineConfig } = require('@vue/cli-service')
const Copy=require('copy-webpack-plugin')
const path = require('path');
const resolve = (dest)=>{
  return path.resolve(__dirname,'./src',dest)
}
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  css:{
    extract:false
  },
  configureWebpack:config=> {
    config.plugins.push(new Copy({patterns:[{
      from:resolve('./components/Stepper.vue'),
      to:path.resolve(__dirname,'./Stepper.vue'),
      toType:'file'
    }]}))
  }
})
