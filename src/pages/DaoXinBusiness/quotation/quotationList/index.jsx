/**
 * 报价表列表页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {quotationDelete, quotationList} from '../quotationUrl';
import QuotationEdit from '../quotationEdit';
import * as SysField from '../quotationField';

const {Column} = AntTable;
const {FormItem} = Form;

const QuotationList = () => {
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
       <FormItem label="商机名称" name="name" component={SysField.BusinessId}/>
       <FormItem label="商品名称" name="iname" component={SysField.StockId}/>
       <FormItem label="报价时间" name="time" component={SysField.Time}/>
       <FormItem label="报价阶段" name="stage" component={SysField.Stage}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={quotationList}
        rowKey="quotationId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="商机名称" dataIndex="name"/>
        <Column title="商品名称" dataIndex="iname"/>
        <Column title="报价金额" dataIndex="money"/>
        <Column title="数量" dataIndex="number"/>
        <Column title="报价时间" dataIndex="time"/>
        <Column title="报价阶段" dataIndex="stage"/>
        <Column title="备注" dataIndex="note"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.quotationId);
              }}/>
              <DelButton api={quotationDelete} value={record.quotationId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={QuotationEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default QuotationList;