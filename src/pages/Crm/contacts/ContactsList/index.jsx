/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import {Button, Divider, Input, Modal as AntModal, Space, Table as AntTable, Tag} from 'antd';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {ExclamationCircleOutlined, SearchOutlined} from '@ant-design/icons';
import Table from '@/components/Table';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import Icon from '@/components/Icon';
import {contactsBind, contactsList} from '@/pages/Crm/contacts/contactsUrl';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';
import * as SysField from '@/pages/Crm/contacts/ContactsField';
import {useRequest} from '@/util/Request';
import {customerEdit} from '@/pages/Crm/customer/CustomerUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ContactsTable = (props) => {

  const {customer, refresh} = props;

  const [newCustomerId, setNewCustomerId] = useState();

  const ref = useRef(null);
  const tableRef = useRef(null);
  const submitRef = useRef(null);

  const {run} = useRequest(contactsBind, {
    manual: true, onSuccess: () => {
      tableRef.current.submit();
    }
  });

  const {run: editCustomer} = useRequest(customerEdit,
    {
      manual: true,
      onSuccess: () => {
        if (typeof refresh === 'function')
          refresh();
      }
    });

  const defaultContacts = (name, contactsId) => {
    AntModal.confirm({
      title: `是否将[${name}]设为默认联系人?`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await editCustomer({
          data: {
            customerId: customer.customerId,
            defaultContacts: contactsId
          }
        });
      },
    });
  };

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };


  const [search, setSearch] = useState(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="职务" name="companyRole" component={SysField.Job} />
        </>
      );
    };


    return (
      <Space wrap>
        <FormItem mega-props={{span: 1}} placeholder="联系人姓名" name="contactsName" component={SysField.ContactsName} />
        {search ? formItem() : null}
      </Space>
    );
  };


  const Search = () => {
    return (
      <>
        <FormButtonGroup>
          <Submit><SearchOutlined />查询</Submit>
          <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
            if (search) {
              setSearch(false);
            } else {
              setSearch(true);
            }
          }}>
            <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
          {customer && <FormItem
            hidden
            value={customer.customerId || ' '}
            name="customerId"
            component={SysField.Customer} />}
        </FormButtonGroup>
      </>
    );
  };

  const confirmOutStock = (record) => {
    AntModal.confirm({
      title: '联系人离职',
      centered: true,
      content: <>
        请确认离职操作
        <Input onChange={(value) => {
          setNewCustomerId(value.target.value);
        }} />
      </>,
      cancelText: '取消',
      onOk: async () => {
        console.log(newCustomerId);
        // await run({
        //   data: {
        //     customerId: record.customerResults && record.customerResults.length > 0 && record.customerResults[0].customerId,
        //     contactsId: record.contactsId,
        //     display: 0,
        //   }
        // });
        // tableRef.current.submit();
      },
      onCancel: () => {
        tableRef.current.submit();
      }
    });
  };


  return (
    <>
      {customer && <Divider orientation="right">
        <AddButton ghost onClick={() => {
          ref.current.open(false);
        }} />
      </Divider>}
      <Table
        headStyle={{display: customer && 'none'}}
        bodyStyle={{padding: customer && 0}}
        bordered={!customer}
        title={<Breadcrumb />}
        formActions={formActionsPublic}
        api={contactsList}
        rowKey="contactsId"
        searchForm={searchForm}
        SearchButton={Search()}
        tableKey="contacts"
        isModal={false}
        layout={search}
        actions={actions()}
        ref={tableRef}
      >
        <Column key={1} title="联系人姓名" fixed align="center" width={120} dataIndex="contactsName" />
        <Column key={2} title="部门" align="center" dataIndex="deptResult" width={200} render={(value) => {
          return (
            <>
              {value && value.fullName}
            </>
          );
        }} />
        <Column key={3} title="职务" align="center" width={200} render={(value, record) => {
          return (
            <>
              {record.companyRoleResult && record.companyRoleResult.position}
            </>
          );
        }} />
        {!customer && <Column key={4} title="关联客户" width={300} dataIndex="clientId" render={(value, record) => {
          return (
            record.customerResults && record.customerResults.map((item) => {
              return item.customerName;
            }).toString()
          );
        }} />}

        <Column key={5} title="联系电话" width={300} dataIndex="phone" render={(value, record) => {
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
        <Column key={5} title="固定电话" width={300} dataIndex="phone" render={(value, record) => {
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
                      {value.telephone}
                    </Tag>
                  );
                }) : null
              }
            </>
          );

        }} />
        <Column />
        <Column key={6} title="操作" fixed="right" width={customer ? 260 : 150} align="right" render={(value, record) => {
          const isDefaultContacts = customer && record.contactsId === customer.defaultContacts;
          return (
            <>
              {customer && <Button disabled={isDefaultContacts} type="link" onClick={() => {
                defaultContacts(record.contactsName, record.contactsId);
              }}>{isDefaultContacts ? '已设为默认联系人' : '设为默认联系人'}</Button>}
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <Button size="small" type="link" danger onClick={() => {
                confirmOutStock(record);
              }}>离职</Button>
            </>
          );
        }} />
      </Table>
      <Modal
        width={800}
        title="联系人"
        component={ContactsEdit}
        customerId={customer && customer.customerId}
        onSuccess={() => {
          tableRef.current.refresh();
          ref.current.close();
        }} ref={ref}
        compoentRef={submitRef}
        footer={
          <>
            <Button type="primary" onClick={() => {
              submitRef.current.submit();
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

export default ContactsTable;
