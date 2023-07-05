<script setup>
import { reactive, computed, watchEffect } from 'vue'
import { useCmnStore } from '~/stores/cmn'
import lib from '~/util/axiosModule'
import valid from '~/util/validation'
import moment from 'moment'

const cmnStore = useCmnStore()
const data = reactive({})

const holyType = computed(() => {
  return cmnStore.getCmnCode('holyType')
})

watchEffect(() => {
  if (data.code === 'AT06') {
    if (data.to && moment(data.from) > moment(data.to)) {
      alert('시작일이 종료일보다 이전일 수 없습니다!')
      delete data.to
    }
  } else {
    data.to = data.from
  }
})

const aplyHoly = () => {
  if (valid('holyCode', data.code) && valid('holyFrom', data.from) && valid('holyTo', data.to)) {
    lib
      .api({
        url: `/attend/${data.code}`,
        data: {
          from: moment(data.from).format('YYYYMMDD'),
          to: moment(data.to).format('YYYYMMDD')
        }
      })
      .then(() => {
        alert('휴가 신청이 완료되었습니다!')
      })
  }
}
</script>

<template>
  <div class="halfModal">
    <button @click="cmnStore.closeModal('holy')">close</button>
    <div>
      <select v-model="data.code">
        <option v-for="item in holyType" :value="item.code">{{ item.value }}</option>
      </select>
      <input type="date" v-model="data.from" v-if="data.code" />
      <input type="date" v-model="data.to" v-if="data.code === 'AT06'" />
      <button @click="aplyHoly">신청하기</button>
    </div>
  </div>
</template>

<style>
.halfModal {
  height: 50%;
}
</style>
