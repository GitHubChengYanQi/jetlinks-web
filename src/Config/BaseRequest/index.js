import {config} from 'ice';
import {Ajax} from '@sing/request';
import cookie from 'js-cookie';

const baseURI = config.baseURI || window.sing.sysURI
const ajaxConfig = {
  baseURL: baseURI,
  withCredentials: true,
  interceptors: {
    request: {
      onConfig: (config) => {
        const token = cookie.get('header-key');
        config.headers.common.Authorization = token || ''
        if(config.path){
          switch (typeof config.path) {
            case 'object':
              break;
            case 'string':
            case 'number':
              config.url += `/${config.path}`
              break;
            default:
              break;
          }
        }
        return config;
      },
      onError: (error) => {
        console.log(error);
      }
    },
    response: {},
  }
};
const {useRequest} = Ajax(ajaxConfig);
export {useRequest, baseURI};
