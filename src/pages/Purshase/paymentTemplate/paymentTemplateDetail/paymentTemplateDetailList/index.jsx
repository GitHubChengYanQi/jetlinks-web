/**
 * 付款模板详情列表页
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {paymentTemplateDetailDelete, paymentTemplateDetailList} from '../paymentTemplateDetailUrl';
import PaymentTemplateDetailEdit from '../paymentTemplateDetailEdit';
import * as SysField from '../paymentTemplateDetailField';

const {Column} = AntTable;
const {FormItem} = Form;

const PaymentTemplateDetailList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="模板id" name="templateId" component={SysField.TemplateId} />
        <FormItem label="金额" name="money" component={SysField.Money} />
        <FormItem label="百分比" name="percentum" component={SysField.Percentum} />
        <FormItem label="付款类型" name="payType" component={SysField.PayType} />
        <FormItem label="付款日期" name="payTime" component={SysField.PayTime} />
        <FormItem label="日期方式" name="dateWay" component={SysField.DateWay} />
        <FormItem label="日期数" name="dateNumber" component={SysField.DateNumber} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={paymentTemplateDetailList}
        rowKey="detailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="模板id" dataIndex="templateId" />
        <Column title="金额" dataIndex="money" />
        <Column title="百分比" dataIndex="percentum" />
        <Column title="付款类型" dataIndex="payType" />
        <Column title="付款日期" dataIndex="payTime" />
        <Column title="日期方式" dataIndex="dateWay" />
        <Column title="日期数" dataIndex="dateNumber" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.detailId);
              }} />
              <DelButton api={paymentTemplateDetailDelete} value={record.detailId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={PaymentTemplateDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default PaymentTemplateDetailList;
