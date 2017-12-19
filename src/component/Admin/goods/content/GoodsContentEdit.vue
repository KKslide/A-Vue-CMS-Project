<template>
    <div class="edit">

        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- Form表单 -->
        <section class="edit_box">
            
            <el-form size="medium" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit__form" >
                
                <el-row>
                    <!-- 内容标题 -->
                    <el-col :span="12">
                        <el-form-item label="内容标题" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                    </el-col>  
                    <!-- 副标题 -->
                    <el-col :span="12">
                        <el-form-item label="副标题" prop="sub_title">
                            <el-input v-model="ruleForm.sub_title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <!-- 所属类别 -->
                    <el-col :span="8">
                        <el-form-item label="所属类别" prop="category_id">
                            <!-- select动态获取，option要for循环来搞定 -->
                            <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                                <el-option v-for="item in goodsCategory" :key="item.category_id" 
                                :label="item.title" :value="item.category_id">
                                    <!-- 根据层级分类 写空隙 -->
                                    <span v-for="i in (item.class_layer-1)" :key="i">&nbsp;</span>
                                    <!-- 顶级分类|||杠它 -->
                                    <span v-if="item.class_layer != 1">|-</span>
                                    <span>{{item.title}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!-- 是否发布 -->
                    <el-col :span="7">
                        <el-form-item label="是否发布" prop="status">
                            <el-switch v-model="ruleForm.status"></el-switch>
                        </el-form-item>
                    </el-col>

                    <!-- 推荐类型 -->
                    <el-col :span="9">
                        <el-form-item label="推荐类型" required>
                            <el-switch v-model="ruleForm.is_slide" active-text="轮播图"></el-switch>
                            <el-switch v-model="ruleForm.is_top" active-text="置顶"></el-switch>
                            <el-switch v-model="ruleForm.is_hot" active-text="火热"></el-switch>
                        </el-form-item>
                    </el-col>                 
                </el-row>
            

                <el-row>
                    <!-- 封面上传 -->
                    <el-col :span="12">
                        <el-form-item label="封面上传" >
                    
                            <el-upload class="upload-demo" :action="uploadImgUrl" 
                                    :file-list="ruleForm.imgList" 
                                    list-type="picture"
                                    :on-success="uploadImgHandler">
                                <el-button size="small" type="primary">封面上传</el-button>
                            </el-upload>

                        </el-form-item>
                    </el-col>

                    <!-- 附件上传 -->
                    <el-col :span="12">
                        <el-form-item label="附件上传">
                    
                            <el-upload class="upload-demo" :action="uploadFileUrl" 
                            :file-list="ruleForm.FileList"
                            :on-success="uploadFileHandler"
                            >
                                <el-button size="small" type="primary">附件上传</el-button>
                            </el-upload>

                        </el-form-item>
                    </el-col>
                </el-row>
                
                <!-- 商品货号、库存数量、市场价格、销售价格 -->
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="商品货号" prop="goods_no">
                            <el-input v-model="ruleForm.goods_no"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="库存数量" prop="stock_quantity">
                            <el-input v-model="ruleForm.stock_quantity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="市场价格" prop="market_price">
                            <el-input v-model="ruleForm.market_price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="销售价格" prop="sell_price">
                            <el-input v-model="ruleForm.sell_price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>                               

                
                <el-form-item label="内容摘要" prop="zhaiyao">
                    <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
                </el-form-item>
                <el-form-item label="详细信息" prop="content">
                    <!-- <el-input type="textarea" v-model="ruleForm.content"></el-input> -->

                    <quill-editor v-model="ruleForm.content"></quill-editor>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            
        </section>
    </div>
</template>

<script>
/* 引入富文本编辑器 */
import { quillEditor } from 'vue-quill-editor';

// 富文本编辑器样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    
    data() {
        return {
            /* 配置图片上传和文件上传的url，因为饿了么组件需要完整参数，所以这么写 */
            uploadImgUrl:this.$apiDomain+this.$api.atImg,
            uploadFileUrl:this.$apiDomain+this.$api.atFile,
            id: this.$route.params.id,
            /* 表单数据 */
            ruleForm: {
                "title":"Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣",
                "sub_title":"英伦轻奢 专柜同款 为不凡而生",
                "goods_no":"NZ0000000002",
                "category_id":"151",
                "stock_quantity":200,
                "market_price":1000,
                "sell_price":800,
                "status":false,
                "is_slide":false,
                "is_top":false,
                "is_hot":true,
                "zhaiyao":"为不凡而生",
                "content":"<p><strong>产品参数：</strong></p>",
                "imgList":[
                        {
                        "name":"wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        "url":"http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        "shorturl":"/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"        
                        }
                    ],
                "fileList":[
                    {
                    "name":"HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                    "url":"http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                    "shorturl":"/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
                    }
                ]
            },
            /* 商品分类 */
            goodsCategory:[],
            /* 表单校验规则 */
            rules: {
                title: [
                    { required: true, message: '请输入内容标题', trigger: 'blur' },
                ],
                sub_title: [
                    { required: true, message: '请输入副标题', trigger: 'blur' }
                ],
                goods_no: [
                    {  required: true, message: '请输入商品编号', trigger: 'blur' }
                ],
                stock_quantity: [
                    {  required: true, message: '请输入库存', trigger: 'blur' }
                ],
                market_price: [
                    {  required: true, message: '请输入市场价格', trigger: 'blur' }
                ],
                sell_price: [
                    { required: true, message: '请输入销售价格', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        /* 上传图片==上传成功就把返回的url字符串存在ruleForm里面去 */
        uploadImgHandler(data){
            // console.log(data);
            /* 因为只能传一张图片 所以这么写 */
            this.ruleForm.imgList=[data];
        },
        /* 上传文件==把服务器返回的url存到上面的表单数据里面的filelist里面去 */
        uploadFileHandler(data){
            /* 因为可以上传多个 所以用push的 */
            this.ruleForm.fileList.push(data);
        },
        /* 获取商品分类信息 */
        getGoodsCategory(){
            this.$http.get(this.$api.ctList+'goods')
                .then(res=>{
                    this.goodsCategory = res.data.message;
                });
        },
        // 获取商品信息, 后面加上商品ID参数
        getGoods() {
            this.$http.get(this.$api.gsDetail + this.id)
                .then( res => {
                    res.data.message.category_id = +res.data.message.category_id;
                    this.ruleForm = res.data.message;
                });
        },
        /* 修改商品信息,后面要加上参数ID */
        modifyGoods(){
            this.$http.post(this.$api.gsEdit + this.id, this.ruleForm)
                .then(res=> this.$alert(res.data));
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.modifyGoods();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created() {
        this.getGoodsCategory();
        this.getGoods();
    },
    /* 启用vue-quill-editor */
    components: {
        quillEditor
    }
}
</script>

<style scoped lang="less">
    
    .edit {

        &_box {
            margin-top: 20px;
            border: 1px solid #cccccc;
            border-radius: 8px;
            padding: 20px 10px;
        }

        &__form {
            // width: 450px;
            width: 90%;
        }
    }

    .quill-editor{
        width:100%;
    }
</style>