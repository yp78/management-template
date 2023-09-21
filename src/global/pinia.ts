import { createPinia } from 'pinia'
// 引入pinia持久化插件
import persist from 'pinia-plugin-persistedstate'

import type { App } from 'vue'

export default function (app: App) {
  app.use(createPinia().use(persist))
}
