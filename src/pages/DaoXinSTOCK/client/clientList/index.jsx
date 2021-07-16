/**
 * 客户表列表页
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {clientDelete, clientList} from '../clientUrl';
import ClientEdit from '../clientEdit';
import * as SysField from '../clientField';

const {Column} = AntTable;
const {FormItem} = Form;

const ClientList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

 const searchForm = () => {
   return (
     <>
       <FormItem label="姓名" name="name" component={SysField.Name}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={clientList}
        rowKey="clientId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="姓名" dataIndex="name"/>
        <Column title="居住地址" dataIndex="adress"/>
        <Column title="联系电话" dataIndex="phone"/>
        <Column title="订单号" dataIndex="orderId"/>
        <Column title="下单时间" dataIndex="orderTime"/>
        <Column title="价格" dataIndex="price"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.clientId);
              }}/>
              <DelButton api={clientDelete} value={record.clientId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ClientEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ClientList;
