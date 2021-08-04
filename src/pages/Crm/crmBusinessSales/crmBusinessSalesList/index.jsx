/**
 * 销售列表页
 *
 * @author
 * @Date 2021-08-02 15:47:16
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {crmBusinessSalesDelete, crmBusinessSalesList} from '../crmBusinessSalesUrl';
import CrmBusinessSalesEdit from '../crmBusinessSalesEdit';
import * as SysField from '../crmBusinessSalesField';
import Modal2 from '@/components/Modal';
import CrmBusinessSalesProcessList from '@/pages/Crm/crmBusinessSalesProcess/crmBusinessSalesProcessList';

const {Column} = AntTable;
const {FormItem} = Form;

const CrmBusinessSalesList = () => {
  const ref = useRef(null);
  const refCrmBusinessSalesProcessList = useRef(null);
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
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={crmBusinessSalesList}
        rowKey="salesId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="名称" dataIndex="name" render={(text, record, index) => {
          return (
            <Button type="link" onClick={() => {
              refCrmBusinessSalesProcessList.current.open(record.salesId);
            }}>{text}</Button>
          );
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.salesId);
              }} />
              <DelButton api={crmBusinessSalesDelete} value={record.salesId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={800} title="编辑" component={CrmBusinessSalesEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />

      <Modal2 width={800} title="编辑" component={CrmBusinessSalesProcessList} onSuccess={() => {
        refCrmBusinessSalesProcessList.current.close();
      }} ref={refCrmBusinessSalesProcessList} />
    </>
  );
};

export default CrmBusinessSalesList;
