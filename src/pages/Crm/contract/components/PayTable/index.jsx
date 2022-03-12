import React, {useRef} from 'react';
import {Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/business/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import Table from '@/components/Table';
import Empty from '@/components/Empty';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const PayTable = ({payment}) => {
  const tableRef = useRef(null);

  if (!payment) {
    return <Empty />;
  }

  const searchForm = () => {
    return (
      <>
        <FormItem hidden value={payment.paymentId} name="paymentId" component={SysField.SalesId} />
      </>
    );
  };

  return (
    <>
      <Table
        bordered={false}
        noRowSelection
        bodyStyle={{padding: 0}}
        headStyle={{display: 'none'}}
        api={{
          url: '/paymentDetail/list',
          method: 'POST'
        }}
        formActions={formActionsPublic}
        rowKey="detailId"
        showSearchButton={false}
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="付款类型" dataIndex="payType" render={(value) => {
          switch (value) {
            case 0:
              return '订单创建后';
            case 1:
              return '合同签订后';
            case 2:
              return '订单发货前';
            case 3:
              return '订单发货后';
            case 4:
              return '入库后';
            default:
              return '';
          }
        }} />
        <Column title="日期" dataIndex="dateNumber" />
        <Column title="日期方式" dataIndex="dateWay" render={(value) => {
          switch (value) {
            case 0:
              return '天';
            case 1:
              return '月';
            case 2:
              return '年';
            default:
              return '';
          }
        }} />
        <Column title="百分比" dataIndex="percentum" />
        <Column title="付款金额" dataIndex="money" />
        <Column />
      </Table>
    </>
  );
};

export default PayTable;
