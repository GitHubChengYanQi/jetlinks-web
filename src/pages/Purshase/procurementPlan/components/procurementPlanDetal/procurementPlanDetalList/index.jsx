/**
 * 采购计划单子表整合数据后的子表列表页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef, useState} from 'react';
import {createFormActions} from '@formily/antd';
import {Badge, Button, notification, Table as AntTable} from 'antd';
import Table from '@/components/Table';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import { procurementPlanDetalList} from '../procurementPlanDetalUrl';
import * as SysField from '../procurementPlanDetalField';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ProcurementPlanDetalList = ({value}) => {
  const ref = useRef(null);
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
        <FormItem name="planId" value={value} component={SysField.PlanId} />
      </>
    );
  };

  return (
    <>
      <Table
        bodyStyle={{padding:0}}
        contentHeight
        headStyle={{display: 'none'}}
        api={procurementPlanDetalList}
        rowKey="detailId"
        noRowSelection
        formActions={formActionsPublic}
        searchForm={searchForm}
        actions={actions()}
      >
        <Column title="物料" dataIndex="skuResult" render={(value) => {
          return value && <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="数量" dataIndex="total" width={100} align="center" />
      </Table>
    </>
  );
};

export default ProcurementPlanDetalList;
