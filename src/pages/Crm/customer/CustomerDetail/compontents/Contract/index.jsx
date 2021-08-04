/**
 * 联系人表列表页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef} from 'react';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {contractDelete, contractList} from '@/pages/Crm/contract/ContractUrl';
import Modal2 from '@/components/Modal';
import AddContractEdit from '@/pages/Crm/customer/CustomerDetail/compontents/AddContract';
import * as SysField from '@/pages/Crm/crmBusinessSalesProcess/crmBusinessSalesProcessField';
import {contactsList} from '@/pages/Crm/contacts/contactsUrl';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const Contract = (props) => {
  const {customerId} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);

  useEffect(()=>{
    if (customerId) {
      tableRef.current.formActions.setFieldValue('customerId', customerId);
      tableRef.current.submit();
    }
  },[customerId]);

  const searchForm = () => {
    return (
      <>
        <FormItem label='合同名称' name="name" component={SysField.SalesId} />
        <FormItem style={{display: 'none'}} name="customerId" component={SysField.SalesId} />
      </>
    );
  };




  return (
    <>
      <Table
        api={contractList}
        searchForm={searchForm}
        rowKey="contactsId"
        ref={tableRef}
      >
        <Column title="合同名称" dataIndex="name"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.contractId);
              }}/>
              <DelButton api={contractDelete} value={record.contractId} onSuccess={()=>{
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
      <Modal2 width={1500} title="编辑" component={AddContractEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default Contract;
