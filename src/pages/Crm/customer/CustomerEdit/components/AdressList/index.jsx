/**
 * 客户地址表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React, {useEffect, useRef} from 'react';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {adressDelete, adressList} from '@/pages/Crm/adress/AdressUrl';
import Index from '@/pages/Crm/customer/CustomerEdit/components/AdressEdit';
import * as SysField from '@/pages/Crm/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const AdressList = (props) => {
  const {customerId} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);


  const searchForm = () => {
    return (
      <>
        <FormItem label='地址' name="location" component={SysField.SalesId} />
        <FormItem style={{display: 'none'}} value={customerId} name="customerId" component={SysField.SalesId} />
      </>
    );
  };

  return (
    <>
      <Table
        api={adressList}
        rowKey="adressId"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="地址" dataIndex="location"/>
        <Column title="经度" dataIndex="longitude"/>
        <Column title="纬度" dataIndex="latitude"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.adressId);
              }}/>
              <DelButton api={adressDelete} value={record.adressId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <div style={{textAlign:'center'}}>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </div>
      <Drawer width={800} title="编辑" component={Index} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default AdressList;
