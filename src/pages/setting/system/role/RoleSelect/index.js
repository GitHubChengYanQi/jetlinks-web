import React, {useState, useEffect} from 'react';
import {CascaderSelect} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {roleTree} from '@/Config/ApiUrl/system/role';

const RoleSelect = (props) => {

  const {value} = props;

  const {request} = useRequest(roleTree);
  const {data} = request();
  // const getTree = async () => {
  //   const {error, response} = await request();
  //   if (!error) {
  //     setData(response.data);
  //   }
  // }
  if(data){
    return (<CascaderSelect changeOnSelect dataSource={data.data} value={value} {...props} />);
  }else{
    return null;
  }
}

export default RoleSelect;