/**
 * 商机明细表列表页
 *
 * @author qr
 * @Date 2021-08-04 13:17:57
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {crmBusinessDetailedDelete, crmBusinessDetailedList} from '../crmBusinessDetailedUrl';
import CrmBusinessDetailedEdit from '../crmBusinessDetailedEdit';
import * as SysField from '../crmBusinessDetailedField';

const {Column} = AntTable;
const {FormItem} = Form;

const CrmBusinessDetailedList = () => {
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
       <FormItem label="商机id" name="businessId" component={SysField.BusinessId}/>
       <FormItem label="物品id" name="itemId" component={SysField.ItemId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={crmBusinessDetailedList}
        rowKey="id"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="商机id" dataIndex="businessId"/>
        <Column title="物品id" dataIndex="itemId"/>
        <Column title="物品数量" dataIndex="quantity"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={crmBusinessDetailedDelete} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={CrmBusinessDetailedEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default CrmBusinessDetailedList;
