import React, {useState} from 'react';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import ProductOrderTable from '@/pages/Erp/productOrder/components/ProductOrderTable';


const ProductOrderList = () => {

  const [state, setState] = useState();

  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setState(value);
          }}
          showLine
          defaultExpandedKeys={[' ']}
          treeData={[
            {
              title: '所有订单',
              key: ' ',
              children: [
                {
                  title: '已付款',
                  key: '1',
                },
                {
                  title: '未付款',
                  key: '0',
                },
              ],
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout>
      <ProductOrderTable left={Left()} state={state}  />
    </ListLayout>
  );
};
export default ProductOrderList;
