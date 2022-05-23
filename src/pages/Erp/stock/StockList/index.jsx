/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useState} from 'react';
import {Input, Spin, Tree} from 'antd';
import {storehouse} from '../StockUrl';
import {useRequest} from '@/util/Request';
import ListLayout from '@/layouts/ListLayout';
import StockTable from '@/pages/Erp/stock/StockTable';

const StockList = () => {

  const {loading, data, run} = useRequest(storehouse);

  const Storehouse = data ? data.map((values) => {
    return {
      title: values.label,
      key: values.value,
    };
  }) : [];

  const [storeHouse, setStoreHouse] = useState(undefined);

  const Left = () => {
    return (
      <>
        <Input allowClear placeholder="搜索仓库" bordered={false} onChange={(value) => {
          run({
            data: {
              name: value.target.value,
            }
          });
        }} />
        {
          loading ?
            <div style={{padding:16}}><Spin size="large" /></div>
            :
            <Tree
              showLine
              checkedKeys={storeHouse}
              onSelect={(value) => {
                setStoreHouse(value);
              }}
              defaultExpandedKeys={['']}
              treeData={[
                {
                  title: '所有仓库',
                  key: '',
                  children: Storehouse
                },
              ]}
            />
        }
      </>);
  };
  return (
    <ListLayout>
      <StockTable left={Left()} storeHouse={storeHouse} />
    </ListLayout>
  );
};

export default StockList;
