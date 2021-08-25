/**
 * 报修列表页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {repairDelete, repairEdit, repairList} from '../repairUrl';
import RepairEdit from '../repairEdit';
import * as SysField from '../repairField';
import Modal from '@/components/Modal';
import {useHistory} from 'ice';
import DispatchingEdit from '@/pages/Portal/dispatching/dispatchingEdit';
import {useRequest} from '@/util/Request';
import Breadcrumb from '@/components/Breadcrumb';
import {Items} from '../repairField';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';

const {Column} = AntTable;
const {FormItem} = Form;

const RepairList = () => {
  const ref = useRef(null);
  const refDispatching = useRef(null);
  const history = useHistory();
  const tableRef = useRef(null);

  const [repairid,setRepairId] = useState();

  const {run} = useRequest(repairEdit,{manual:true});

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="报修单位" name="companyId" component={SysField.CompanyId} />
        <FormItem label="设备" name="itemId" component={SysField.Items} />
        <FormItem label="服务类型" name="serviceType" component={SysField.ServiceType} />
        {/*<FormItem label="工程进度" name="progress" component={SysField.Progress} />*/}
        <FormItem label="质保类型" name="qualityType" component={SysField.QualityType} />
        <FormItem label="合同类型" name="contractType" component={SysField.ContractType} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={repairList}
        rowKey="repairId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="出厂编号" dataIndex="number" render={(text, record) => {
          return (
            <>
              {record.deliveryDetailsResult && record.deliveryDetailsResult.stockItemId}
            </>
          );
        }} />
        <Column title="设备名称" dataIndex="itemId" render={(text, record) => {
          return (
            <Button type="link" onClick={() => {
              history.push(`/protal/repair/${record.repairId}`);
            }}>{record.deliveryDetailsResult && record.deliveryDetailsResult.detailesItems && record.deliveryDetailsResult.detailesItems.name}</Button>
          );
        }} />
        <Column title="使用单位" dataIndex="customerId" render={(text, record) => {
          return (
            <>
              {record.customerResult && record.customerResult.customerName}
            </>
          );
        }} />
        <Column title="服务类型" dataIndex="serviceType" />
        <Column title="期望到达日期" dataIndex="expectTime" />
        <Column title="描述" dataIndex="comment" />
        <Column title="工程进度" dataIndex="progress" render={(value,record)=>{
          return (
            <BadgeState
              state={record.progress}
              text={['待派工','接单中' ,'实施中','完成','评价']}
              color={['red','yellow' ,'green','blue','pink']} />
          );
        }} />
        <Column title="维修费用" dataIndex="money" />
        <Column title="质保类型" dataIndex="qualityType"  render={(text, record) => {
          return (
            <>{record.deliveryDetailsResult && record.deliveryDetailsResult.qualityType}</>
          );
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {record.progress === 0 ?  <Button type="link" onClick={() => {
                setRepairId(record.repairId);
                refDispatching.current.open(record);
              }}>派工</Button> : null}
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <DelButton api={repairDelete} value={record.repairId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={1000} title="保修" component={RepairEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />

      <Modal width={1400} title="派工信息" component={DispatchingEdit} onSuccess={async () => {
        await run(
          {
            data:{
              repairId: repairid,
              progress: 1
            }
          }
        );
        tableRef.current.refresh();
        refDispatching.current.close();
      }} ref={refDispatching} />
    </>
  );
};

export default RepairList;
