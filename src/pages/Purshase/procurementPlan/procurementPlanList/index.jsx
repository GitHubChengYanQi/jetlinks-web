/**
 * 采购计划主表列表页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef} from 'react';
import {Badge, Button, Table as AntTable} from 'antd';
import {useHistory} from 'ice';
import Table from '@/components/Table';
import Form from '@/components/Form';
import {procurementPlanList} from '../procurementPlanUrl';
import * as SysField from '../procurementPlanField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProcurementPlanDetalList
  from '@/pages/Purshase/procurementPlan/components/procurementPlanDetal/procurementPlanDetalList';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementPlanList = () => {

  const tableRef = useRef(null);
  const detailRef = useRef(null);
  const history = useHistory();

  const searchForm = () => {
    return (
      <>
        <FormItem label="采购计划名称" name="procurementPlanName" component={SysField.ProcurementPlanName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        rowSelection
        api={procurementPlanList}
        rowKey="procurementPlanId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="采购计划名称" dataIndex="procurementPlanName"/>
        <Column title="创建人" dataIndex="user" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="备注" dataIndex="remark" />
        <Column title="状态" dataIndex="status" width={100} align="center" render={(value) => {
          switch (value) {
            case 0:
              return <Badge text="审批中" color="yellow" />;
            case 98:
              return <Badge text="进行中" color="blue" />;
            case 97:
              return <Badge text="已拒绝" color="red" />;
            case 99:
              return <Badge text="已完成" color="green" />;
            default:
              break;
          }
        }} />
        <Column />
        <Column width={100} fixed='right' align='center' title='操作' render={(value, record)=>{
          return <Button type="link" disabled={record.status === 0} onClick={() => {
            if (record.status === 97) {
              return detailRef.current.open(record.procurementPlanId);
            }
            history.push(`/purchase/procurementPlan/${record.procurementPlanId}`);
          }}>查看详情</Button>;
        }} />
      </Table>

      <Modal
        headTitle='采购计划详情'
        component={ProcurementPlanDetalList}
        ref={detailRef}
      />
    </>
  );
};

export default ProcurementPlanList;
