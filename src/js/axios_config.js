/* 导入axios与域名接口 */
import axios from 'axios';
import { domain } from './api_config';

/* 配置默认域名 */
axios.defaults.baseURL = domain;

/* 跨域请求，默认不带cookie等信息，但后端需要此类信息来判断状态，所以改为true */
axios.defaults.withCredentials = true;

/* 导出，暴露 */
export default axios;