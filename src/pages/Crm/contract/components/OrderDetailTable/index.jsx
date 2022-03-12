import React, {useRef} from 'react';
import {Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/business/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import Table from '@/components/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const OrderDetailTable = ({orderId}) => {
  const tableRef = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem hidden value={orderId} name="orderId" component={SysField.SalesId} />
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
          url: '/orderDetail/list',
          method: 'POST'
        }}
        formActions={formActionsPublic}
        rowKey="detailId"
        showSearchButton={false}
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="物料编码" dataIndex="skuResult" render={(value) => {
          return value && value.standard;
        }} />
        <Column title="物料名称" dataIndex="skuResult" render={(value) => {
          return value && value.spuResult && value.spuResult.name;
        }} />
        <Column title="型号 / 规格" dataIndex="skuResult" render={(value) => {
          return value && (`${value.skuName} / ${value.specifications}`);
        }} />
        <Column title="品牌" dataIndex="brandResult" render={(value) => {
          return value && value.brandName;
        }} />
        <Column title="数量" dataIndex="purchaseNumber" />
        <Column title="单位" dataIndex="unit" render={(value) => {
          return value && value.name;
        }} />
        <Column title="单价" dataIndex="onePrice" />
        <Column title="总价" dataIndex="totalPrice" />
        <Column title="票据类型" dataIndex="paperType" render={(value) => {
          switch (value) {
            case 0:
              return '普票';
            case 1:
              return '专票';
            default:
              return '';
          }
        }} />
        <Column title="税率" dataIndex="brandResult" />
        <Column title="交货期" dataIndex="deliveryDate" />
        <Column />
      </Table>
    </>
  );
};

export default OrderDetailTable;
