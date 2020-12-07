import React from 'react';
import {config, useHistory} from 'ice';
import cookie from 'js-cookie';
import axios from 'axios';
import {Modal} from 'antd';

const baseURI = config.baseURI || window.sing.sysURI;

const GotoLogin = () => {
  const history = useHistory();
  history.push('/login');
};

const ajaxService = axios.create({
  baseURL: baseURI,
  withCredentials: true,
  headers: {
    // 'Content-Type':'application/json;charset=UTF-8',
  }
});

ajaxService.interceptors.request.use((config) => {
  const token = cookie.get('tianpeng-token');
  config.headers.common.Authorization = token || '';
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
    if (parseInt(response.errCode, 0) === 1502) {
      Modal.error({
        title: '提示',
        content: '您已登录超时，请重新登录。',
        okText: '重新登录',
        onOk: () => {
          Modal.destroyAll();
          try {
            GotoLogin();
          } catch (e) {
            console.log('不能使用hook跳转');
            window.location.href = `/#/login?backUrl=${encodeURIComponent(window.location.href)}`;
          }
        }
      });
      throw new Error(response.message);
    }
    const message = response.message || '未知错误';
    throw new Error(message);
  }
  return response;
}, (error) => {
  // if (error.errCode !== 0) {
  throw new Error(error.message);
  // }
  // return error;
});

const requestService = () => {
  return {
    ajaxService
  };
};

export const request = ajaxService;
export default requestService;
