import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

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
    // API 요청 전처리(토큰)
    // code here

    let settings = options
    settings.headers = {}
    settings.headers.Authorization = 'Bearer ' + useAuthStore().accessToken

    // API call
    try {
      let response
      response = await instance(options)
      return Promise.resolve(response.data)
    } catch (error) {
      console.log('%c[error]', 'color:red', error.response.data.status, error.response.data.message)

      const status = error.response.data.status
      if (status === 401) {
        // at만료, 토큰 재발급 요청
        console.log('%c[token expired]', 'color: red', error)
      } else {
        console.log('[unknown error]', error)
      }
    } finally {
      console.log('end api')
    }
  }
}

export default axiosModule
