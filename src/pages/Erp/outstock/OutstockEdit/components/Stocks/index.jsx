import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import AddButton from '@/components/AddButton';
import * as SysField from '@/pages/Erp/stock/StockField';
import Table from '@/components/Table';
import {stockDelete, stockList} from '@/pages/Erp/stock/StockUrl';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import StockEdit from '@/pages/Erp/stock/StockEdit';
import CheckButton from '@/components/CheckButton';

const {Column} = AntTable;
const {FormItem} = Form;

const Stocks = (props) => {
  const {ckeck} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="仓库名称" name="pname" component={SysField.PalceId}/>
        <FormItem label="产品名称" name="iname" component={SysField.ItemId}/>
      </>
    );
  };
  const [val,setVal] = useState();

  return (

    <>
      <Input  value={val}/>
      <Table
        api={stockList}
        rowKey="stockId"
        searchForm={searchForm}
      >
        <Column title="仓库名称" dataIndex="pname"/>
        <Column title="产品名称" dataIndex="iname"/>
        <Column title="品牌" dataIndex="bname"/>
        <Column title="数量" dataIndex="inventory"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                setVal(record.stockId);
                ckeck(record.stockId);
              }}
              />
            </>
          );
        }} width={300}/>
      </Table>
    </>
  );
};

export default Stocks;
