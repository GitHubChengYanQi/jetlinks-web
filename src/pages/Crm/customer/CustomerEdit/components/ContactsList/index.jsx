/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef} from 'react';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contactsDelete, contactsList} from '@/pages/Crm/contacts/contactsUrl';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import * as SysField from '@/pages/Crm/business/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import CheckButton from '@/components/CheckButton';
import PhoneList from '@/pages/Crm/phone/phoneList';
import Modal2 from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const ContactsList = (props) => {
  const {customerId,choose} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  const refPhone = useRef(null);

  useEffect(()=>{
    if (customerId) {
      tableRef.current.formActions.setFieldValue('customerId', customerId);
      tableRef.current.submit();
    }
  },[customerId]);

  const searchForm = () => {
    return (
      <>
        <FormItem style={{display: 'none'}} value={customerId} name="customerId" component={SysField.SalesId} />
      </>
    );
  };




  return (
    <>
      <Table
        api={contactsList}
        rowKey="contactsId"
        ref={tableRef}
        showSearchButton={false}
        searchForm={searchForm}
      >
        <Column title="联系人姓名" dataIndex="contactsName" render={(text, record) => {
          return (
            <Button size="small" type="link" onClick={() => {
              refPhone.current.open(record.contactsId);
            }}>{text}</Button>
          );
        }} />
        <Column title="职务" dataIndex="job" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {choose ? <CheckButton onClick={() => {
                choose(record);
                props.onSuccess();
              }} /> : null}
              <EditButton onClick={() => {
                ref.current.open(record.contactsId);
              }} />
              <DelButton api={contactsDelete} value={record.contactsId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <div style={{textAlign:'center'}}>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </div>
      <Drawer width={800} title="编辑" component={Index} customerId={customerId} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal2 width={800}  component={PhoneList} onSuccess={() => {
        refPhone.current.close();
      }} ref={refPhone} />
    </>
  );
};

export default ContactsList;
