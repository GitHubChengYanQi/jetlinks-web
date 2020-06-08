import React, {useState, forwardRef, useEffect} from 'react';
import {Select, Field} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {positionAllList} from '@/Config/ApiUrl/system/position';


const PositionSelect = (props) => {
  const {value} = props;

  const {request} = useRequest(positionAllList);

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

  return (<Select mode="multiple" dataSource={data} value={value} {...props} />)
}

export default PositionSelect;