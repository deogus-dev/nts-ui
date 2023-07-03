<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import moment from 'moment'
import _ from 'lodash'
import kakaoMap from '~/components/kakaoMap.vue'
import lib from '~/util/axiosModule'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const attendInfo = reactive({})

const currentTime = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
let timer = setInterval(() => {
  currentTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
}, 1000)

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
      _.merge(attendInfo, res)
    })
}

const attendStatus = computed(() => {
  //pm 상황 고려할 경우 추가
  //   if (!yesterday.out_time && yesterday.attend_code === 'AT08') {
  //     return 'off'
  //   }

  if (attendInfo.inTime && attendInfo.outTime) {
    return { key: 'end', txt: '근무종료' }
  }

  if (!attendInfo.inTime) return { key: 'on', txt: '출근' }
  else return { key: 'off', txt: '퇴근' }
})

const attend = () => {
  lib
    .api({
      url: `/attend/${attendStatus.value.key}`,
      data: {
        locationCode: 'LC01',
        attendCode: 'AT01'
      }
    })
    .then(() => {
      alert(attendStatus.value.txt + '이 완료되었습니다.')
      getAttendInfo()
    })
}

onUnmounted(() => {
  clearInterval(timer)
})
;(() => {
  getAttendInfo()
})()
</script>

<template>
  <p>
    <span class="fw-bold">{{ store.getUserNm }}</span
    >님 환영합니다.
  </p>
  <p>현재시간 : {{ currentTime }}</p>
  <p>출근시간 : {{ $filters.timeFormat(attendInfo.inTime) }}</p>
  <p>퇴근시간 : {{ $filters.timeFormat(attendInfo.outTime) }}</p>
  <button
    @click="attend"
    :disabled="attendStatus.key === 'end' || (attendStatus.key === 'on' && !locationInfo.circleIn)"
  >
    {{ attendStatus.txt }}
  </button>
  <kakaoMap @setLocationInfo="setLocationInfo" />
</template>

<style>
.fw-bold {
  font-weight: bold;
}
</style>
