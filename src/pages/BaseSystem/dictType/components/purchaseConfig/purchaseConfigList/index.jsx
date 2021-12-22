/**
 * 采购配置表列表页
 *
 * @author
 * @Date 2021-12-21 13:39:47
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {purchaseConfigDelete, purchaseConfigList} from '../purchaseConfigUrl';
import PurchaseConfigEdit from '../purchaseConfigEdit';
import * as SysField from '../purchaseConfigField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const PurchaseConfigList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="类型" name="type" component={SysField.Type} />
      </>
    );
  };

  const configType = (value) => {
    switch (value) {
      case 'level':
        return '最低级别';
      case 'supply':
        return '非供应商报价';
      default:
        break;
    }
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={purchaseConfigList}
        rowKey="purchaseConfigId"
        // searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="类型" dataIndex="type" render={(value) => {
          return <>
            {configType(value)}
          </>;
        }} />
        <Column title="值" dataIndex="value" render={(value, record) => {
          switch (record.type) {
            case 'level':
              try {
                return value && JSON.parse(value).label;
              } catch (e) {
                return null;
              }
            case 'supply':
              return value;
            default:
              break;
          }
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.purchaseConfigId);
              }} />
              <DelButton api={purchaseConfigDelete} value={record.purchaseConfigId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="采购配置" component={PurchaseConfigEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default PurchaseConfigList;
