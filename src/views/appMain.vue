<script setup>
import { reactive, computed } from 'vue'
import moment from 'moment'
import _ from 'lodash'
import kakaoMap from '~/components/kakaoMap.vue'
import lib from '~/util/axiosModule'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const attendInfo = reactive({})

const locationInfo = reactive({})
const setLocationInfo = (param) => {
  _.merge(locationInfo, param)
}

const getAttendInfo = () => {
  lib
    .api({
      url: '/attend',
      method: 'get'
    })
    .then((res) => {
      console.log('appMain res', res)
      _.merge(attendInfo, res)
    })
}

const attendStatus = computed(() => {
  //pm 상황 고려할 경우 추가
  //   if (!yesterday.out_time && yesterday.attend_code === 'AT08') {
  //     return 'out'
  //   }

  if (attendInfo.inTime && attendInfo.outTime) {
    return { key: 'end', txt: '근무종료' }
  }

  if (!attendInfo.inTime) return { key: 'in', txt: '출근' }
  else return { key: 'out', txt: '퇴근' }
})

const attend = () => {
  let url
  if (attendStatus.value.key === 'in') url = '/attend/on'
  else url = '/attend/off'

  lib
    .api({
      url: url,
      data: {
        locationCode: 'LC01',
        attendCode: 'AT01'
      }
    })
    .then((res) => {
      getAttendInfo()
      alert(attendStatus.value.txt + '이 완료되었습니다.')
    })
}

;(async () => {
  getAttendInfo()
})()
</script>

<template>
  <p>출,퇴근 버튼 상태 : {{ attendStatus.key }}</p>
  <p>출,퇴근 버튼 상태 : {{ attendInfo }}</p>
  <p>위치 정보 : {{ locationInfo }}</p>
  <button
    @click="attend"
    :disabled="attendStatus.key === 'end' || (attendStatus.key === 'in' && !locationInfo.circleIn)"
  >
    {{ attendStatus.txt }}
  </button>
  <kakaoMap @setLocationInfo="setLocationInfo" />
</template>
