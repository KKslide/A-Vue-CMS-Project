import AppComponent from '../component/App.vue';
import LoginComponent from '../component/Login.vue';
import RegisterComponent from '../component/Register.vue';

export default {
    routes: [
        /* 首页路由配置 */
        { path: '/', redirect: '/home' },
        { name: '/', path: '/home', component: AppComponent },
        /* 登陆路由配置 */
        { path: '/', redirect: '/login' },
        { name: '/', path: '/login', component: LoginComponent }
    ]
}