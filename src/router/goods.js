/* 导入商品i相关组件 */
/* 内容 */
import GoodsContentListComponent from '../component/Admin/goods/content/GoodsContentList.vue';
import GoodsContentAddComponent from '../component/Admin/goods/content/GoodsContentAdd.vue';
import GoodsContentEditComponent from '../component/Admin/goods/content/GoodsContentEdit.vue';
/* 分类 */
import GoodsCategoryListComponent from '../component/Admin/goods/category/GoodsCategoryList.vue';
import GoodsCategoryAddComponent from '../component/Admin/goods/category/GoodsCategoryAdd.vue';
import GoodsCategoryEditComponent from '../component/Admin/goods/category/GoodsCategoryEdit.vue';
// /* 列表 */
import GoodsCommentListComponent from '../component/Admin/goods/comment/GoodsComentList.vue';
import GoodsCommentAddComponent from '../component/Admin/goods/comment/GoodsComentAdd.vue';
import GoodsCommentEditComponent from '../component/Admin/goods/comment/GoodsComentEdit.vue';

/* ************************************************** */

/* 商品相关路由配置 */
export default [
    /* 内容 */
    { name: 'gctl', path: 'goods/content/list', component: GoodsContentListComponent },
    { name: 'gcta', path: 'goods/content/add', component: GoodsContentAddComponent },
    { name: 'gcte', path: 'goods/content/edit/:id', component: GoodsContentEditComponent },
    /* 分类 */
    { name: 'gcgl', path: 'goods/category/list', component: GoodsCategoryListComponent },
    { name: 'gcga', path: 'goods/category/add', component: GoodsCategoryAddComponent },
    { name: 'gcge', path: 'goods/category/edit', component: GoodsCategoryEditComponent },
    /* 列表 */
    { name: 'gcml', path: 'goods/comment/list', component: GoodsCommentListComponent },
    { name: 'gcma', path: 'goods/comment/add', component: GoodsCommentAddComponent },
    { name: 'gcme', path: 'goods/comment/edit', component: GoodsCommentEditComponent },
];