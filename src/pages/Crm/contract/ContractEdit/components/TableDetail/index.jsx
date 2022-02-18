import React, {useRef} from 'react';
import { Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import * as SysField from '@/pages/Crm/business/BusinessField';
import Form from '@/components/Form';
import Table from '@/components/Table';
import {contractDetailList} from '@/pages/Crm/contract/contractDetail/contractDetailUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const {FormItem} = Form;
const {Column} = AntTable;

const formActionsPublic = createFormActions();

const TableDetail = (props) => {

  const {value} = props;

  const tableRef = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem style={{'display': 'none'}} name="contractId" value={value} component={SysField.BusinessId} />
        <FormItem label="产品名称" name="itemId" component={SysField.itemId} />
      </>
    );
  };

  return (
    <>
      <Table
        contentHeight
        noRowSelection
        headStyle={{display: 'none'}}
        api={contractDetailList}
        formActions={formActionsPublic}
        rowKey="id"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="skuResult" render={(value) => {
          return (<SkuResultSkuJsons skuResult={value} />);
        }} />
        <Column title="供应商" dataIndex="customerResult" render={(value) => {
          return (<>{value && value.customerName}</>);
        }} />
        <Column title="单价" dataIndex="salePrice" />
        <Column title="数量" dataIndex="quantity" />
        <Column title="小计" dataIndex="totalPrice" />
      </Table>
    </>
  );
};
export default TableDetail;
