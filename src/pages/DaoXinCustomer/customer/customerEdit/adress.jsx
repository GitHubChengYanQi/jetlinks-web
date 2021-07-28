/**
 * 客户地址表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {adressDelete} from '@/pages/DaoXinCustomer/adress/adressUrl';
import AdressEdit from '@/pages/DaoXinCustomer/customer/customerEdit/adressEdit';

const {Column} = AntTable;
const {FormItem} = Form;

const AdressList = (props) => {
  const {clientId} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={
          {
            url: '/adress/list',
            method: 'post',
            values: clientId
          }
        }
        rowKey="adressId"
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
      <Drawer width={800} title="编辑" component={AdressEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default AdressList;
