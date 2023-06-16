import exportExcel from '~/views/exportExcel.vue'
import exportExcelLib from '~/views/exportExcelLib.vue'

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
