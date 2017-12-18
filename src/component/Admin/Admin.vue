<template>
    <el-container>
        <el-aside width="200px">
            <!-- 左边菜单部分 -->
            <app-aside></app-aside>
        </el-aside>
        <el-container>
            <!-- 头部导航部分 -->
            <el-header>
                <app-header></app-header>
            </el-header>
            <el-main>
                <!-- 主体部分 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    /* 导入子组件 */
    import AsideComponent from './frame/Aside.vue';
    import HeaderComponent from './frame/Header.vue';

    export default {
    data() {
        return {
            
        };
    },

    /* 注册子组件 */
    components:{
        appAside: AsideComponent,
        appHeader: HeaderComponent
    },
    created(){
        // console.log(localStorage.getItem('user'));
        let name = localStorage.getItem('user');
        if (!name) {
            alert('您还未登录，请先登录');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped lang="less">

        .el-container {
            height: 100%; // 左侧高度100%
            .el-aside {
                height: 100%;
                background-color: #D3DCE6;
                color: #333;
                text-align: center;
            } // 右侧头部
            .el-header {
                background-color: #B3C0D1;
                color: #333;
                text-align: right;
                line-height: 60px;
            } // 右侧变化内容
            .el-main {
                background-color: #E9EEF3;
                color: #333;
            }
        }

</style>