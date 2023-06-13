<script setup>
import xlsxUtil from '~/util/excelExport'
import { reactive } from 'vue'

const excelData = reactive([
  {
    colA: 'data1',
    colB: 'data2',
    colC: 'data3'
  },
  {
    colA: 'data4',
    colB: 'data5',
    colC: 'data6'
  }
])

const excelDown = () => {
  xlsxUtil(excelData)
}
</script>

<template>
  <button @click="excelDown">excelDown</button>
</template>
