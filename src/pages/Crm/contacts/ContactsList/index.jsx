/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contactsDelete, contactsList} from '../contactsUrl';
import ContactsEdit from '../ContactsEdit';
import * as SysField from '../ContactsField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';

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
       <FormItem label="联系人姓名" name="contactsName" component={SysField.ContactsName}/>
       <FormItem label="职务" name="job" component={SysField.Job}/>
       <FormItem label="联系电话" name="phone" component={SysField.Phone}/>
     </>
    );
  };



  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={contactsList}
        rowKey="contactsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="联系人姓名" dataIndex="contactsName"/>
        <Column title="职务" dataIndex="job"/>
        <Column title="联系电话" dataIndex="phone"/>
        <Column title="部门编号" dataIndex="deptId"/>
        <Column title="客户id" dataIndex="clientId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.contactsId);
              }}/>
              <DelButton api={contactsDelete} value={record.contactsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={800} title="编辑" component={ContactsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ContactsList;
