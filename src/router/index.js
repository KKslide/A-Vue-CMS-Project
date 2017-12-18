/* 导入被路由的组件 */
import AdminComponent from '../component/Admin/Admin.vue';
import LoginComponent from '../component/Login/Login.vue';
import RegisterComponent from '../component/Register/Register.vue';

/* 导入商品i相关组件 */
import GoodsContentListComponent from '../component/Admin/goods/content/GoodsContentList.vue';
import GoodsContentAddComponent from '../component/Admin/goods/content/GoodsContentAdd.vue';
import GoodsContentEditComponent from '../component/Admin/goods/content/GoodsContentEdit.vue';

/* admin子路由 */
let adminChildren = [
    { name: 'gcl', path: 'goods/content/list', component: GoodsContentListComponent },
    { name: 'gca', path: 'goods/content/add', component: GoodsContentAddComponent },
    { name: 'gce', path: 'goods/content/edit', component: GoodsContentEditComponent },
];



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