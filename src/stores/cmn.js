import { defineStore } from 'pinia'
import _ from 'lodash'

export const useCmnStore = defineStore('cmn', {
  state: () => ({
    modal: {
      full: false,
      half: false,
      kakao: false,
      holy: false
    },
    cmnCode: {
      holyType: [
        {
          code: 'AT06',
          value: '전일'
        },
        {
          code: 'AT02',
          value: '오전반차'
        },
        {
          code: 'AT03',
          value: '오후반차'
        },
        {
          code: 'AT04',
          value: '오전반반차'
        },
        {
          code: 'AT05',
          value: '오후반반차'
        }
      ]
    }
  }),
  actions: {
    openModal(type) {
      this.modal[type] = true
    },
    closeModal(type) {
      this.modal[type] = false
    },
    modalAllClose() {
      _.mapValues(this.modal, () => null)
      console.log(this.modal)
    }
  },
  getters: {
    getCmnCode: (state) => (type) => {
      return state.cmnCode[type]
    }
  }
})
