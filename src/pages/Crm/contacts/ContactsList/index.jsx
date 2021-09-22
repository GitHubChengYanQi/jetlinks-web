/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import CheckButton from '@/components/CheckButton';
import PhoneList from '@/pages/Crm/phone/phoneList';
import {batchDelete, contactsDelete, contactsList} from '@/pages/Crm/contacts/contactsUrl';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';
import * as SysField from '@/pages/Crm/contacts/ContactsField';
import {Tag} from '@alifd/next';
import {CustomerIds} from '@/pages/Crm/contacts/ContactsField';

const {Column} = AntTable;
const {FormItem} = Form;

const ContactsTable = (props) => {

  const {choose} = props;
  const [phone, setPhone] = useState(null);

  // const {data, run:getPhone} = useRequest(phoneList, {
  //   manual: true,
  // });

  const ref = useRef(null);
  const tableRef = useRef(null);
  const submitRef = useRef(null);

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
          <FormItem mega-props={{span: 1}} placeholder="客户名称" name="customerId" component={SysField.CustomerIds} />
        </>
      );
    };


    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
                    columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="联系人姓名" name="contactsName" component={SysField.ContactsName} />
          {search ? formItem() : null}

        </MegaLayout>

      </div>
    );
  };


  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button type='link' title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };
  const [ids, setIds] = useState([]);


  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      ...batchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };



  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={contactsList}
        rowKey="contactsId"
        searchForm={searchForm}
        SearchButton={Search()}
        isModal={false}
        layout={search}
        footer={footer}
        actions={actions()}
        ref={tableRef}
        onChange={(keys) => {
          setIds(keys);
        }}
      >
        <Column title="联系人姓名" fixed align="center" width={120} dataIndex="contactsName" />
        <Column title="职务" align="center" width={200} render={(value,record)=>{
          return (
            <>
              {record.companyRoleResult && record.companyRoleResult.position}
            </>
          );
        }} />
        <Column title="客户名称" width={300}  dataIndex="clientId" render={(value, record) => {
          return (
            record.customerResult ? record.customerResult.customerName : null
          );
        }} />

        <Column title="联系电话" width={300} dataIndex="phone" render={(value, record) => {
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

        }}/>
        <Column />
        <Column title="操作" fixed='right' width={choose ? 200 : 200} align="right" render={(value, record) => {
          return (
            <>
              {choose ? <CheckButton onClick={() => {
                choose(record);
                props.onSuccess();
              }} /> : null}
              <EditButton onClick={() => {
                ref.current.open(record.contactsId);
              }} />
              <Button size="small" type='link' danger>离职</Button>
            </>
          );
        }} />
      </Table>
      <Modal width={1000} title="联系人" component={ContactsEdit}
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

export default ContactsTable;
