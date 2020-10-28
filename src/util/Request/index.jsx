import React from 'react';
import tableRequestProvide from './useTableRequest';
import useRequestProvide from './useRequest';
import axiosRequest from './request';

export const useTableRequest = tableRequestProvide;
export const useRequest = useRequestProvide;
export const request = axiosRequest;

export default {
  request,
  useRequest,
  useTableRequest,
};
