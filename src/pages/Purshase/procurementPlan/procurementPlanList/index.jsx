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
import {procurementPlanDetail, procurementPlanList} from '../procurementPlanUrl';
import * as SysField from '../procurementPlanField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';
import Quote from '@/pages/Purshase/Quote';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementPlanList = () => {

  const tableRef = useRef(null);
  const quoteRef = useRef(null);
  const addQuoteRef = useRef(null);
  const history = useHistory();

  const {run} = useRequest(procurementPlanDetail, {
    manual: true,
    onSuccess: (res) => {
      quoteRef.current.open({
        skus: res && res.detalResults && res.detalResults.map((item) => {
          return {
            skuId: item.skuId,
            skuResult: item.skuResult,
            number: item.total
          };
        }), sourceId: res.procurementPlanId, source: 'purchasePlan'
      });
    }
  });

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
        <Column title="采购计划名称" dataIndex="procurementPlanName" render={(value, record) => {
          return <Button type="link" onClick={() => {
            history.push(`/purchase/procurementPlan/${record.procurementPlanId}`);
          }}>{value}</Button>;
        }} />
        <Column title="创建人" dataIndex="user" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="备注" dataIndex="remark" />
        <Column title="状态" dataIndex="status" width={100} align="center" render={(value) => {
          switch (value) {
            case 0:
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
      </Table>
    </>
  );
};

export default ProcurementPlanList;
