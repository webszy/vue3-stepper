import {createApp, defineComponent} from 'vue'
import App from './App.vue'
import Stepper from './components/Stepper.vue'
if(process.env.NODE_ENV === 'development'){
    createApp(App).mount('#app')
}

Stepper.name = 'ZStepper'
export default Stepper
