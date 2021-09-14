import React, {useRef, useState, useEffect} from 'react';
import { Table as AntTable} from 'antd';
import Form from "@/components/Form";

const TableList = (props) => {
  const {value} = props;
  // const data = value.map((value, index) => {
  //   return {
  //     itemid: value.Itemid,
  //     saleprice: 'John Brown',
  //     quantity: 32,
  //     totalprice: 'New York No. 1 Lake Park'
  //   };
  // });


  const columns = [
    { title: '产品名称', dataIndex: 'itemId', key: 'itemid' },
    { title: '销售单价', dataIndex: 'salePrice', key: 'saleprice' },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '小计', dataIndex: 'totalPrice', key: 'totalprice' }
  ];
  return (
    <>
      <AntTable columns={columns} dataSource={value} bordered />
    </>
  );
};
export default TableList;
