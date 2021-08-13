/**
 * 列表页
 *
 * @author cheng
 * @Date 2021-08-12 08:47:13
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {phoneDelete, phoneList} from '../phoneUrl';
import PhoneEdit from '../phoneEdit';
import * as SysField from '../phoneField';

const {Column} = AntTable;
const {FormItem} = Form;

const PhoneList = (props) => {
  const {value, choose} = props;
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
        <FormItem hidden contactsid={value} name="contactsId" component={SysField.ContactsId} />
        <FormItem label="电话号码" name="phoneNumber" component={SysField.PhoneNumber} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={phoneList}
        rowKey="phoneId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="电话号码" dataIndex="phoneNumber" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.phoneId);
              }} />
              <DelButton api={phoneDelete} value={record.phoneId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={PhoneEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} contactsId={value} />
    </>
  );
};

export default PhoneList;
