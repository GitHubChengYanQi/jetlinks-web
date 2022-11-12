import React, {useEffect, useState} from 'react';
import {Input, Spin, Tree} from 'antd';
import {useRequest} from '@/util/Request';
import {customerList} from '@/pages/systemManage/Tenant/url';
import {isArray} from '@/util/Tools';

const limit = 5;

const Customer = ({
  value,
  onChange = () => {
  }
}) => {

  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

  const [add, setAdd] = useState(true);

  const customer = document.getElementById('customer');


  const {loading, run} = useRequest(customerList, {
    manual: true,
    onSuccess: (res) => {
      if (isArray(res).length < limit) {
        setAdd(false);
      } else if (customer.clientHeight < (window.innerHeight - 300)) {
        setPage(page + 1);
        run({params: {limit, page: page + 1}});
      }
      setData([...data, ...res]);
    }
  });

  const submit = (page, data) => {
    if (page === 1) {
      setData([]);
    }
    setPage(page);
    run({params: {limit, page}, data});
  };

  useEffect(() => {
    submit(page);
  }, []);

  return <div>
    <Input placeholder="搜索客户" style={{marginBottom: 16}} onChange={({target: {value}}) => submit(1, {name: value})} />
    <div style={{maxHeight: 'calc(100vh - 300px)', overflow: 'auto'}} id="customer" onScroll={() => {
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
    </div>
    {loading && <div style={{textAlign: 'center'}}><Spin /></div>}
  </div>;
};

export default Customer;
