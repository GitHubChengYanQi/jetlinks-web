import {config} from 'ice';
import cookie from 'js-cookie';import axios from 'axios';

const baseURI = config.baseURI || window.sing.sysURI;

const ajaxService = axios.create({
  baseURL: baseURI,
  headers:{
    // 'Content-Type':'application/json;charset=UTF-8',
  }
});
ajaxService.interceptors.request.use((config) => {
  const token = cookie.get('header-key');
  config.headers.common.Authorization = token || '';
  console.log(config);
  return config;
}, (error) => {
  return error;
});

ajaxService.interceptors.response.use((response) => {
  if (response.status !== 200) {
    throw new Error('网络错误');
  }
  response = response.data;
  if (response.errCode !== 0) {
    throw new Error(response.message);
  }
  return response;
}, (error) => {
  if (error.errCode !== 0) {
    throw new Error(error.message);
  }
  return error;
});

export default ajaxService;
