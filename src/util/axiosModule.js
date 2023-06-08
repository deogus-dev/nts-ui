import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  method: 'post',
  timeout: 60000
})

const axiosModule = {
  instance,
  async api(options) {
    console.log(options)

    await instance(options)
  }
}

axios.interceptors.request.use(
  (config) => {
    console.log('axios interceptor1')
  },
  (error) => {
    console.log('axios interceptor2')
  }
)

export default axiosModule
