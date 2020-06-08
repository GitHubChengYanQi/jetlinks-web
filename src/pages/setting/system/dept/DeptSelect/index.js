import React, {useState, useEffect} from 'react';
import {CascaderSelect} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {deptTree} from '@/Config/ApiUrl/system/dept';


const DeptSelect = (props) => {
  const {value} = props;

  const {request} = useRequest(deptTree);

  const [data, setData] = useState([]);

  const getTree = async () => {
    const {error, response} = await request();
    if (!error) {
      setData(response.data);
    }
  }

  useEffect(() => {
    getTree();
  }, []);

  return (<CascaderSelect changeOnSelect dataSource={data} value={value} {...props} />)
}


export default DeptSelect;