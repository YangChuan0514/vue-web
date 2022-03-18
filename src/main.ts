import { createApp } from 'vue'
import store from './store' // 状态管理
import App from './App.vue'
import router, { setupRouter } from './router'
import ElementPuls from 'element-plus'
import "element-plus/dist/index.css";
import vant from 'vant';
import 'vant/lib/index.css';
const app = createApp(App)
setupRouter(app)

router.isReady().then(() => {
	app.use(ElementPuls).use(vant).use(store).mount('#app')
})
