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

watchEffect(() => {
  getAttendList()
})
;(() => {
  month.value = moment().format('YYYY-MM-DD')
  getAttendList()
})()
</script>

<template>
  <h1>history</h1>
  <p>month : <input type="date" v-model="month" /></p>
  <ul>
    <li v-for="(item, index) in attendList" :key="index">
      <p>attendDate : {{ item.attendDate }}</p>
      <p>inTime : {{ $filters.timeFormat(item.inTime) }}</p>
      <p>outTime : {{ $filters.timeFormat(item.outTime) }}</p>
    </li>
  </ul>
</template>
