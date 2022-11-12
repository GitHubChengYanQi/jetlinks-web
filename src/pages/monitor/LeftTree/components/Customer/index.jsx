import React, {useEffect, useState} from 'react';
import {Spin, Tree} from 'antd';
import {useRequest} from '@/util/Request';
import {customerList} from '@/pages/systemManage/Tenant/url';
import {isArray} from '@/util/Tools';

const limit = 20;

const Customer = ({
  value,
  onChange = () => {
  }
}) => {

  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

  const [add, setAdd] = useState(true);
  console.log(data);

  const customer = document.getElementById('customer');

  const {loading, run} = useRequest(customerList, {
    manual: true,
    onSuccess: (res) => {
      if (isArray(res).length < 2) {
        setAdd(false);
      } else if (customer.scrollHeight === 0) {
        setPage(page + 1);
        run({params: {limit, page: page + 1}});
      }
      setData([...data, ...res]);
    }
  });

  const submit = (page) => {
    setPage(page);
    run({params: {limit, page}});
  };

  useEffect(() => {
    submit(page);
  }, []);

  return <div style={{maxHeight: 'calc(100vh - 210px)', overflow: 'auto'}} id="customer" onScroll={() => {
    if (!loading && add && (customer.scrollTop === customer.scrollHeight - 100)) {
      submit(page + 1);
    }
  }}>
    <Tree
      treeData={data.map(item => ({title: item.name, key: item.deptId}))}
      onSelect={(selectedKeys) => {
        onChange(selectedKeys[0], 'customer');
      }}
    />
    {loading && <div style={{textAlign: 'center'}}><Spin/></div>}
  </div>;
};

export default Customer;
