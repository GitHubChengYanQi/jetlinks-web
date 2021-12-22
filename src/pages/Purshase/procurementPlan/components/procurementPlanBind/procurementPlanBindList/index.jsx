/**
 * 列表页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {procurementPlanBindDelete, procurementPlanBindList} from '../procurementPlanBindUrl';
import ProcurementPlanBindEdit from '../procurementPlanBindEdit';
import * as SysField from '../procurementPlanBindField';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementPlanBindList = () => {
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
       <FormItem label="采购计划id" name="procurementPlanId" component={SysField.ProcurementPlanId}/>
       <FormItem label="申请单id" name="askId" component={SysField.AskId}/>
       <FormItem label="申请单绑定详情id" name="askDetailId" component={SysField.AskDetailId}/>
       <FormItem label="删除状态" name="display" component={SysField.Display}/>
       <FormItem label="" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="" name="updateTime" component={SysField.UpdateTime}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={procurementPlanBindList}
        rowKey="detailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="采购计划id" dataIndex="procurementPlanId"/>
        <Column title="申请单id" dataIndex="askId"/>
        <Column title="申请单绑定详情id" dataIndex="askDetailId"/>
        <Column title="删除状态" dataIndex="display"/>
        <Column title="" dataIndex="createUser"/>
        <Column title="" dataIndex="updateUser"/>
        <Column title="" dataIndex="createTime"/>
        <Column title="" dataIndex="updateTime"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.detailId);
              }}/>
              <DelButton api={procurementPlanBindDelete} value={record.detailId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ProcurementPlanBindEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ProcurementPlanBindList;
