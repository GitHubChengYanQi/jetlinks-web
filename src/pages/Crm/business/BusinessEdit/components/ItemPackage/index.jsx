import {Button, Input, message, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/items/ItemsField';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import CheckButton from '@/components/CheckButton';
import {erpPackageList} from "@/pages/Erp/package/packageUrl";
import {useRequest} from "@/util/Request";
import TableList from "@/pages/Erp/package/packageList/components/TableList";
import {erpPackageTableList} from "@/pages/Erp/packageTable/packageTableUrl";
import {crmBusinessDetailedAdd} from "@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedUrl";
import Modal2 from "@/components/Modal";

const {Column} = AntTable;
const {FormItem} = Form;

const ItemPackage = (props) => {

  const [PackageId, setPackageId] = useState();
  const searchForm = () => {
    return (
      <>
        <FormItem label="套餐名称" name="name" component={SysField.Name} />
      </>
    );
  };

  const ref = useRef(null);
  const tableRef = useRef(null);
  const MxRef = useRef(null);
  const {run:add} = useRequest(crmBusinessDetailedAdd,{manual:true});
  const {run:select} = useRequest(erpPackageTableList,
    {manual: true,
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: (response) => {
        response.map(value => {
          return add({
            data:{
              businessId: props.businessId,
              itemId: value.itemId,
              salePrice: 0,
              totalPrice: 0,
              quantity: 0
            }
          });
        });
        props.onSuccess();
      }
    });

  return (
    <>
      <Table
        api={erpPackageList}
        rowKey="id"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="套餐名称" dataIndex="productName" render={(value, record) => {
          return (
            <Button type="link" onClick={() => {
              setPackageId(record.packageId);
              MxRef.current.open(false);
            }}>{record.productName}</Button>
          );
        }}/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                select({data:{packageId:record.packageId}});
              }}/>
            </>
          );
        }}/>
      </Table>
      <Modal2 width={900}  title="套餐明细" component={TableList} packageId={PackageId} onSuccess={() => {
        MxRef.current.refresh();
        ref.current.close();
      }} ref={MxRef} />
    </>
  );
};

export default ItemPackage;
