/**
 * 联系人表列表页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contactsDelete, contactsList} from '../contactsUrl';
import ContactsEdit from '../contactsEdit';
import * as SysField from '../contactsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ContactsList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

 const searchForm = () => {
   return (
     <>
       <FormItem label="联系人id" name="contactsId" component={SysField.ContactsId}/>
       <FormItem label="联系人姓名" name="name" component={SysField.Name}/>
       <FormItem label="职务" name="job" component={SysField.Job}/>
       <FormItem label="联系电话" name="phone" component={SysField.Phone}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={contactsList}
        rowKey="id"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="联系人id" dataIndex="contactsId" />

        <Column title="联系人姓名" dataIndex="name" />
        <Column title="职务" dataIndex="job" />
        <Column title="联系电话" dataIndex="phone" />


        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={contactsDelete} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={ContactsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ContactsList;
