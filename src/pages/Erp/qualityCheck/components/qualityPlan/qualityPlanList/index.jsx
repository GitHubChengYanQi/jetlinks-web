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

const {Column} = AntTable;
const {FormItem} = Form;

const QualityPlanList = (props) => {
  const ref = useRef(null);
  const history = useHistory();
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          history.push('/ERP/qualityCheck/add');
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="方案名称" name="planName" component={SysField.PlanName} />
        <FormItem label="状态" name="planStatus" component={SysField.PlanStatus} />
        <FormItem label="质检类型" name="planType" component={SysField.PlanType} />
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
        <Column title="状态" dataIndex="planStatus" />
        <Column title="质检类型" dataIndex="planType" />
        <Column title="特别提醒" dataIndex="attentionPlease" />
        <Column title="附件" dataIndex="planAdjunct" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.qualityPlanId);
              }} />
              <DelButton api={qualityPlanDelete} value={record.qualityPlanId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={QualityPlanEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default QualityPlanList;
