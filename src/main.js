import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '~/util/axiosModule.js'
import { useAuthStore } from '~/stores/auth'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '~/assets/main.css'
import '~/assets/css/transition.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

app.config.globalProperties.$filters = {
  timeFormat(value) {
    if (value) return value.substring(0, 2) + ':' + value.substring(2, 4)
    else return '-'
  }
}

// 앱 초기 구동시 localstorage에서 at,rt를 가져와서 store에 세팅
const authStore = useAuthStore()
authStore.loadToken()
