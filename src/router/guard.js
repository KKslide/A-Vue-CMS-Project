/* 因为不属于组件，没有组件实例，无法$http */
import axios from 'axios';
import api from '../js/api_config';

export default function(to, from, next) {
    // 1 调用接口判断用户的登陆状态
    axios.get(api.islogin)
        .then(res => {
            let islogin = res.data.code == "logined";
            // 2 再通过to对象的name属性得知用户去往的页面
            let toPage = to.name;
            // 2.1 如果去往登陆页面
            if (toPage == 'l') {
                if (islogin) {
                    next('/'); //去首页-已登
                } else {
                    next(); //允许访问
                }
            };
            if (toPage != 'l') {
                if (islogin) {
                    next();
                } else {
                    next('/login');
                }
            }
        });
    // 2.2 登陆 -> 自动跳转到首页 -> 调next('/')
    // 2.3 未登陆 -> 允许访问 -> 调next()
    // 3.1 如果去往非登陆页面
    // 3.2 登陆 -> 允许访问 -> 调next()
    // 3.3 未登陆 -> 自动跳转到登陆页 -> 调next('/login')
    // console.log(to);
    // next();
};