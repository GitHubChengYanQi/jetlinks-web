/**
 * 列表页
 *
 * @author song
 * @Date 2021-09-15 09:42:47
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {applyDetailsDelete, applyDetailsList} from '../applyDetailsUrl';
import ApplyDetailsEdit from '../applyDetailsEdit';
import * as SysField from '../applyDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ApplyDetailsList = () => {
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
       <FormItem label="产品id" name="itemId" component={SysField.ItemId}/>
       <FormItem label="品牌id" name="brandId" component={SysField.BrandId}/>
       <FormItem label="发货申请id" name="outstockApplyId" component={SysField.OutstockApplyId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={applyDetailsList}
        rowKey="outstockApplyDetailsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品id" dataIndex="itemId"/>
        <Column title="品牌id" dataIndex="brandId"/>
        <Column title="发货申请id" dataIndex="outstockApplyId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.outstockApplyDetailsId);
              }}/>
              <DelButton api={applyDetailsDelete} value={record.outstockApplyDetailsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ApplyDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ApplyDetailsList;
