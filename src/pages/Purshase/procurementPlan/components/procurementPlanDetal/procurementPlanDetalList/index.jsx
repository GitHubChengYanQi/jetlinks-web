/**
 * 采购计划单子表整合数据后的子表列表页
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
import {procurementPlanDetalDelete, procurementPlanDetalList} from '../procurementPlanDetalUrl';
import ProcurementPlanDetalEdit from '../procurementPlanDetalEdit';
import * as SysField from '../procurementPlanDetalField';
import {createFormActions} from '@formily/antd';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ProcurementPlanDetalList = ({value}) => {
  const ref = useRef(null);
  const tableRef = useRef(null);
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
        contentHeight
        rowSelection
        headStyle={{display:'none'}}
        api={procurementPlanDetalList}
        rowKey="detailId"
        formActions={formActionsPublic}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物料" dataIndex="skuResult" render={(value)=>{
          return value && <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="数量" dataIndex="total" width={100} align='center' />
      </Table>
    </>
  );
};

export default ProcurementPlanDetalList;
