import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/items/ItemsField';
import Table from '@/components/Table';
import CheckButton from '@/components/CheckButton';
import {items, places, stockAdd, stockDetail, stockEdit} from '@/pages/Erp/stock/StockUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const Items = (props) => {
  const {allData} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="产品名字" name="name" component={SysField.Name} />
        <FormItem label="生产日期" name="productionTime" component={SysField.ProductionTime} />
        <FormItem label="重要程度" name="important" component={SysField.Name} />
        <FormItem label="产品重量" name="weight" component={SysField.Name} />
        <FormItem label="材质" name="materialName" component={SysField.Name} />
        <FormItem label="易损" name="vulnerability" component={SysField.Name} />
      </>
    );
  };
  const [val,setVal] = useState();

  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>

      </>
    );
  };

  return (
    <>
      <Input value={val}/>
      <Table
        api={items}
        rowKey="itemId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名字" dataIndex="name" />
        <Column title="质保期" dataIndex="shelfLife" />
        <Column title="产品库存" dataIndex="inventory" />
        <Column title="生产日期" dataIndex="productionTime" />
        <Column title="重要程度" dataIndex="important" />
        <Column title="产品重量" dataIndex="weight" />
        <Column title="材质" dataIndex="materialName" />
        <Column title="成本" dataIndex="cost" />
        <Column title="易损" dataIndex="vulnerability" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                setVal(record.itemId);
                allData(record);
              }}
              />
            </>
          );
        }}/>
      </Table>
    </>
  );
};

export default Items;
