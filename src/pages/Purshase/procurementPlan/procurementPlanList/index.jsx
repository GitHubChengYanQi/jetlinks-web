/**
 * 采购计划主表列表页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef} from 'react';
import {Button, Table as AntTable} from 'antd';
import Table from '@/components/Table';
import Form from '@/components/Form';
import {procurementPlanList} from '../procurementPlanUrl';
import * as SysField from '../procurementPlanField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import ProcurementPlanDetalList from '@/pages/Purshase/procurementPlan/components/procurementPlanDetal/procurementPlanDetalList';
import {useRequest} from '@/util/Request';
import Quote from '@/pages/Purshase/Quote';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcurementPlanList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const quoteRef = useRef(null);

  const {run} = useRequest({
    url: '/procurementPlan/detail',
    method: 'POST',
  }, {
    manual: true,
    onSuccess: (res) => {
      const ids = res && res.detalResults && res.detalResults.map((item) => {
        return item.skuId;
      });
      quoteRef.current.open({skus:ids,sourceId:res.procurementPlanId,source:'purchasePlan'});
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
            ref.current.open(record.procurementPlanId);
          }}>{value}</Button>;
        }} />
        <Column title="创建人" dataIndex="user" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="备注" dataIndex="remark" />
        <Column title="操作" align="center" width={100} render={(text, record) => {
          return <>
            <Button type="link" onClick={() => {
              run({
                data: {
                  procurementPlanId: record.procurementPlanId,
                }
              });
            }}>添加报价</Button>
          </>;
        }} />
      </Table>

      <Modal headTitle='添加报价信息' width={1870} ref={quoteRef} component={Quote} onSuccess={() => {
        quoteRef.current.close();
      }} />


      <Modal width={800} headTitle="采购计划详情" component={ProcurementPlanDetalList} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ProcurementPlanList;
