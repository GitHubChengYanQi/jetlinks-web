import React, {useEffect, useState} from 'react';
import {Tree} from 'antd';
import {useRequest} from '@/util/Request';
import {customerList} from '@/pages/systemManage/Tenant/url';

const Customer = ({
  value,
  onChange = () => {
  }
}) => {
  console.log(value);
  const [data, setData] = useState([]);

  const {loading, run} = useRequest(customerList, {
    manual: true,
    onSuccess: (res) => {
      setData(res);
    }
  });

  useEffect(() => {
    run();
  }, []);

  return <>
    <Tree
      treeData={data.map(item => ({title: item.name, key: item.customerId}))}
      onSelect={(selectedKeys) => {
        console.log(selectedKeys);
        onChange(selectedKeys[0], 'customer');
      }}
    />
  </>;
};

export default Customer;
