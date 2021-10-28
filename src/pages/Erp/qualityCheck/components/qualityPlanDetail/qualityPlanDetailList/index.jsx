/**
 * 质检方案详情列表页
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {qualityPlanDetailDelete, qualityPlanDetailList} from '../qualityPlanDetailUrl';
import QualityPlanDetailEdit from '../qualityPlanDetailEdit';
import * as SysField from '../qualityPlanDetailField';

const {Column} = AntTable;
const {FormItem} = Form;

const QualityPlanDetailList = () => {
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
       <FormItem label="关联质检方案表主键id" name="planId" component={SysField.PlanId}/>
       <FormItem label="质检项id" name="qualityCheckId" component={SysField.QualityCheckId}/>
       <FormItem label="状态" name="display" component={SysField.Display}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={qualityPlanDetailList}
        rowKey="planDetailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="关联质检方案表主键id" dataIndex="planId"/>
        <Column title="质检项id" dataIndex="qualityCheckId"/>
        <Column title="运算符" dataIndex="operator"/>
        <Column title="标准值" dataIndex="standardValue"/>
        <Column title="抽检类型" dataIndex="testingType"/>
        <Column title="质检数量" dataIndex="qualityAmount"/>
        <Column title="质检比例" dataIndex="qualityProportion"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column title="修改时间" dataIndex="updateTime"/>
        <Column title="创建者" dataIndex="createUser"/>
        <Column title="修改者" dataIndex="updateUser"/>
        <Column title="状态" dataIndex="display"/>
        <Column title="部门编号" dataIndex="deptId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.planDetailId);
              }}/>
              <DelButton api={qualityPlanDetailDelete} value={record.planDetailId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={QualityPlanDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default QualityPlanDetailList;
