<template>
    <div>
        
    <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            你好,{{user.uname}}&nbsp;功能
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">注销登陆</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                user:JSON.parse(localStorage.getItem('user'))
            }
        },
        methods:{
            logout(){
                this.$http.get(this.$api.logout)
                    .then(res=>{
                        localStorage.removeItem('user');
                        this.$router.push('/login');
                    });
            },
            handleCommand(command) {
                this.logout();
                // switch (command) {
                //     case 'logout':
                //         this.logout();
                //         break;
                // }
            }
        }
    }
</script>

<style scoped>

</style>