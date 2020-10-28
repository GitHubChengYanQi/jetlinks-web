import React from 'react';
import {request as requestProivde} from '@/util/Service';

const request = async (config) => {

  // const {ajaxService} = Service();
  const response = await requestProivde({
    ...config
  });
  return response.data;
};
export default request;
