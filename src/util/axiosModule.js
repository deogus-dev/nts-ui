import axios from 'axios'
import _ from 'lodash'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()

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

    // let settings

    // settings.headers = {}
    // settings.headers.Authorization = 'Bearer ' + useAuthStore().accessToken

    // if(isLogin)
    _.merge(options, {
      headers: {
        Authorization: 'Bearer ' + useAuthStore().accessToken
      }
    })

    // API call
    try {
      let response
      response = await instance(options)
      return Promise.resolve(response.data)
    } catch (error) {
      console.log('%c[error]', 'color:red', error, error.response.status, error.response.statusText)

      const status = error.response.status
      if (status === 401) {
        // at만료, 토큰 재발급 요청
        console.log('%c[token expired]', 'color: red', error)

        axiosModule
          .api({
            url: '/reissue',
            data: {
              refreshToken: useAuthStore().refreshToken
            }
          })
          .then((res) => {
            authStore.saveToken(res)
            return axiosModule.api(options)
          })
      } else {
        console.log('[unknown error]', error)
      }

      return Promise.reject(error)
    }
  }
}

export default axiosModule
