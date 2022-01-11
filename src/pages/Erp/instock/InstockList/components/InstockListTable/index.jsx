import Breadcrumb from '@/components/Breadcrumb';
import {instockList} from '@/pages/Erp/instock/InstockUrl';
import Table from '@/components/Table';
import React, {useImperativeHandle, useRef, useState} from 'react';
import {createFormActions} from '@formily/antd';
import * as SysField from '@/pages/Erp/instock/InstockField';
import {Spin, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {request, useRequest} from '@/util/Request';
import TreeSelectSee from '@/pages/Erp/TreeSelectSee';

const formActionsPublic = createFormActions();

const {Column} = AntTable;
const {FormItem} = Form;

const InstockListTable = ({...props}, ref) => {

  const tableRef = useRef(null);

  const {loading, data} = useRequest({
    url: '/storehousePositions/treeView',
    method: 'GET',
  });

  useImperativeHandle(ref, () => ({
    tableRef,
  }));

  const searchForm = () => {

    return (
      <FormItem name="instockOrderId" value={props.value} component={SysField.barcode} />
    );
  };

  if (loading) {
    return <Spin />;
  }

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
      <Column title="物料" render={(text, record) => {
        return (
          <>
            {record.spuResult && record.spuResult.spuClassificationResult && record.spuResult.spuClassificationResult.name}
            &nbsp;/&nbsp;
            {record.spuResult && record.spuResult.name}
            &nbsp;&nbsp;
            <em style={{color: '#c9c8c8', fontSize: 10}}>
              (
              {
                record.backSkus
                &&
                record.backSkus.map((items, index) => {
                  return (
                    <span key={index}>{items.itemAttribute.attribute}：{items.attributeValues.attributeValues}</span>
                  );
                })
              }
              )
            </em>
          </>
        );

      }} sorter />
      <Column title="供应商(品牌)" dataIndex="brandId" width={200} render={(text, record) => {
        return (
          <>
            {record.brandResult && record.brandResult.brandName}
          </>
        );
      }} sorter />
      <Column title="仓库库位" dataIndex="storehouseId" render={(text, record) => {

        return (
          <>
            {record.storehouseResult && record.storehouseResult.name}
            {record.storehousePositionsId !== 0 && record.storehousePositionsId
            &&
            <>
              -<TreeSelectSee data={data} value={record.storehousePositionsId} />
            </>}
          </>
        );
      }} sorter />
      <Column title="数量" width={120} align="center" dataIndex="number" sorter />
      <Column title="总价" width={120} align="center" dataIndex="costPrice" sorter />
      <Column title="单价" width={120} align="center" dataIndex="sellingPrice" sorter />
    </Table>
  );
};

export default React.forwardRef(InstockListTable);
