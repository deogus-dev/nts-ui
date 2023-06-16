<script setup>
import { ref, reactive, computed } from 'vue'
import moment from 'moment'
import kakaoMap from '~/components/kakaoMap.vue'

const cTime = ref('')
const attendList = reactive([
  {
    attend_code: '',
    attend_date: '',
    in_time: '',
    out_time: ''
  },
  {
    attend_code: 'AT01',
    attend_date: '202306',
    in_time: '085500',
    out_time: ''
  }
])

const [yesterday, today] = attendList

const attendStatus = computed(() => {
  //pm 상황 고려할 경우 추가
  //   if (!yesterday.out_time && yesterday.attend_code === 'AT08') {
  //     return 'out'
  //   }

  if (today.in_time && today.out_time) {
    return 'end'
  }

  if (!today.in_time) return 'in'
  else return 'out'
})

const attend = () => {
  alert('출근 api call')
}

;(() => {
  cTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
  // 출퇴근정보 조회 api call
})()
</script>

<template>
  <span>현재 시간 : {{ cTime }}</span>
  <p>어제 출근기록 : {{ yesterday }}</p>
  <p>오늘 출근기록 : {{ today }}</p>
  <p>오늘 출근 시간 : {{ today.in_time }}</p>
  <p>오늘 퇴근 시간 : {{ today.out_time }}</p>
  <p>출,퇴근 버튼 상태 : {{ attendStatus }}</p>
  <button @click="attend" :disabled="attendStatus === 'end'">
    {{ attendStatus === 'in' ? '출근하기' : '퇴근하기' }}
  </button>
  <kakaoMap />
</template>
