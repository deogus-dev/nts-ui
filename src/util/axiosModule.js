import axios from 'axios'
import _ from 'lodash'
import { useAuthStore } from '~/stores/auth'

const apiList = []

let isTokenRefreshing = false

// const router = useRouter()
const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  method: 'post',
  timeout: 60000
})

const retryApi = (options) => {
  axiosModule.api(options)
}

const axiosModule = {
  instance,
  async api(options) {
    console.log('Start API', '[apiList]', apiList)
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

    // console.log('%c[Request]', 'background:green;color:white;', options)

    // API call
    try {
      let response
      response = await instance(options)

      // console.log('%c[Response]', 'background:blue;color:white;', options)

      return Promise.resolve(response.data)
    } catch (error) {
      // console.log('%c[error]', 'color:red', error, error.response.status, error.response.statusText)

      const status = error.response.status
      if (status === 401) {
        apiList.push(options)
        console.log('401 API', '[apiList]', apiList)
        // at만료, 토큰 재발급 요청
        // console.log('%c[token expired]', 'color: red', error)

        console.log('%cisTokenRefreshing', 'background:red', isTokenRefreshing)

        if (!isTokenRefreshing) {
          isTokenRefreshing = true
          // axios
          //   .post('/api/reissue', {
          //     refreshToken: useAuthStore().refreshToken
          //   })
          //   .then((res) => {
          //     isTokenRefreshing = false
          //     console.log('reissue success')
          //     useAuthStore().saveToken(res)
          //     axiosModule.api(options)
          //   })
          //   .catch((err) => {
          //     console.log('reissue failed')
          //     // alert('로그인 세션이 만료되었습니다.\r\n재로그인 해주시기 바랍니다.')
          //     // return false
          //     // router.push('/login')
          //   })

          axiosModule
            .api({
              url: '/member/reissue',
              data: {
                refreshToken: useAuthStore().refreshToken
              }
            })
            .then((res) => {
              isTokenRefreshing = false
              useAuthStore().saveToken(res)
              apiList.forEach((item) => {
                axiosModule.api(item)
              })
              // return axiosModule.api(options)
            })
            .catch((err) => {
              console.log('reissue failed')
              // alert('로그인 세션이 만료되었습니다.\r\n재로그인 해주시기 바랍니다.')
              // return false
              // router.push('/login')
            })
        }
      } else {
        // console.log('[unknown error]', error)
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }
  }
}

export default axiosModule
