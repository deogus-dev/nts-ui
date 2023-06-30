import exportExcel from '~/views/exam/exportExcel.vue'
import exportExcelLib from '~/views/exam/exportExcelLib.vue'

const routes = [
  {
    path: '/exportExcel',
    component: exportExcel
  },
  {
    path: '/exportExcelLib',
    component: exportExcelLib
  }
]

export default routes
