import React from 'react';
import {useRequest as ahooksRequest} from "ahooks";
import ajaxService from "@/Config/Service";

const useRequest = (config, options) => {
  const requestService = (params) => {
    return params || {};
  };

  const formatResult = (response) => {
    if (!response.data) {
      return  {};
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
    formatResult,
    ...options,
  });
};
export default useRequest;
