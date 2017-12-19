/* 导入被路由的组件 */
import AdminComponent from '../component/Admin/Admin.vue';
import LoginComponent from '../component/Login/Login.vue';
import RegisterComponent from '../component/Register/Register.vue';


/* 导入商品还有其他模块的路由配置 */
import goodsRouterConfig from './goods';
/* 因为导入进来的是数组，所以可以用...来拆分数组 */
let adminChildren = [...goodsRouterConfig];


/* 对外导出路由配置对象 */
export default {
    routes: [
        /* 首页路由配置 */
        { name: 'h', path: '/', component: AdminComponent, children: adminChildren },
        /* 登陆路由配置 */
        { name: 'l', path: '/login', component: LoginComponent },
        /* 注册路由配置 */
        { name: 'r', path: '/register', component: RegisterComponent }
    ]
}