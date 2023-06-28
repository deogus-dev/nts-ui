import axios from 'axios'
import _ from 'lodash'
import { useAuthStore } from '~/stores/auth'

// 다중 요청 대응 코드 추가
let isTokenRefreshing = false
let refreshSubscribers = []

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken))
}

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback)
}

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  method: 'post',
  timeout: 60000
})

const refreshToken = async () => {
  try {
    const response = await axios.post('/api/member/reissue', {
      refreshToken: useAuthStore().refreshToken
    })
    isTokenRefreshing = false
    useAuthStore().saveToken(response.data)
    return Promise.resolve()
  } catch (error) {
    console.log('reissue failed')
    return Promise.reject(error)
  }
}

const axiosModule = {
  instance,
  async api(options) {
    if (!options.url.startsWith('/member')) {
      _.merge(options, {
        headers: {
          Authorization: 'Bearer ' + useAuthStore().accessToken
        }
      })
    } else {
      delete options?.headers?.Authorization
    }

    try {
      let response
      response = await instance(options)
      return Promise.resolve(response.data)
    } catch (error) {
      const status = error.response.status
      if (status === 401) {
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken) => {
            options.headers.Authorization = 'Bearer ' + accessToken
            resolve(axiosModule.api(options))
          })
        })

        if (!isTokenRefreshing) {
          isTokenRefreshing = true

          const result = await refreshToken()
          isTokenRefreshing = false

          onTokenRefreshed(result.data.accessToken)
        }
        return retryOriginalRequest
      }
    }
  }
}

export default axiosModule
