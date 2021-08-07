/**
 * 产品表列表页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Modal, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {itemsDelete, itemsList} from '../ItemsUrl';
import ItemsEdit from '../ItemsEdit';
import * as SysField from '../ItemsField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import CheckButton from "@/components/CheckButton";

const {Column} = AntTable;
const {FormItem} = Form;

const ItemsList = (props) => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const [ids, setIds] = useState([]);
  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      url: '/',
      method: 'POST'
    }} value={ids}>批量删除</DelButton>);
  };
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
        <FormItem label="产品名称" name="name" component={SysField.Name} />
        <FormItem label="生产日期" name="productionTime" component={SysField.ProductionTime} />
        <FormItem label="重要程度" name="important" component={SysField.Name} />
        <FormItem label="产品重量" name="weight" component={SysField.Name} />
        <FormItem label="材质" name="materialName" component={SysField.Name} />
        <FormItem label="易损" name="vulnerability" component={SysField.Name} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={itemsList}
        rowKey="itemId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        onChange={(keys)=>{
          setIds(ids);
          props.onChange(keys);
        }}
        footer={footer}
      >
        <Column title="产品名字" dataIndex="name" />
        <Column title="质保期" dataIndex="shelfLife" />
        <Column title="产品库存" dataIndex="inventory" />
        <Column title="生产日期" dataIndex="productionTime" />
        <Column title="重要程度" dataIndex="important" />
        <Column title="产品重量" dataIndex="weight" />
        <Column title="材质" dataIndex="materialName" />
        <Column title="成本" dataIndex="cost" />
        <Column title="易损" dataIndex="vulnerability" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {ref.current.open(record.itemId);}} />
              <DelButton api={itemsDelete} value={record.itemId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal2 width={800} component={ItemsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ItemsList;
