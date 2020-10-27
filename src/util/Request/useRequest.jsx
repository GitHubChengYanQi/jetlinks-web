import React from 'react';
import {useRequest as ahooksRequest} from 'ahooks';
import ajaxService from '@/util/Service';
import {useHistory} from 'ice';

const useRequest = (config, options) => {

  const history = useHistory();

  const requestService = (params) => {
    return params || {};
  };

  const formatResult = (response) => {
    if (!response.data) {
      return {};
    }
    return response.data;
  };

  return ahooksRequest(requestService, {
    requestMethod: (params) => {
      return ajaxService({
        ...config,
        ...params
      });
    },
    onError: (result) => {
      // if (parseInt(result.errCode, 0) === 1502) {
      //   history.push("/login");
      // }
    },
    formatResult,
    ...options,
  });
};
export default useRequest;
