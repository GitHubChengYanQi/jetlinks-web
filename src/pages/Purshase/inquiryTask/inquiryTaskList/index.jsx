/**
 * 询价任务列表页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef} from 'react';
import {Badge, Button, Table as AntTable} from 'antd';
import {useHistory} from 'ice';
import Table from '@/components/Table';
import Drawer from '@/components/Drawer';
import Form from '@/components/Form';
import {inquiryTaskList} from '../inquiryTaskUrl';
import InquiryTaskEdit from '../inquiryTaskEdit';
import * as SysField from '../inquiryTaskField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const InquiryTaskList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory(null);

  const searchForm = () => {
    return (
      <>
        <FormItem label="询价任务名称" name="inquiryTaskName" component={SysField.InquiryTaskName} />
        <FormItem label="负责人" name="userId" component={SysField.UserId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={inquiryTaskList}
        rowKey="inquiryTaskId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="任务编码" dataIndex="inquiryTaskCode" render={(value, record) => {
          return <>
            <Button type="link" onClick={() => {
              history.push(`/purchase/inquiryTask/${record.inquiryTaskId}`);
            }}>{value}</Button>
          </>;
        }} />
        <Column title="负责人" dataIndex="user" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column title="截至日期" dataIndex="deadline" />
        <Column title="供应商等级" dataIndex="crmCustomerLevel" render={(value) => {
          return <>{value && value.level}</>;
        }} />
        <Column title="是否供应商物料" dataIndex="isSupplier" render={(value) => {
          return value ? '是' : '否';
        }} />
        <Column title="物料种类" dataIndex="type" />
        <Column title="采购总量" dataIndex="number" />
        <Column title="状态" dataIndex="status" render={(value) => {
          switch (value) {
            case 0:
              return <Badge text="发起" color="yellow" />;
            case 98:
              return <Badge text="执行中" color="blue" />;
            case 99:
              return <Badge text="完成" color="green" />;
            default:
              break;
          }
        }} />
        <Column />
      </Table>
      <Drawer width={800} title="编辑" component={InquiryTaskEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default InquiryTaskList;
