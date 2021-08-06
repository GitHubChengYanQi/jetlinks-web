/**
 * 套餐分表列表页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useRef, useState} from 'react';
import {Button, Table as AntTable} from 'antd';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Items from "@/pages/Erp/instock/InstockEdit/components/Items";
import useRequest from '@/util/Request/useRequest';
import {erpPackageTableDelete, erpPackageTableList} from '../erpPackageTableUrl';
import ErpPackageTableEdit from '../erpPackageTableEdit';
import * as SysField from '../erpPackageTableField';


const {Column} = AntTable;
const {FormItem} = Form;

const ErpPackageTableList = ({...props}) => {

  const ref = useRef();
  const tableRef = useRef(null);
  const refAddOne = useRef(null);
  const [da,setDa] = useState(null);

  const {data,run} = useRequest({url: '/erpPackageTable/add',method: 'POST'},{manual:true});

  const searchForm = () => {
    return (
      <>
        <FormItem style={{'display': 'none'}} name="packageId" value={props.value} component={SysField.PackageId}/>
      </>
    );
  };

  return (
    <>
      <div style={{textAlign:'right'}}>
        <Button type="primary" className='placeName' onClick={()=>{
          refAddOne.current.open(false);}}>
          添加产品
        </Button>
        <Drawer width={1900} title="选择" component={Items}  onSuccess={() => {
          refAddOne.current.open(false);

        }} ref={refAddOne}
        allData={(data) => {
          run(
            {
              data:{
                packageId: props.value,
                itemId: data.itemId,
                salePrice: 0,
                totalPrice: 0,
                quantity: 0
              }
            });
          refAddOne.current.close();
        }}/>
      </div>
      <Table
        api={erpPackageTableList}
        rowKey="id"
        searchForm={searchForm}
        ref={tableRef}
        showSearchButton={false}
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
