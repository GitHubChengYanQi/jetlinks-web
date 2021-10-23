/**
 * 产品订单详情列表页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {productOrderDetailsDelete, productOrderDetailsList} from '../productOrderDetailsUrl';
import ProductOrderDetailsEdit from '../productOrderDetailsEdit';
import * as SysField from '../productOrderDetailsField';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ProductOrderDetailsList = ({value}) => {
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
        <FormItem label="产品订单" name="productOrderId" value={value || '111'} component={SysField.ProductOrderId} />
        <FormItem label="spuId" name="spuId" component={SysField.SpuId} />
        <FormItem label="skuId" name="skuId" component={SysField.SkuId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        headStyle={{display:'none'}}
        api={productOrderDetailsList}
        formActions={formActionsPublic}
        contentHeight
        rowSelection
        rowKey="productOrderDetailsId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="商品名称" dataIndex="spuId" render={(value,record)=>{
          return (
            <>
              {record.spuResult && record.spuResult.name}
            </>
          );
        }} />
        <Column title="规格" dataIndex="sku" render={(value)=>{

          const spuAttribute = JSON.parse(value);

          const attribute = spuAttribute && spuAttribute.map((items,index)=>{
            return items.values && items.values.attributeValues;
          });


          return (
            <>
              {
                attribute && attribute.map((items,index)=>{
                  if (index === attribute.length-1){
                    return `${items}`;
                  }else {
                    return `${items} , `;
                  }
                })
              }
            </>
          );
        }} />
        <Column title="数量" dataIndex="number" />
        <Column title="金额" dataIndex="money" />
      </Table>
      <Drawer width={800} title="编辑" component={ProductOrderDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ProductOrderDetailsList;
