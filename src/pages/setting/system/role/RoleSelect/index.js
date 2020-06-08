import React,{useState,useEffect} from 'react';
import {CascaderSelect} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {roleTree} from '@/Config/ApiUrl/system/role';

const RoleSelect  = (props)=>{

  const {value} = props;

  const {request} = useRequest(roleTree);

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

export default RoleSelect;