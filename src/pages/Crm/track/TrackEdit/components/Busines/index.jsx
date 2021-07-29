import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';

import Table from '@/components/Table';
import CheckButton from '@/components/CheckButton';
import {items, places, stockAdd, stockDetail, stockEdit} from '@/pages/Erp/stock/StockUrl';
import {businessList, ClientList} from '@/pages/Crm/business/BusinessUrl';
import * as SysField from '@/pages/Crm/business/BusinessField';

const {Column} = AntTable;
const {FormItem} = Form;

const Busines = (props) => {
  const {ckeck} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="客户名称" name="name" component={SysField.ClitenId}/>
        <FormItem label="机会来源" name="source" component={SysField.Source}/>
        <FormItem label="立项日期" name="time" component={SysField.TimeSearch}/>
        <FormItem label="商机状态" name="state" component={SysField.State}/>
        <FormItem label="商机阶段" name="stage" component={SysField.Stage}/>
        <FormItem label="负责人" name="person" component={SysField.Person}/>
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
        title={<h2>列表</h2>}
        api={businessList}
        rowKey="businessId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户名称" dataIndex="name"/>
        <Column title="机会来源" dataIndex="source"/>
        <Column title="立项日期" dataIndex="time"/>
        <Column title="商机状态" dataIndex="state"/>
        <Column title="商机阶段" dataIndex="stage"/>
        <Column title="负责人" dataIndex="person"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                setVal(record.businessId);
                ckeck(record.businessId);
              }}
              />
            </>
          );
        }}/>
      </Table>
    </>
  );
};

export default Busines;
