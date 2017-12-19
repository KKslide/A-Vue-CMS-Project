<template>
    <div class="login">
        <div class="login_content">
            <!-- logo -->
                <section class="login_content_logo">
                    <!-- ../../img/logo.png -->
                    <img src="../../img/logo.jpg" alt="">
                </section>
            <!-- 表单 -->
            <section>
                <el-form :model="user" :rules="formRules" :label-position="labelPosition" status-icon ref="ruleForm2" label-width="70px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="uname">
                        <el-input type="text" v-model="user.uname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="upwd">
                        <el-input type="password" v-model="user.upwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :plain="true" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
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
                },
                labelPosition:'left'
            }
        },
        methods: {
        /* 登陆页面跳转 */
        /* 1.status是否为0，
        2.0---登陆成功，本地存储localStorage
        3.跳转后台首页 */
        login(){
            this.$http.post(this.$api.login, this.user)
                .then(res => {
                    let {status,message}=res.data;
                    if(status==0){
                        localStorage.setItem('user',JSON.stringify(message));
                        this.$router.push('/');
                        this.$message({
                            message: '恭喜您，登陆成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('密码错了');
                    }
                });
        },

        submitForm(formName) {
            this.$refs[formName].validate((result)=>{
                if(result){
                    this.login();
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
    
    .login {
        background-color: #1f1c17;
        height: 100%;
        position: relative;
        &_content {
            height: 100%;
            width: 400px;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%);
            .login_content_logo {
                text-align: center;
            }
        }
    }

</style>