/**
 * 销售流程列表页
 *
 * @author
 * @Date 2021-08-02 15:47:16
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {crmBusinessSalesProcessDelete, crmBusinessSalesProcessList} from '../crmBusinessSalesProcessUrl';
import CrmBusinessSalesProcessEdit from '../crmBusinessSalesProcessEdit';
import * as SysField from '../crmBusinessSalesProcessField';

const {Column} = AntTable;
const {FormItem} = Form;

const CrmBusinessSalesProcessList = (props) => {
  const {value} = props;

  const [sort,setSort] = useState();

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
        <FormItem label="流程名称" name="name" component={SysField.SalesId} />
        <FormItem style={{display: 'none'}} value={value} name="salesId" component={SysField.SalesId} />
      </>
    );
  };


  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={crmBusinessSalesProcessList}
        rowKey="salesProcessId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="流程名称" dataIndex="name" />
        <Column title="百分比" dataIndex="percentage" />
        <Column title="流程说明" dataIndex="note" />
        <Column title="排序" dataIndex="sort" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.salesProcessId);
              }} />
              <DelButton api={crmBusinessSalesProcessDelete} value={record.salesProcessId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={CrmBusinessSalesProcessEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CrmBusinessSalesProcessList;
