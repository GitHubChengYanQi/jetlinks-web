/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {stockList} from '../StockUrl';
import * as SysField from '../StockField';

const {Column} = AntTable;
const {FormItem} = Form;

const StockList = () => {
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
        <FormItem label="仓库名称" name="pname" component={SysField.PalceId}/>
        <FormItem label="产品名称" name="iname" component={SysField.ItemId}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={stockList}
        rowKey="stockId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="仓库名称" dataIndex="pname" sorter/>
        <Column title="产品名称" dataIndex="iname" sorter/>
        <Column title="品牌" dataIndex="bname" sorter/>
        <Column title="数量" dataIndex="inventory"/>
        <Column/>
      </Table>
    </>
  );
};

export default StockList;
