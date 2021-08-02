import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';

import Table from '@/components/Table';
import CheckButton from '@/components/CheckButton';
import {items, places, stockAdd, stockDetail, stockEdit} from '@/pages/Erp/stock/StockUrl';
import {
  businessList,
  ClientList, PersonListSelect,
  StageListSelect13,
  StateListSelect12,
  TimeListSelect2
} from '@/pages/Crm/business/BusinessUrl';
import * as SysField from '@/pages/Crm/business/BusinessField';
import {OrgNameListSelect} from '@/pages/Crm/business/BusinessField';

const {Column} = AntTable;
const {FormItem} = Form;

const Busines = (props) => {
  const {ckeck} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="客户名称" name="cusomerName" component={SysField.CustomerNameListSelect}/>
        <FormItem label="机会来源" name="originName" component={SysField.OrgNameListSelect}/>
        <FormItem label="立项日期" name="time" component={SysField.TimeListSelect2}/>
        <FormItem label="商机状态" name="state" component={SysField.StateListSelect12}/>
        <FormItem label="商机阶段" name="stage" component={SysField.StageListSelect13}/>
        <FormItem label="负责人" name="person" component={SysField.PersonListSelect}/>
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
        <Column title="客户名称" dataIndex="customerName"/>
        <Column title="机会来源" dataIndex="originName"/>
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
