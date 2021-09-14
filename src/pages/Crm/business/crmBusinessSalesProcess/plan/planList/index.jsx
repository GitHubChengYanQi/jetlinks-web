/**
 * 列表页
 *
 * @author song
 * @Date 2021-09-14 14:36:34
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {planDelete, planList} from '../planUrl';
import PlanEdit from '../planEdit';
import * as SysField from '../planField';

const {Column} = AntTable;
const {FormItem} = Form;

const PlanList = () => {
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
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={planList}
        rowKey="salesProcessPlanId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.salesProcessPlanId);
              }}/>
              <DelButton api={planDelete} value={record.salesProcessPlanId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={PlanEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default PlanList;
