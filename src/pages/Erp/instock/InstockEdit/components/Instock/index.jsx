import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/instock/InstockField';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import {Badge, Button, message, Table as AntTable} from 'antd';
import Icon from '@/components/Icon';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import {instockList, instockOrderList} from '@/pages/Erp/instock/InstockUrl';
import Form from '@/components/Form';
import {barcode} from '@/pages/Erp/instock/InstockField';
import Modal from '@/components/Modal';
import DeliveryDetailsEdit from '@/pages/Erp/deliveryDetails/deliveryDetailsEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const Instock = (props) => {

  const tableRef = useRef(null);

  const [instocks,setInstocks] = useState();

  const searchForm = () => {


    return (
      <FormItem name="instockOrderId" value={props.value} component={SysField.barcode} />
    );
  };

  const footer = () => {
    return (
      <>
        <Button icon={<Icon type="icon-chuhuo" />} onClick={() => {
          if (!instocks || instocks.length <= 0){
            message.error("请选择发货产品！！！");
          }else {
            message.error('宋正飞wcnm!');
          }
        }} type="text">入库</Button>
      </>
    );

  };



  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={instockList}
        headStyle={{display: 'none'}}
        rowKey="instockId"
        isModal={false}
        footer={footer}
        searchForm={searchForm}
        ref={tableRef}
        onChange={(value,values)=>{
          setInstocks(values);
        }}
      >
        <Column title="仓库名称" fixed dataIndex="storehouseId" render={(text, record) => {
          return (
            <>
              {record.storehouseResult.name}
            </>
          );
        }} sorter/>
        <Column title="产品" dataIndex="itemId" render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} sorter/>
        <Column title="品牌" dataIndex="brandId" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} sorter/>
        <Column title="入库数量" width={120} align='center' dataIndex="number" sorter/>
        <Column title="原价" width={120} align='center' dataIndex="costPrice" sorter/>
        <Column title="售价" width={120} align='center' dataIndex="sellingPrice" sorter/>
        <Column title="条形码" dataIndex="barcode" sorter/>
        <Column title="入库状态" width={120} dataIndex="state" render={(text) => {
          return (
            <>
              {text ? <Badge text='已入库' color='green' /> : <Badge text='未入库' color='red' />}
            </>
          );
        }} />
      </Table>
    </>
  );
};

export default Instock;
