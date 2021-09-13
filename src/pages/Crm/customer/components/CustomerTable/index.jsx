/**
 * 客户管理表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {lazy, useEffect, useRef, useState} from 'react';
import {Button, PageHeader, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import {MegaLayout} from '@formily/antd-components';
import {
  customerBatchDelete, customerDelete, customerEdit,
  customerList,
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import {useHistory} from 'ice';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import Table from '@/components/Table';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';
import CustomerLevel from '@/pages/Crm/customer/components/CustomerLevel';
import {SearchOutlined} from '@ant-design/icons';
import {FormButtonGroup, Submit} from '@formily/antd';
import CheckButton from '@/components/CheckButton';
import Icon from '@/components/Icon';
import {useBoolean} from 'ahooks';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';

const {Column} = AntTable;
const {FormItem} = Form;

const CustomerTable = (props) => {

  const {status, state, level, choose} = props;

  const history = useHistory();


  const ref = useRef(null);
  const tableRef = useRef(null);


  useEffect(() => {
    if (status || state || level) {
      tableRef.current.formActions.setFieldValue('status', status ? status[0] : null);
      tableRef.current.formActions.setFieldValue('classification', state ? state[0] : null);
      tableRef.current.formActions.setFieldValue('customerLevelId', level ? level[0] : null);
      tableRef.current.submit();
    }
  }, [status, state, level]);


  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };


  const [search, {toggle}] = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="公司类型" name="companyType" component={SysField.CompanyType} />
          <FormItem mega-props={{span: 1}} placeholder="客户来源" name="originId" component={SysField.OriginId} />
          <FormItem mega-props={{span: 1}} placeholder="负责人" name="userId" component={SysField.UserName} />
          <FormItem mega-props={{span: 1}} placeholder="行业" name="industryId" component={SysField.IndustryOne} />
        </>
      );
    };


    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
                    columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="客户名称" name="customerName" component={SysField.Name} />
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
              toggle();
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
      ...customerBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={customerList}
        rowKey="customerId"
        searchForm={searchForm}
        actions={actions()}
        isModal={false}
        ref={tableRef}
        footer={footer}
        layout={search}
        SearchButton={Search()}
        onChange={(keys) => {
          setIds(keys);
        }}
      >
        <Column title="客户名称" fixed dataIndex="customerName" render={(text, record) => {
          return (
            <Button size="small" type="link" onClick={() => {
              history.push(`/CRM/customer/${record.customerId}`);
            }}>{text}</Button>
          );
        }} />
        <Column title="负责人" width={200} render={(text, record) => {
          return (
            <>
              {record.userResult.name}
            </>
          );
        }} />
        <Column title="客户状态" width={140} align="center" render={(text, record) => {
          return (
            <BadgeState state={record.status} text={['潜在客户', '正式客户']} color={['red', 'green']} />
          );
        }} />
        <Column title="客户级别" width={120} align="center" render={(text, record) => {
          const level = typeof record.crmCustomerLevelResult === 'object' ? record.crmCustomerLevelResult : {};
          return (
            <CustomerLevel
              level={level.rank}>{level.level}</CustomerLevel>);
        }} />
        <Column title="客户分类" width={120} align="center" dataIndex="classificationName" />
        <Column title="公司类型" width={200} dataIndex="companyType" ellipsis />
        <Column title="客户来源" width={120} align="center" render={(text, record) => {
          return (
            <>
              {record.originResult.originName}
            </>
          );
        }} />

        <Column title="行业" width={120} align="center" render={(text, record) => {
          return (
            <>
              {record.crmIndustryResult.industryName}
            </>
          );
        }} />
        <Column title="创建时间" width={200} align="center" dataIndex="createTime" sorter />
        <Column title="操作" fixed="right" width={choose ? 200 : 100} align="right" render={(value, record) => {
          return (
            <>
              {choose ? <CheckButton onClick={() => {
                choose(record);
                props.onSuccess();
              }} /> : null}
              <EditButton onClick={() => {
                ref.current.open(record.customerId);
              }} />
              <DelButton api={customerDelete} value={record.customerId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <CreateNewCustomer title='客户' model={CustomerEdit}  widths={1200}  onSuccess={()=>{
        tableRef.current.refresh();
        ref.current.close();
      }} refModal={ref} />
    </>
  );
};

export default CustomerTable;
