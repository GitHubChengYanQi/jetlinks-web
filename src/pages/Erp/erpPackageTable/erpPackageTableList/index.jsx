/**
 * 套餐分表列表页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useRef, useState} from 'react';
import {Button, Table as AntTable} from 'antd';
import Table from "@/components/Table";
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import useRequest from '@/util/Request/useRequest';
import Modal2 from '@/components/Modal';
import ItemsTable from "@/pages/Erp/erpPackageTable/erpPackageTableList/components/ItemsTable";
import ErpPackageTableEdit from '../erpPackageTableEdit';
import {erpPackageTableDelete, erpPackageTableList} from '../erpPackageTableUrl';
import * as SysField from '../erpPackageTableField';


const {Column} = AntTable;
const {FormItem} = Form;

const ErpPackageTableList = ({onChange,...props}) => {

  const ref = useRef();
  const tableRef = useRef(null);
  const refAddOne = useRef(null);
  const [da,setDa] = useState(null);
  const [ids, setIds] = useState([]);

  const refesh = (data, params) => {
    console.log('data');
    tableRef.current.refresh();
  };

  const {data,run} = useRequest({url: '/erpPackageTable/add',method: 'POST'},{manual:true}, {onSuccess:refesh});


  const searchForm = () => {
    return (
      <>
        <FormItem style={{'display': 'none'}} name="packageId" value={props.value} component={SysField.PackageId}/>
        <FormItem label="" name="packageId" value={props.value} component={SysField.PackageId}/>
      </>
    );
  };

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
        <Modal2 width={1900} title="选择" component={ItemsTable}
          onSuccess={()=>{
            tableRef.current.refresh();
            refAddOne.current.close();
          }}
          ref={refAddOne}
          packageId={props.value}
        />
      </div>
      <Table
        api={erpPackageTableList}
        rowKey="id"
        searchForm={searchForm}
        ref={tableRef}
        showSearchButton={false}
        footer={footer}
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
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} />
      </Table>
      <Drawer width={800} title="编辑" component={ErpPackageTableEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default ErpPackageTableList;
