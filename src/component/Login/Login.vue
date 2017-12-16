<template>
    <div class="login">
        <div class="login_content">
            <!-- logo -->
                <section class="login_content_logo">
                    <!-- ../../img/logo.png -->
                    <img src="../../img/logo.png" alt="">
                </section>
            <!-- 表单 -->
            <section>
                <el-form :model="user" :rules="formRules" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="uname">
                        <el-input type="text" v-model="user.uname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="upwd">
                        <el-input type="password" v-model="user.upwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                user:{
                    "uname": "",
                    "upwd": ""
                },
                formRules:{
                    uname:[
                        { required:true, message:'请输入用户名',trigger:'blur'},
                        {pattern:/\w{5,18}/,message:'长度在4到18个子字符,且只能为&_或字幕与数字',trigger:'blur'}
                        ],
                    upwd:[
                        { required: true, message: '请输入密码', trigger: 'blur'},
                        { pattern: /.{6,18}/, message: '长度在6到18个子字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
        submitForm(formName) {
            this.$refs[formName].validate((result)=>{
                if(result){
                    this.$http.post(this.$api.login,this.user)
                        .then(rep=>alert(rep.data.message.realname));
                }else{
                    alert('我靠你逗玩呢？？？');
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
    }
</script>

<style scoped lang="less">
    .login{
        height:100%;
        background-color: #2277bb;
        &_content{
            width: 400px;
            position: absolute;
            left: 50%;
            top: 50%;
            border: 1px solid #fff;
            padding: 10px;
            border-radius: 5px;
            margin-left: -200px;
            margin-top: -150px;
            &_logo {
                text-align: center;
            }
        }
            .el-form-item__label{
                color: #fff !important;
            }
    }
</style>