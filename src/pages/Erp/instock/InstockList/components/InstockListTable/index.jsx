import Breadcrumb from '@/components/Breadcrumb';
import {instockList} from '@/pages/Erp/instock/InstockUrl';
import Table from '@/components/Table';
import React, {useImperativeHandle, useRef, useState} from 'react';
import {createFormActions} from '@formily/antd';
import * as SysField from '@/pages/Erp/instock/InstockField';
import {Table as AntTable} from 'antd';
import Form from '@/components/Form';

const formActionsPublic = createFormActions();

const {Column} = AntTable;
const {FormItem} = Form;

const InstockListTable = ({...props},ref) => {

  const tableRef = useRef(null);

  useImperativeHandle(ref, () => ({
    tableRef,
  }));


  const searchForm = () => {

    return (
      <FormItem name="instockOrderId" value={props.value} component={SysField.barcode} />
    );
  };

  return (
    <Table
      title={<Breadcrumb />}
      api={instockList}
      headStyle={{display: 'none'}}
      rowKey="instockId"
      formActions={formActionsPublic}
      contentHeight
      rowSelection
      isModal={false}
      getCheckboxProps={(record) => ({
        disabled: record.state === 1, // Column configuration not to be checked
      })}
      searchForm={searchForm}
      ref={tableRef}
    >
      <Column title="仓库名称" fixed dataIndex="storehouseId" render={(text, record) => {
        return (
          <>
            {record.storehouseResult && record.storehouseResult.name}
          </>
        );
      }} sorter />
      <Column title="产品" dataIndex="itemId" render={(text, record) => {
        return (
          <>
            {record.itemsResult && record.itemsResult.name}
          </>
        );
      }} sorter />
      <Column title="品牌" dataIndex="brandId" render={(text, record) => {
        return (
          <>
            {record.brandResult && record.brandResult.brandName}
          </>
        );
      }} sorter />
      <Column title="原价" width={120} align="center" dataIndex="costPrice" sorter />
      <Column title="售价" width={120} align="center" dataIndex="sellingPrice" sorter />
    </Table>
  );
};

export default React.forwardRef(InstockListTable);
