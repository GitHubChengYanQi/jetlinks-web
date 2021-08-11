/**
 * 单位表列表页
 *
 * @author cheng
 * @Date 2021-08-11 15:37:57
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {unitDelete, unitList} from '../unitUrl';
import UnitEdit from '../unitEdit';
import * as SysField from '../unitField';

const {Column} = AntTable;
const {FormItem} = Form;

const UnitList = () => {
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
       <FormItem label="单位名称" name="unitName" component={SysField.UnitName}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={unitList}
        rowKey="unitId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="单位名称" dataIndex="unitName"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.unitId);
              }}/>
              <DelButton api={unitDelete} value={record.unitId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={UnitEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default UnitList;
