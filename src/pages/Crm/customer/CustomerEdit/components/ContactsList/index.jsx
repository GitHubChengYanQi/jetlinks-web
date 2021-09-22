/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef} from 'react';
import {Button, Divider, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contactsBind, contactsDelete, contactsList} from '@/pages/Crm/contacts/contactsUrl';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import * as SysField from '@/pages/Crm/business/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import CheckButton from '@/components/CheckButton';
import PhoneList from '@/pages/Crm/phone/phoneList';
import Modal2 from '@/components/Modal';
import {Tag} from '@alifd/next';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ContactsList = (props) => {
  const {customerId, choose} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  const submitRef = useRef(null);

  const {run} = useRequest(contactsBind, {manual: true});


  const searchForm = () => {
    return (
      <>
        <FormItem style={{display: 'none'}} value={customerId || ' '} name="customerId" component={SysField.SalesId} />
      </>
    );
  };


  return (
    <>
      <Divider>
        <AddButton ghost onClick={() => {
          ref.current.open(false);
        }} />
      </Divider>
      <Table
        bordered={false}
        formActions={formActionsPublic}
        bodyStyle={{padding: 0}}
        headStyle={{display: 'none'}}
        api={contactsList}
        rowKey="contactsId"
        ref={tableRef}
        showSearchButton={false}
        searchForm={searchForm}
      >
        <Column title="联系人姓名" fixed align="center" width={120} dataIndex="contactsName" />
        <Column title="职务" align="center" width={200} render={(value, record) => {
          return (
            <>
              {record.companyRoleResult && record.companyRoleResult.position}
            </>
          );
        }} />
        <Column title="客户名称" dataIndex="clientId" render={(value, record) => {
          return (
            record.customerResult ? record.customerResult.customerName : null
          );
        }} />

        <Column title="联系电话" dataIndex="phone" render={(value, record) => {
          return (
            <>
              {
                record.phoneParams && record.phoneParams.length > 0 ? record.phoneParams.map((value, index) => {
                  return (
                    <Tag
                      key={index}
                      color="blue"
                      style={{marginRight: 3}}
                    >
                      {value.phoneNumber}
                    </Tag>
                  );
                }) : null
              }
            </>
          );

        }} />
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
              <Button type="link" size="small" danger onClick={async () => {
                await run({
                  data: {
                    customerId: record.customerId,
                    contactsId: record.contactsId
                  }
                });
              }}>离职</Button>
            </>
          );
        }} width={300} />
      </Table>
      <Modal
        width={1000}
        title="联系人"
        component={ContactsEdit}
        customerId={customerId}
        onSuccess={() => {
          tableRef.current.refresh();
          ref.current.close();
        }} ref={ref}
        compoentRef={submitRef}
        footer={
          <>
            <Button type="primary" onClick={() => {
              submitRef.current.formRef.current.submit();
            }}>
              保存
            </Button>
            <Button onClick={() => {
              ref.current.close();
            }}>
              取消
            </Button>
          </>}
      />
    </>
  );
};

export default ContactsList;
