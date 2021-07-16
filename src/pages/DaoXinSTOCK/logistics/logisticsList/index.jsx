/**
 * 物流表列表页
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
import {logisticsDelete, logisticsList} from '../logisticsUrl';
import LogisticsEdit from '../logisticsEdit';
import * as SysField from '../logisticsField';

const {Column} = AntTable;
const {FormItem} = Form;

const LogisticsList = () => {
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
       <FormItem label="发货编号" name="orderId" component={SysField.OrderId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={logisticsList}
        rowKey="logisticsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="发货编号" dataIndex="orderId"/>
        <Column title="客户id" dataIndex="clientId"/>
        <Column title="当前位置" dataIndex="position"/>
        <Column title="到货地址" dataIndex="adress"/>
        <Column title="物流电话" dataIndex="phone"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.logisticsId);
              }}/>
              <DelButton api={logisticsDelete} value={record.logisticsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={LogisticsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default LogisticsList;
