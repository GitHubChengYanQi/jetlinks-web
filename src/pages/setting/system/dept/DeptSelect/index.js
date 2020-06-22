import React, {useState, useEffect} from 'react';
import {CascaderSelect} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {deptTree} from '@/Config/ApiUrl/system/dept';


const DeptSelect = (props) => {
  const {value} = props;

  const {request} = useRequest(deptTree);

  // const [data, setData] = useState([]);

  // const getTree = async () => {
  const {data} = request();
  // }

  // useEffect(() => {
  //   getTree();
  // }, []);

  if (data) {
    return (<CascaderSelect changeOnSelect dataSource={data.data} value={value} {...props} />);
  } else {
    return null;
  }

}


export default DeptSelect;