<template>
    <div>
        <span>this is the first Vue project I start with</span>
        <hr>
        <span>{{content}}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                content:'一起来学习Vue.js'
            }
        }
    }
</script>

<style scoped>
    span{
        font-size: 50px;
        background-color: red;
        color:yellow;
    }
    span:last-child{
        padding: 0 40px;
    }
</style>