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
    // API 요청 전처리
    // code here

    // API call
    try {
      let response
      response = await instance(options)
      console.log('status', response.status)
    } catch (error) {
      console.log('error', error.response.data)
    }
  }
}

export default axiosModule
