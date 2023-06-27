import axios from 'axios'
import _ from 'lodash'
import { useAuthStore } from '~/stores/auth'
import router from '~/router'

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

    if (!options.url.startsWith('/member')) {
      _.merge(options, {
        headers: {
          Authorization: 'Bearer ' + useAuthStore().accessToken
        }
      })
    } else {
      delete options?.headers?.Authorization
    }

    console.log('%c[Request]', 'background:green;color:white;', options)

    // API call
    try {
      let response
      response = await instance(options)

      console.log('%c[Response]', 'background:blue;color:white;', options)

      // response header에서 token 갱신 확인 후 saveToken
      const headers = response.headers
      const tokenRefreshed = headers['x-token-isRefresh']
      if (tokenRefreshed) {
        const at = headers['x-at']
        const rt = headers['x-rt']
        useAuthStore().saveToken({ at, rt })
      }

      return Promise.resolve(response.data)
    } catch (error) {
      console.log('%c[error]', 'color:red', error, error.response.status, error.response.statusText)

      const status = error.response.status
      if (status === 401) {
        alert('로그인 세션이 만료되었습니다. 재로그인 해주시기 바랍니다.')
        router.push('/login')
      } else {
        console.log('[unknown error]', error)
      }

      return Promise.reject(error)
    }
  }
}

export default axiosModule
