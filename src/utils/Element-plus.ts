//引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import type { App } from 'vue'

export default function (app: App) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}
