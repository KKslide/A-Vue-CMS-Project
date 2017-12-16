/* 导入被路由的组件 */
import AdminComponent from '../component/Admin/Admin.vue';
import LoginComponent from '../component/Login/Login.vue';
import RegisterComponent from '../component/Register/Register.vue';

/* 对外导出路由配置对象 */
export default {
    routes: [
        /* 首页路由配置 */
        { name: 'h', path: '/admin', component: AdminComponent },
        /* 登陆路由配置 */
        { name: 'l', path: '/login', component: LoginComponent },
        /* 注册路由配置 */
        { name: 'r', path: '/register', component: RegisterComponent }
    ]
}