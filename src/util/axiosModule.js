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
    const response = await axios.post('/api/reissue', {
      refreshToken: useAuthStore().refreshToken
    })

    useAuthStore().saveToken(response.data)

    return Promise.resolve(response.data.accessToken)
  } catch (error) {
    alert('로그인 세션이 만료되었습니다.\r\n로그인 페이지로 이동합니다.')
    useAuthStore().clearToken()
    location.href = '/'
    // return Promise.reject(error)
  }
}

instance.interceptors.request.use(
  (config) => {
    if (
      !config.url.startsWith('/member') &&
      config.url != '/login' &&
      config.url != '/logout' &&
      config.url != '/reissue'
    ) {
      _.merge(config, {
        headers: {
          // Authorization: /* useAuthStore().grantType */ 'Bearer ' + useAuthStore().accessToken
          Authorization: useAuthStore().grantType + ' ' + useAuthStore().accessToken,
          userId: useAuthStore().userId
        }
      })
    } else {
      delete config.headers?.Authorization
      delete config.headers?.userId
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.data.status === 401) {
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = useAuthStore().grantType + ' ' + accessToken
          resolve(axios(originalRequest))
        })
      })

      if (!isTokenRefreshing) {
        isTokenRefreshing = true
        // 토큰 재발급 요청
        const newAccessToken = await refreshToken()
        isTokenRefreshing = false
        onTokenRefreshed(newAccessToken)
      }

      return retryOriginalRequest
    } else {
      Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

const axiosModule = {
  instance,
  async api(options) {
    try {
      let response = await instance(options)
      console.log('%cresponse', 'background:pink', response)
      return Promise.resolve(response.data)
    } catch (error) {
      console.log('%c[Exception]', 'background:red', error)
      return Promise.reject(error)
    }
  }
}

export default axiosModule
