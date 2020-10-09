import React from 'react';
import {useRequest as ahooksRequest} from "ahooks";
import ajaxService from "@/Config/Service";

const useRequest = (config, options) => {
  const requestService = (params) => {
    return params || {};
  };
  return ahooksRequest(requestService, {
    requestMethod: (params) => {
      return ajaxService({
        ...config,
        ...params
      });
    },
    ...options,
  });
};
export default useRequest;
