/**
 * 二维码绑定列表页
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {orCodeBindDelete, orCodeBindList} from '../orCodeBindUrl';
import OrCodeBindEdit from '../orCodeBindEdit';
import * as SysField from '../orCodeBindField';
import Breadcrumb from '@/components/Breadcrumb';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;
const {FormItem} = Form;

const OrCodeBindList = () => {
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
        <FormItem label="来源" name="source" component={SysField.Source} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={orCodeBindList}
        rowKey="orCodeBindId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="码" dataIndex="orCodeId" render={(value)=>{
          return (
            <Code value={value} />
          );
        }} />
        <Column title="来源" dataIndex="source" />
        <Column title="关联" dataIndex="formId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.orCodeBindId);
              }} />
              <DelButton api={orCodeBindDelete} value={record.orCodeBindId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={OrCodeBindEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default OrCodeBindList;
