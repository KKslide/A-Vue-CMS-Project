import Vue from 'vue';
import VueRouter from 'vue-router';

/* elemnt-ui引入 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './less/index.less';

/* 导入axios模块和api配置 */
import axios from './js/axios_config.js';
import api, { domain } from './js/api_config.js';


Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$apiDomain = domain;


/* 启动Vue插件 */
Vue.use(VueRouter);
Vue.use(ElementUI);

/* 插入根组件 */
import AppComponent from './component/App.vue';

/* 导入路由配置 */
import routerConfig from './router/index.js';

/* 导入路由守卫函数 */
import routerGuard from './router/guard.js';
const vueRouter = new VueRouter(routerConfig);
vueRouter.beforeEach(routerGuard);


/* 挂载根组件，启动应用 */
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    // render(createElement){
    //     return createElement(AppComponent);
    // }
    router: vueRouter
});