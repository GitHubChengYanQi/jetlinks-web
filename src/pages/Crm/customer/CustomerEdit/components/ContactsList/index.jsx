/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef} from 'react';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contactsDelete, contactsList} from '@/pages/Crm/contacts/contactsUrl';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import * as SysField from '@/pages/Crm/business/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const ContactsList = (props) => {
  const {customerId} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);

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
        <Column title="联系人姓名" dataIndex="contactsName" />
        <Column title="职务" dataIndex="job" />
        <Column title="联系电话" dataIndex="phone" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
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
      <Drawer width={800} title="编辑" component={Index} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ContactsList;
