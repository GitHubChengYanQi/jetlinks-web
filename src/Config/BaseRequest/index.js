import {config} from 'ice';
import {useRequest as ahooksRequest, useFusionTable as tableRequest} from 'ahooks';
import cookie from 'js-cookie';
import axios from 'axios';

const baseURI = config.baseURI || window.sing.sysURI

const ajax = axios.create({
  baseURL: baseURI,
  headers:{
    // 'Content-Type':'application/json;charset=UTF-8',
  }
});
ajax.interceptors.request.use((config) => {
  const token = cookie.get('header-key');
  config.headers.common.Authorization = token || '';
  console.log(config);
  return config;
}, (error) => {
  return error;
});

ajax.interceptors.response.use((response) => {
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

const useRequest = (config, options) => {
  const request = () => {
    return ahooksRequest((params) => {
      return ajax({
        ...config,
        ...params
      });
    }, {
      ...options,
    });
  };
  return {request};
};

const useTableRequest = (config, options) => {
  const request = () => {
    return tableRequest((params) => {
      const {...other} = params;
      const page = {};
      if (params) {
        page.limit = typeof params.pageSize !== 'undefined' ? params.pageSize : 10;
        page.page = typeof params.current !== 'undefined' ? params.current : 1;
      }
      return ajax({
        ...config,
        ...other,
        params: page
      });
    }, {
      ...options,
      formatResult:
        (response) => {
          return {list: response.data, total: response.count};
        },
    });
  };
  return {request};
};
export {useRequest, useTableRequest, baseURI};

