/**
 * 产品订单详情列表页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Descriptions, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {productOrderDetailsDelete, productOrderDetailsList} from '../productOrderDetailsUrl';
import ProductOrderDetailsEdit from '../productOrderDetailsEdit';
import * as SysField from '../productOrderDetailsField';
import {createFormActions} from '@formily/antd';
import ProCard from '@ant-design/pro-card';

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
        <FormItem
          label="产品订单"
          name="productOrderId"
          value={value.productOrderId || '111'}
          component={SysField.ProductOrderId} />
        <FormItem label="spuId" name="spuId" component={SysField.SpuId} />
        <FormItem label="skuId" name="skuId" component={SysField.SkuId} />
      </>
    );
  };

  return (
    <div style={{padding: 16}}>
      <ProCard className="h2Card" title="基本信息">
        <Descriptions column={2}>
          <Descriptions.Item label="客户">{value.customerResult && value.customerResult.customerName}</Descriptions.Item>
          <Descriptions.Item label="联系人">{value.contactsResult && value.contactsResult.contactsName}</Descriptions.Item>
          <Descriptions.Item label="电话">{value.phoneResult && value.phoneResult.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="地址">{value.adressResult && value.adressResult.location}</Descriptions.Item>
          <Descriptions.Item label="数量">{value.number}</Descriptions.Item>
          <Descriptions.Item label="总金额">{value.money}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{value.createTime}</Descriptions.Item>
          <Descriptions.Item label="创建人">{value.user && value.user.name}</Descriptions.Item>
        </Descriptions>
      </ProCard>
      <ProCard className="h2Card" title="商品信息">
        <Table
          title={<h2>列表</h2>}
          headStyle={{display: 'none'}}
          api={productOrderDetailsList}
          formActions={formActionsPublic}
          bodyStyle={{padding:0}}
          contentHeight
          bordered={false}
          rowSelection
          rowKey="productOrderDetailsId"
          searchForm={searchForm}
          actions={actions()}
          ref={tableRef}
        >
          <Column title="商品名称" dataIndex="spuId" render={(value, record) => {
            return (
              <>
                {record.spuResult && record.spuResult.name}
              </>
            );
          }} />
          <Column title="规格" dataIndex="sku" render={(value) => {

            const spuAttribute = JSON.parse(value);

            const attribute = spuAttribute && spuAttribute.map((items, index) => {
              return items.values && items.values.name;
            });


            return (
              <>
                {
                  attribute && attribute.map((items, index) => {
                    if (index === attribute.length - 1) {
                      return `${items}`;
                    } else {
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
      </ProCard>
      <Drawer width={800} title="编辑" component={ProductOrderDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </div>
  );
};

export default ProductOrderDetailsList;
