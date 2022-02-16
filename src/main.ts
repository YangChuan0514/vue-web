import { createApp } from 'vue'
import { setupStore } from './store' // 状态管理
import App from './App.vue'
import router, { setupRouter } from './router'
import ElementPuls from 'element-plus'
import "element-plus/dist/index.css";
const app = createApp(App)
setupStore(app) // 引入状态管理
setupRouter(app)

router.isReady().then(() => {
	app.use(ElementPuls).mount('#app')
})
