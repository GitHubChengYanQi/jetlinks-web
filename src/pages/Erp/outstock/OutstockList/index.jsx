/**
 * 出库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deliveryDelete, deliveryList, itemsIdSelect, outstockDelete, outstockList} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import Breadcrumb from '@/components/Breadcrumb';
import DeliveryEdit from '@/pages/Erp/outstock/OutstockEdit';
import Modal2 from '@/components/Modal';
import OutstockEdit from '@/pages/Erp/outstock/OutstockEdit';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {Brand} from '../OutstockField';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const [search,{toggle}]  = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="品牌名称" name="brandName" component={SysField.Brand}/>
        </>
      );
    };


    return (
      <div style={{maxWidth:800}} >
        <MegaLayout responsive={{s: 1,m:2,lg:2}} labelAlign="left" layoutProps={{wrapperWidth:200}} grid={search} columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="产品名称" name="name" component={SysField.ItemsIdSelect}/>
          {search ? formItem() : null}
        </MegaLayout>

      </div>
    );
  };


  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search?'收起':'高级'}</Button>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };



  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={outstockList}
        rowKey="outstockId"
        SearchButton={Search()}
        layout={search}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名称" fixed dataIndex="name" sorter/>
        <Column title="出库时间" width={200}  dataIndex="deliveryTime" sorter/>
        <Column title="出库数量" width={120} align='center' dataIndex="number" sorter/>
        <Column title="出库价格"  width={120} align='center' dataIndex="price" sorter/>
        <Column title="品牌名称" width={200} dataIndex="brandName" sorter/>
        <Column title="操作" fixed='right' align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }}/>
              <DelButton api={outstockDelete} value={record.outstockId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={100}/>
      </Table>
      <Modal2 title="产品出库" component={OutstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default OutstockList;
