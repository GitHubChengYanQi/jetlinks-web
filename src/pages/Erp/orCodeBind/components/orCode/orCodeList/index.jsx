/**
 * 二维码列表页
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
import {orCodeDelete, orCodeList} from '../orCodeUrl';
import OrCodeEdit from '../orCodeEdit';
import * as SysField from '../orCodeField';
import Breadcrumb from '@/components/Breadcrumb';
import {ScanOutlined} from '@ant-design/icons';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;
const {FormItem} = Form;

const OrCodeList = () => {
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
        <FormItem label="类型" name="type" component={SysField.Type} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={orCodeList}
        rowKey="orCodeId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title={<ScanOutlined />} align='center' width={20} render={(value,record)=>{
          return (<Code value={record.orCodeId} />);
        }} />
        <Column title="类型" dataIndex="type" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.orCodeId);
              }} />
              <DelButton api={orCodeDelete} value={record.orCodeId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={OrCodeEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default OrCodeList;
