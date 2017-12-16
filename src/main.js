import Vue from 'vue';
import VueRouter from 'vue-router';

/* 导入axios模块和api配置 */
import axios from './js/axios_config';
import api from './js/api_config';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;


/* 启动Vue插件 */
Vue.use(VueRouter);

/* 插入根组件 */
import AppComponent from './component/App.vue';

/* 导入路由配置 */
import routerConfig from './router/index.js';

/* 挂载根组件，启动应用 */
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    // render(createElement){
    //     return createElement(AppComponent);
    // }
    router: new VueRouter(routerConfig)
});