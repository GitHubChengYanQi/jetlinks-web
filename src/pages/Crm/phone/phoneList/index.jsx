/**
 * 列表页
 *
 * @author cheng
 * @Date 2021-08-12 08:47:13
 */

import React, {useRef} from 'react';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {phoneDelete, phoneList} from '../phoneUrl';
import PhoneEdit from '../phoneEdit';
import * as SysField from '../phoneField';
import Table from '@/components/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const PhoneList = (props) => {
  const {value} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);


  const searchForm = () => {
    return (
      <>
        <FormItem hidden  name="contactsId" component={SysField.ContactsId} value={value === false ? '111' : value} />
      </>
    );
  };

  return (
    <>
      <AddButton type='dashed' name='联系人电话' style={{width:'100%'}} onClick={() => {
        ref.current.open(false);
      }} />
      <Table
        api={phoneList}
        rowKey="phoneId"
        searchForm={searchForm}
        showSearchButton={false}
        isModal={false}
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
      <Drawer width={800} title="电话" component={PhoneEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} contactsId={value || null} />
    </>
  );
};

export default PhoneList;
