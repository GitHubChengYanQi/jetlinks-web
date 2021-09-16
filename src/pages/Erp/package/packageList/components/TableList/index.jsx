import React, {useEffect, useRef} from 'react';
import {Button, Input, Table as AntTable} from 'antd';
import * as SysField from "@/pages/Erp/package/packageField";
import Form from "@/components/Form";
import {erpPackageTableDelete, erpPackageTableList} from '@/pages/Erp/packageTable/packageTableUrl';
import Breadcrumb from "@/components/Breadcrumb";
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import ErpPackageTableEdit from '@/pages/Erp/packageTable/packageTableEdit';

const {FormItem} = Form;
const {Column} = AntTable;


const TableList = (props) => {
  const {packageId,productName} = props;


  const ref = useRef(null);
  const tableRef = useRef(null);

  useEffect(()=>{
    tableRef.current.formActions.setFieldValue('packageId', packageId );
    tableRef.current.submit();
  }
  ,[packageId]);

  const searchForm = () => {
    return (
      <>
        <FormItem  style={{'display': 'none'}} name="packageId" value={packageId} component={SysField.packageId}/>
        <FormItem  label='产品名称' name="itemId" component={SysField.itemId}/>
      </>
    );
  };

  return (
    <>
      <div>
        <div style={{margin:16,backgroundColor:'white',padding:16}}>{productName || '套餐'}明细<Button style={{visibility:'hidden'}}>123</Button></div>
        <Table
          api={erpPackageTableList}
          rowKey="id"
          isModal={false}
          ref={tableRef}
          listHeader={false}
          searchForm={searchForm}
        >
          <Column title="产品名称"  dataIndex="items" render={(value, record)=>{
            return (
              <div>
                {
                  record.itemsResult ? record.itemsResult.name : null
                }
              </div>
            );
          }} />
          <Column title="销售单价" align='center' dataIndex="salePrice"/>
          <Column title="数量" align='center' dataIndex="quantity"/>
          <Column title="小计" align='center' dataIndex="totalPrice"/>
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
      </div>
    </>
  );
};
export default TableList;
