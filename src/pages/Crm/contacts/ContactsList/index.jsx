/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contactsDelete, contactsList} from '../contactsUrl';
import ContactsEdit from '../ContactsEdit';
import * as SysField from '../ContactsField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import CheckButton from '@/components/CheckButton';
import PhoneList from '@/pages/Crm/phone/phoneList';

const {Column} = AntTable;
const {FormItem} = Form;

const ContactsList = (props) => {

  const {choose} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);
  const refPhone = useRef(null);
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
          <FormItem mega-props={{span: 1}} placeholder="职务" name="job" component={SysField.Job} />
          <FormItem mega-props={{span: 1}} placeholder="联系电话" name="phone" component={SysField.Phone} />
          <FormItem mega-props={{span: 1}} placeholder="客户名称" name="customerId" component={SysField.Customer} />
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
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem hidden name="status" component={SysField.Name} />
              <FormItem hidden name="classification" component={SysField.Name} />
              <FormItem hidden name="customerLevelId" component={SysField.Name} />
            </MegaLayout>
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
      // ...customerBatchDelete
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
        layout={search}
        footer={footer}
        actions={actions()}
        ref={tableRef}
        onChange={(keys) => {
          setIds(keys);
        }}
      >
        <Column title="联系人姓名" align="center" width={120} dataIndex="contactsName" render={(text, record) => {
          return (
            <Button size="small" type="link" onClick={() => {
              refPhone.current.open(record.contactsId);
            }}>{text}</Button>
          );
        }} />
        <Column title="职务" align="center" width={200} dataIndex="job" />
        <Column title="联系电话" align="center" width={200} dataIndex="phone" />
        <Column title="客户名称" dataIndex="clientId" render={(value, record) => {
          return (
            record.customerResult ? record.customerResult.customerName : null
          );
        }} />
        <Column />
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
      <Modal2 width={800} title="编辑" component={ContactsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal2 width={800} title="编辑" component={PhoneList} onSuccess={() => {
        refPhone.current.close();
      }} ref={refPhone} />
    </>
  );
};

export default ContactsList;
