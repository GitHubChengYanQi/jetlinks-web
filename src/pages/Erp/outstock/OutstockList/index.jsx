/**
 * 出库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import {Badge, Button, message, Table as AntTable, Tag} from 'antd';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import OutstockEdit from '@/pages/Erp/outstock/OutstockEdit';
import {outstockDelete, outstockEdit, outstockList} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Icon from '@/components/Icon';
import DeliveryDetailsEdit from '@/pages/Erp/deliveryDetails/deliveryDetailsEdit';
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';


const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const OutstockList = (props) => {

  const {outstockOrderId, value, sourhouse} = props;

  const ref = useRef(null);
  const refDelivery = useRef(null);
  const tableRef = useRef(null);
  const [ids, setIds] = useState();

  const footer = () => {
    return (
      <>
        <Button icon={<Icon type="icon-chuhuo" />} onClick={() => {
          if (!ids || ids.length <= 0){
            message.error('请选择发货产品！！！');
          }else {
            refDelivery.current.open(false);
          }
        }} type="text">批量发货</Button>
        <Modal title="产品出库" component={DeliveryDetailsEdit} onSuccess={() => {
          tableRef.current.refresh();
          refDelivery.current.close();
          setIds();
        }} ref={refDelivery} ids={ids} />
      </>
    );

  };


  const searchForm = () => {
    return (
      <>
        <FormItem
          mega-props={{span: 1}}
          placeholder="出库单"
          name="outstockOrderId"
          hidden
          value={outstockOrderId || value}
          component={SysField.ItemIdSelect} />
      </>
    );
  };

  return (
    <div style={{padding:24}}>
      {value ? <h2>出库产品</h2> : <Button style={{width: '100%'}} onClick={() => {
        ref.current.open(false);
      }}>
        添加出库商品
      </Button>}
      <Table
        headStyle={{display: 'none'}}
        api={outstockList}
        contentHeight
        isModal={false}
        formActions={formActionsPublic}
        rowKey="outstockId"
        ref={tableRef}
        showSearchButton={false}
        searchForm={searchForm}
        getCheckboxProps={(record) => ({
          disabled: record.state === 1, // Column configuration not to be checked
        })}
        footer={value ? footer : false}
        onChange={(value, record) => {
          const stockItemIds = record && record.map((items, index) => {
            return `${items.stockItemId}`;
          });
          setIds(record);
        }}
      >

        <Column title="产品编号" width={200} dataIndex="stockItemId" />
        <Column title="产品" render={(text, record) => {
          return (
            <>
              {record.sku && record.sku.skuName}
              &nbsp;/&nbsp;
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              <em style={{color: '#c9c8c8', fontSize: 10}}>
                (
                {
                  record.backSkus
                  &&
                  record.backSkus.map((items, index) => {
                    return (
                      <span key={index}>
                        {items.itemAttribute.attribute}：{items.attributeValues.attributeValues}
                      </span>
                    );
                  })
                }
                )
              </em>
            </>
          );

        }} sorter />

        <Column title="品牌名称" width={200} dataIndex="brandId" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="状态" width={200} dataIndex="state" render={(text, record) => {
          return (
            <>
              {text === 0 ? <Badge text='已出库' color='blue' /> : <Badge text='已发货' color='green' />}
            </>
          );
        }} />
        {value ? null : <Column title="操作" fixed="right" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }} />
              <DelButton api={outstockDelete} value={record.outstockId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />}
      </Table>
      <Modal title="产品出库" component={OutstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} outstockOrderId={outstockOrderId} sourhouse={sourhouse} />
    </div>
  );
};

export default OutstockList;
