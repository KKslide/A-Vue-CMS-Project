<template>
    <div class="list">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            <el-breadcrumb-item>类别管理</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 工具条 -->
        <section class="tool_util">
            <!-- 左边按钮 -->
            <div class="tool_util_btns">
                <el-button icon="el-icon-circle-plus" size="small">
                    <router-link :to="{name:'gcta'}">新增</router-link>
                </el-button>
                <el-button icon="el-icon-success" size="small">全选</el-button>
                <el-button icon="el-icon-error" size="small">删除</el-button>
            </div>
            
            <!-- 右边搜索框 -->
            <div class="tool_util_search">
                <el-input @blur="getDataList" v-model="query.searchvalue" size="small" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
            </div>
        </section>


        <!-- 表格 -->
        
    <el-table height="400" 
              ref="multipleTable" 
              :data="tableList" 
              tooltip-effect="dark" 
              style="width: 100%">
        <!-- 多选框 -->
        <el-table-column type="selection" width="55"></el-table-column>

        <!-- label设置表头  prop用来展示 要渲染的字段  template用来渲染不是字符串的东西-->
        <el-table-column label="标题" >
            <template slot-scope="scope">
                <router-link :to="{name: 'gcte', params: {id: scope.row.id}}">{{scope.row.title}}</router-link>
            </template>
        </el-table-column>

        <el-table-column prop="categoryname" label="所属类别" width="100"></el-table-column>
        <el-table-column prop="stock_quantity" label="库存" width="100"></el-table-column>
        <el-table-column prop="market_price" label="市场价" width="100"></el-table-column>
        <el-table-column prop="sell_price" label="销售价" width="100"></el-table-column>

        <!-- 商品状态: label用于设置表头, 里面的template可以用于设定任意html结构 -->
            <el-table-column width="100" label="状态">
                <!-- 在temoplate里面, 需要通过scope.row拿到每一行数据 -->
                <template slot-scope="scope">
                    <i :class="['el-icon-upload2', scope.row.is_top? 'active': '']"></i>
                    <i :class="['el-icon-phone-outline', scope.row.is_hot? 'active': '']"></i>
                    <i :class="['el-icon-picture', scope.row.is_slide? 'active': '']"></i>
                </template>
            </el-table-column>

        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <!-- <a href="">修改</a> -->
                <router-link :to="{name: 'gcte', params: {id: scope.row.id}}">修改</router-link>
            </template>
        </el-table-column>

        <!-- <el-table-column prop="age" label="年龄" width="120"></el-table-column> -->
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        
    </el-table>

<!-- ********************************* -->
        <!-- 分页功能 -->
        <!-- size-change监听每页展示条目的变化， -->
        <!-- current-change当前处于第几页，page-size每页显示多少条数据 -->
        <!-- layout设置要使用哪些分页小组件 -->
        <!-- totalCount数据总量 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="query.pageSize"
      :current-page="query.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                query:{
                    pageIndex:1,
                    pageSize:10,
                    searchvalue:''
                },
                tableList:[],
                totalCount:0
            }
        },
        methods:{
            /* 获取商品列表 */
            getDataList(){
                /* get请求可传俩参数，第二个参数用来查询指定字符串 */
                this.$http.get(this.$api.gsList,{params:this.query})
                    .then(res=>{
                        this.tableList=res.data.message;
                        this.totalCount=res.data.totalcount;
                    })
            },
            /*  */
            handleSizeChange(pageSize){
                this.query.pageSize=pageSize;
                this.getDataList();
            },
            /* 当前页发生变化时候触发 */
            handleCurrentChange(pageIndex){
                this.query.pageIndex=pageIndex;
                this.getDataList();
            }
        },
        created(){
            this.getDataList();
        }
    }
</script>

<style scoped lang="less">
    .list{
        .el-breadcrumb{
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }
        .tool_util{
            padding: 10px 0;
            overflow: hidden;
            .tool_util_btns{
                float: left;
            }
            .tool_util_search{
                float: right;
            }
        }
        /* 分页背景调整为白色 */
        .el-pagination{
            background-color: #fff;
            border-top: 1px solid #eee;
            padding: 10px;
        }
    }
</style>