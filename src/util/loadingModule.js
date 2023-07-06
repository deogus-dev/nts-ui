import { createApp } from 'vue'
import Loading from '~/components/loading.vue'

let app, container, vueApp

const loadingModule = {
  create() {
    app = createApp(Loading)
    container = document.createElement('div')
    document.body.append(container)
    vueApp = app.mount(container)
  },
  show() {
    if (!app) {
      loadingModule.create()
    }
    vueApp.show()
  },
  hide() {
    if (!vueApp) {
      return
    }
    vueApp.hide()
  }
}

export default loadingModule
