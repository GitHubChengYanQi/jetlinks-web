/**
 * 报修列表页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {repairDelete, repairList} from '../repairUrl';
import RepairEdit from '../repairEdit';
import * as SysField from '../repairField';

const {Column} = AntTable;
const {FormItem} = Form;

const RepairList = () => {
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
       <FormItem label="报修单位" name="companyId" component={SysField.CompanyId}/>
       <FormItem label="设备id" name="itemId" component={SysField.ItemId}/>
       <FormItem label="服务类型" name="serviceType" component={SysField.ServiceType}/>
       <FormItem label="工程进度" name="progress" component={SysField.Progress}/>
       <FormItem label="质保类型" name="qualityType" component={SysField.QualityType}/>
       <FormItem label="合同类型" name="contractType" component={SysField.ContractType}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={repairList}
        rowKey="repairId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="报修单位" dataIndex="companyId"/>
        <Column title="保修部位图片" dataIndex="itemImgUrl"/>
        <Column title="设备id" dataIndex="itemId"/>
        <Column title="服务类型" dataIndex="serviceType"/>
        <Column title="期望到达日期" dataIndex="expectTime"/>
        <Column title="描述" dataIndex="comment"/>
        <Column title="工程进度" dataIndex="progress"/>
        <Column title="维修费用" dataIndex="money"/>
        <Column title="质保类型" dataIndex="qualityType"/>
        <Column title="合同类型" dataIndex="contractType"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.repairId);
              }}/>
              <DelButton api={repairDelete} value={record.repairId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={RepairEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default RepairList;
