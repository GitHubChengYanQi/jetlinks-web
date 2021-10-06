/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Divider, Modal as AntModal, Table as AntTable, Tag} from 'antd';
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
import {batchDelete, contactsBind, contactsDelete, contactsList} from '@/pages/Crm/contacts/contactsUrl';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';
import * as SysField from '@/pages/Crm/contacts/ContactsField';
import {CustomerIds} from '@/pages/Crm/contacts/ContactsField';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;
const {FormItem} = Form;

const ContactsTable = (props) => {

  const {customerId} = props;


  const ref = useRef(null);
  const tableRef = useRef(null);
  const submitRef = useRef(null);

  const {run} = useRequest(contactsBind, {
    manual: true, onSuccess: () => {
      tableRef.current.submit();
    }
  });

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
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}}
          labelAlign="left"
          layoutProps={{wrapperWidth: 200}}
          grid={search}
          columns={4}
          full
          autoRow>
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
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              {customerId && <FormItem
                hidden
                value={customerId || ' '}
                name="customerId"
                component={SysField.Customer} />}
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };
  const [ids, setIds] = useState([]);

  const confirmOutStock = (record) => {
    AntModal.confirm({
      title: '联系人离职',
      centered: true,
      content: `请确认离职操作`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await run({
          data: {
            customerId: record.customerResults && record.customerResults.length > 0 && record.customerResults[0].customerId,
            contactsId: record.contactsId
          }
        });
        tableRef.current.submit();
      },
      onCancel:()=>{
        tableRef.current.submit();
      }
    });
  };



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
      {customerId && <Divider orientation="right">
        <AddButton ghost onClick={() => {
          ref.current.open(false);
        }} />
      </Divider>}
      <Table
        headStyle={{display: customerId && 'none'}}
        bodyStyle={{padding: customerId && 0}}
        bordered={!customerId}
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
        <Column title="职务" align="center" width={200} render={(value, record) => {
          return (
            <>
              {record.companyRoleResult && record.companyRoleResult.position}
            </>
          );
        }} />
        <Column title="客户名称" width={300} dataIndex="clientId" render={(value, record) => {
          return (
            record.customerResults && record.customerResults.length > 0 && record.customerResults[0].customerName
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

        }} />
        <Column />
        <Column title="操作" fixed="right" width={200} align="right" render={(value, record) => {
          return (
            <>
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

export default ContactsTable;
