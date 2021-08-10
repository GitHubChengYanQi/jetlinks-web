/**
 * 仓库产品明细表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import { stockDetailsList} from '../StockDetailsUrl';
import * as SysField from '../StockDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const StockDetailsList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>

      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="库存编号" name="stockId" component={SysField.StockId}/>
        <FormItem label="仓库名称" name="pname" component={SysField.StockId}/>
        <FormItem label="产品名称" name="iname" component={SysField.StockId}/>
        <FormItem label="入库时间" name="storageTime" component={SysField.StorageTime}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={stockDetailsList}
        rowKey="stockItemId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="库存编号" dataIndex="stockId"/>
        <Column title="仓库名称" dataIndex="pname"/>
        <Column title="产品名称" dataIndex="iname" sorter/>
        <Column title="产品价格" dataIndex="price" sorter/>
        <Column title="入库时间" dataIndex="storageTime" sorter/>
      </Table>
    </>
  );
};

export default StockDetailsList;
