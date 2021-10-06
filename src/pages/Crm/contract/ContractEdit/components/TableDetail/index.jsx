import React, {useRef, useState, useEffect} from 'react';
import {Button, message, Table as AntTable} from 'antd';
import {crmBusinessDetailedDelete, crmBusinessDetailedList} from '@/pages/Crm/business/BusinessUrl';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import * as SysField from '@/pages/Crm/business/BusinessField';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';
import CrmBusinessDetailedEdit from '@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedEdit';
import ItemPackage from '@/pages/Crm/business/BusinessEdit/components/ItemPackage';
import ItemsList from '@/pages/Erp/items/ItemsList';
import ErpPackageList from '@/pages/Erp/package/packageList';
import {crmBusinessDetailedAdd} from '@/pages/Crm/business/crmBusinessDetailed/crmBusinessDetailedUrl';
import Breadcrumb from '@/components/Breadcrumb';
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';
import {contractDetailDelete, contractDetailList} from '@/pages/Crm/contract/contractDetail/contractDetailUrl';
import ContractDetailEdit from '@/pages/Crm/contract/contractDetail/contractDetailEdit';

const {FormItem} = Form;
const {Column} = AntTable;

const formActionsPublic = createFormActions();

const TableDetail = (props) => {
  const {value} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  const refAddOne = useRef(null);
  const refAddAll = useRef(null);

  const searchForm = () => {
    return (
      <>
        <FormItem style={{'display': 'none'}} name="contractId" value={value} component={SysField.BusinessId} />
        <FormItem label="产品名称" name="itemId" component={SysField.itemId} />
      </>
    );
  };

  return (
    <>
      <div style={{textAlign: 'right'}}>
        <Button key="1" style={{marginRight: 10}} onClick={() => {
          refAddOne.current.open(false);
        }}>
          添加产品
        </Button>
        <Modal
          width={1600}
          title="选择"
          component={ItemsList}
          onSuccess={() => {
            refAddOne.current.close();
            tableRef.current.submit();
          }} ref={refAddOne}
          contractId={value}
        />
        <Button key="2" onClick={() => {
          refAddAll.current.open(false);
        }}>
          添加产品套餐
        </Button>
        <Modal
          width={700}
          title="选择"
          component={ItemPackage}
          onSuccess={() => {
            refAddAll.current.close();
            tableRef.current.submit();
          }} ref={refAddAll}
          disabled={false}
          contractId={value}
        />
      </div>
      <Table
        contentHeight
        headStyle={{display: 'none'}}
        api={contractDetailList}
        rowKey="id"
        searchForm={searchForm}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="items" render={(value, record) => {
          return (
            <div>
              {
                record.itemsResult ? record.itemsResult.name : null
              }
            </div>
          );
        }} />
        <Column title="销售单价" dataIndex="salePrice" />
        <Column title="数量" dataIndex="quantity" />
        <Column title="小计" dataIndex="totalPrice" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }} />
              <DelButton api={contractDetailDelete} value={record.id} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="产品" component={ContractDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};
export default TableDetail;
