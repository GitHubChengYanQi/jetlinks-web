/**
 * 套餐分表列表页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useEffect, useRef, useState} from 'react';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import useRequest from '@/util/Request/useRequest';
import Modal2 from '@/components/Modal';
import ItemsList from "@/pages/Erp/items/ItemsList";
import ErpPackageTableEdit from '../packageTableEdit';
import {erpPackageTableDelete, erpPackageTableList} from '../packageTableUrl';
import * as SysField from '../packageTableField';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import StockTable from '@/pages/Erp/stock/components/StockTable';

const {Column} = AntTable;
const {FormItem} = Form;

const ErpPackageTableList = ({onChange,...props}) => {

  const ref = useRef();
  const tableRef = useRef(null);
  const refAddOne = useRef(null);
  const [ids, setIds] = useState([]);

  useEffect(()=>{
      tableRef.current.formActions.setFieldValue('packageId', props.value );
      tableRef.current.submit();
    }
    ,[props.value]);


  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      url: '/',
      method: 'POST'
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <>
      <div style={{textAlign:'right'}}>
        <Button type="primary" className='placeName' onClick={()=>{
          refAddOne.current.open(false);}}>
          添加产品
        </Button>
      </div>
      <Table
        api={erpPackageTableList}
        rowKey="id"
        isModal={false}
        searchForm={false}
        ref={tableRef}
        showSearchButton={false}
        // footer={footer}
        onChange={(keys) => {
          setIds(keys);
        }}
      >
        <Column title="产品名称" dataIndex="items" render={(value, record)=>{
          return (
            <div>
              {
                record.itemsResult ? record.itemsResult.name : null
              }
            </div>
          );
        }} />
        <Column title="销售单价" dataIndex="salePrice"/>
        <Column title="数量" dataIndex="quantity"/>
        <Column title="小计" dataIndex="totalPrice"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={erpPackageTableDelete} value={record.id} onSuccess={()=>{
                tableRef1.current.refresh();
              }}/>
            </>
          );
        }} />
      </Table>
      <Drawer width={800} title="产品" component={ErpPackageTableEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
      {/*<Modal2 width={1900} title="选择" component={ItemsList}*/}
      {/*  onSuccess={()=>{*/}
      {/*    tableRef.current.refresh();*/}
      {/*    refAddOne.current.close();*/}
      {/*  }}*/}
      {/*  ref={refAddOne}*/}
      {/*  packageId={props.value}*/}
      {/*  disabled={false}*/}
      {/*/>*/}
      <Modal width={1600} title="选择" component={StockTable}
        onSuccess={() => {
          refAddOne.current.close();
          tableRef.current.refresh();
        }} ref={refAddOne}
        packageId={props.value}
        TcDisabled={false}
      />
    </>
  );
};

export default ErpPackageTableList;
