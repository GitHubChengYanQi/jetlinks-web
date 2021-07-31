/**
 * 商机表列表页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import * as SysField from '../../BusinessField';
import {businessDelete, businessList} from '../../BusinessUrl';
import BusinessEdit from '../../BusinessEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const BusinessTable = () => {
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
        <FormItem label="客户名称" name="name" component={SysField.ClitenId} />
        <FormItem label="物品名称" name="iname" component={SysField.ClitenId} />
        <FormItem label="机会来源" name="sname" component={SysField.ClitenId} />
        <FormItem label="商机状态" name="state" component={SysField.State} />
        <FormItem label="商机阶段" name="stage" component={SysField.Stage} />
        <FormItem label="负责人" name="person" component={SysField.Person} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={businessList}
        rowKey="businessId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="name" />
        <Column title="物品名称" dataIndex="iname" />
        <Column title="机会来源" dataIndex="sname" />
        <Column title="立项日期" dataIndex="time" />
        <Column title="商机状态" dataIndex="state" />
        <Column title="商机阶段" dataIndex="stage" />
        <Column title="负责人" dataIndex="account" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.businessId);
              }} />
              <DelButton api={businessDelete} value={record.businessId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={800} title="编辑" component={BusinessEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default BusinessTable;
