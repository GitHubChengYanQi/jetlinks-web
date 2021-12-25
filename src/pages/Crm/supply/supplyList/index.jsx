/**
 * 供应商供应物料列表页
 *
 * @author song
 * @Date 2021-12-20 10:08:44
 */

import React, {useRef} from 'react';
import {Divider, Table as AntTable} from 'antd';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {supplyDelete, supplyList} from '../supplyUrl';
import SupplyEdit from '../supplyEdit';
import * as SysField from '../supplyField';
import SkuResult from '@/pages/Erp/sku/components/SkuResult';

const {Column} = AntTable;
const {FormItem} = Form;

const SupplyList = ({customer}) => {
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
        <FormItem label="供应商id" name="customerId" value={customer && customer.customerId} component={SysField.CustomerId} />
      </>
    );
  };

  return (
    <>
      {customer && <Divider orientation="right">
        <AddButton ghost onClick={() => {
          ref.current.open(false);
        }} />
      </Divider>}
      <Table
        bodyStyle={{padding: customer && 0}}
        bordered={!customer}
        headStyle={{display:'none'}}
        api={supplyList}
        rowKey="supplyId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物料" dataIndex="skuId" render={(value,record)=>{
          return <SkuResult skuResult={record.skuResult} />;
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <DelButton api={supplyDelete} value={record.supplyId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="物料" customerId={customer && customer.customerId} component={SupplyEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default SupplyList;
