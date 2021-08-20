/**
 * 报修列表页
 *
 * @author siqiang
 * @Date 2021-08-20 17:16:16
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {companyAddressDelete, companyAddressList} from '../companyAddressUrl';
import CompanyAddressEdit from '../companyAddressEdit';
import * as SysField from '../companyAddressField';

const {Column} = AntTable;
const {FormItem} = Form;

const CompanyAddressList = () => {
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

 const searchForm = () => {
   return (
     <>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={companyAddressList}
        rowKey="companyId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="报修id" dataIndex="repairId"/>
        <Column title="报修地址" dataIndex="addressId"/>
        <Column title="省" dataIndex="province"/>
        <Column title="市" dataIndex="city"/>
        <Column title="区" dataIndex="area"/>
        <Column title="详细地址" dataIndex="address"/>
        <Column title="姓名" dataIndex="people"/>
        <Column title="职务" dataIndex="position"/>
        <Column title="电话" dataIndex="telephone"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.companyId);
              }}/>
              <DelButton api={companyAddressDelete} value={record.companyId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={CompanyAddressEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default CompanyAddressList;
