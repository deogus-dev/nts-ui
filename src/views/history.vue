<script setup>
import { ref, reactive, watchEffect, computed } from 'vue'
import lib from '~/util/axiosModule'
import moment from 'moment'
import _ from 'lodash'

const month = ref('')
const attendList = reactive([])

const getAttendList = () => {
  lib
    .api({
      url: `/attend/${month.value.substring(0, 7).replace('-', '')}`,
      method: 'get'
    })
    .then((res) => {
      attendList.length = 0
      _.merge(attendList, res)
    })
}

const exportExcel = () => {
  window.open(
    `http://localhost:8080/attend/export/${month.value.substring(0, 4)}/${month.value.substring(
      5,
      7
    )}`
  )
  //   lib
  //     .api({
  //       url: `/attend/export/${month.value.substring(0, 4)}/${month.value.substring(5, 7)}`,
  //       method: 'get'
  //     })
  //     .then((res) => {
  //       console.log(res)
  //     })
}

watchEffect(() => {
  getAttendList()
})
;(() => {
  month.value = moment().format('YYYY-MM-DD')
  getAttendList()
})()
</script>

<template>
  <p>month : <input type="date" v-model="month" /></p>
  <div v-if="attendList.length != 0">
    <ul>
      <li v-for="(item, index) in attendList" :key="index">
        <p>attendDate : {{ item.attendDate }}</p>
        <p>출근시간 : {{ $filters.timeFormat(item.inTime) }}</p>
        <p>퇴근시간 : {{ $filters.timeFormat(item.outTime) }}</p>
        <p>총 근무시간 : {{ $filters.timeFormat(item.workTime) }}</p>
      </li>
    </ul>
    <button @click="exportExcel">엑셀 출력</button>
  </div>
  <div v-else>
    <h2>{{ month.substring(0, 7) }} 근무기록이 없습니다.</h2>
  </div>
</template>
