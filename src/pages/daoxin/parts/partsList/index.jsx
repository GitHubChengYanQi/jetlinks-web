/**
 * 清单列表页
 *
 * @author 
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {partsDelete, partsList} from '../partsUrl';
import PartsEdit from '../partsEdit';
import * as SysField from '../partsField';

const {Column} = AntTable;
const {FormItem} = Form;

const PartsList = () => {
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
       <FormItem label="物品id" name="itemId" component={SysField.ItemId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={partsList}
        rowKey="partsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物品id" dataIndex="itemId"/>
        <Column title="品牌id" dataIndex="brandId"/>
        <Column title="零件数量" dataIndex="number"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.partsId);
              }}/>
              <DelButton api={partsDelete} value={record.partsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={PartsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default PartsList;
