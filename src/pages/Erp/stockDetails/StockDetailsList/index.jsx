/**
 * 仓库产品明细表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {stockDetailsList} from '@/pages/Erp/stockDetails/StockDetailsUrl';
import {customerBatchDelete} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '../StockDetailsField';
import Icon from '@/components/Icon';
import Modal2 from '@/components/Modal';
import DeliveryDetailsEdit from '@/pages/Erp/deliveryDetails/deliveryDetailsEdit';


const {Column} = AntTable;
const {FormItem} = Form;

const StockDetailsList = (props) => {

  const refDelivery = useRef(null);
  const tableRef = useRef(null);

  const {value} = props;





  const {storehouseId, brandId, itemId} = value ? [] : props.location.params || [];

  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (storehouseId || brandId || itemId) {
      tableRef.current.formActions.setFieldValue('storehouseId', storehouseId || '');
      tableRef.current.formActions.setFieldValue('brandId', brandId || '');
      tableRef.current.formActions.setFieldValue('itemId', itemId || '');
      tableRef.current.submit();
    }
  }, [storehouseId, brandId, itemId]);

  const searchForm = () => {

    return (
      <>

        <FormItem disabled placeholder="仓库名称" name="storehouseId" value={storehouseId}
                  component={SysField.Storehouse} />
        <FormItem disabled placeholder="品牌名称" name="brandId" value={brandId} component={SysField.brandeId} />
        <FormItem disabled placeholder="产品名称" name="itemId" value={itemId} component={SysField.ItemId} />
        <FormItem placeholder="入库时间" name="storageTime" component={SysField.StorageTime} />
        <FormItem hidden name="stage" value={value ? 2 : 1} component={SysField.outStockOrderId} />
        {value && <FormItem hidden name="outStockOrderId" value={value} component={SysField.outStockOrderId} />}
      </>
    );
  };

  const [ids, setIds] = useState([]);

  const footer = () => {
    return (
      <>
        <Button icon={<Icon type="icon-chuhuo" />} onClick={() => {
          refDelivery.current.open(false);
        }} type="text" >批量发货</Button>
        <Modal2 title="产品出库" component={DeliveryDetailsEdit} onSuccess={() => {
          tableRef.current.refresh();
          refDelivery.current.close();
        }} ref={refDelivery} ids={ids} />
      </>
    );

  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={stockDetailsList}
        rowKey="stockItemId"
        searchForm={searchForm}
        footer={value ? footer : false}
        layout={search}
        onChange={(keys,all) => {
          console.log(all);
          setIds(all);
        }}
        ref={tableRef}
      >
        <Column title="仓库名称" dataIndex="pname" render={(text, record) => {
          return (
            <>
              {record.storehouseResult.name}
            </>
          );
        }} sorter />
        <Column title="产品名称" dataIndex="iname" render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} sorter />
        <Column title="品牌名称" dataIndex="brandId" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="条形码" dataIndex="barcode" />
        <Column title="产品价格" dataIndex="price" sorter />
        <Column title="入库时间" dataIndex="storageTime" sorter />
      </Table>
    </>
  );
};

export default StockDetailsList;
