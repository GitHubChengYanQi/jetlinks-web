/**
 * 质检方案列表页
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
import {qualityPlanDelete, qualityPlanList} from '../qualityPlanUrl';
import QualityPlanEdit from '../qualityPlanEdit';
import * as SysField from '../qualityPlanField';
import Breadcrumb from '@/components/Breadcrumb';
import {useHistory} from 'ice';
import {Name} from '../qualityPlanField';

const {Column} = AntTable;
const {FormItem} = Form;

const QualityPlanList = (props) => {
  const history = useHistory();
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          history.push('/production/qualityCheck/add');
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="方案名称" name="planName" component={SysField.Name} />
        <FormItem label="状态" name="planStatus" component={SysField.PlanStatus} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={qualityPlanList}
        rowKey="qualityPlanId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        {...props}
      >
        <Column title="方案名称" dataIndex="planName" />
        <Column title="质检类型" dataIndex="planType" render={(value)=>{
          switch (value){
            case '1':
              return <>生产检</>;
            case '2':
              return <>巡检</>;
            default:
              break;
          }
        }} />
        <Column title="检查类型" dataIndex="testingType" render={(value)=>{
          switch (value){
            case '1':
              return <>抽检检查</>;
            case '2':
              return <>固定检查</>;
            default:
              break;
          }
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                history.push(`/production/qualityCheck/add?id=${record.qualityPlanId}`);
              }} />
              <DelButton api={qualityPlanDelete} value={record.qualityPlanId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
    </>
  );
};

export default QualityPlanList;
