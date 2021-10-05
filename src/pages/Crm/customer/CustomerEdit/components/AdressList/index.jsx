/**
 * 客户地址表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React, {useEffect, useRef} from 'react';
import {Divider, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {adressDelete, adressList} from '@/pages/Crm/adress/AdressUrl';
import Index from '@/pages/Crm/customer/CustomerEdit/components/AdressEdit';
import * as SysField from '@/pages/Crm/business/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import CheckButton from '@/components/CheckButton';
import AdressEdit from '@/pages/Crm/adress/AdressEdit';
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';
const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const AdressList = (props) => {
  const {customerId,choose,...other} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);


  const searchForm = () => {
    return (
      <>
        <FormItem style={{display: 'none'}} value={customerId || ' '} name="customerId" component={SysField.SalesId} />
      </>
    );
  };

  return (
    <>
      <Divider orientation='right'>
        <AddButton ghost onClick={() => {
          ref.current.open(false);
        }} />
      </Divider>
      <Table
        bordered={false}
        bodyStyle={{padding:0}}
        headStyle={{display:'none'}}
        api={adressList}
        formActions={formActionsPublic}
        rowKey="adressId"
        showSearchButton={false}
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="省市区地址" dataIndex="region" render={(value,record)=>{
          return (
            <>
              {record.regionResult && `${record.regionResult.countries }-${ record.regionResult.province }-${ record.regionResult.city }-${ record.regionResult.area}`}
            </>
          );
        }}/>
        <Column title="地址" dataIndex="location"/>
        {/*<Column title="经度" dataIndex="longitude"/>*/}
        {/*<Column title="纬度" dataIndex="latitude"/>*/}
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {choose ? <CheckButton onClick={() => {
                choose(record);
                props.onSuccess();
              }} /> : null}
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
      <Drawer width={800} title="编辑" component={AdressEdit} customer={customerId} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default AdressList;
