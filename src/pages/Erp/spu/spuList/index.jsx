/**
 * 列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {spuDelete, spuList} from '../spuUrl';
import SpuEdit from '../spuEdit';
import * as SysField from '../spuField';
import {useHistory} from 'ice';

const {Column} = AntTable;
const {FormItem} = Form;

const SpuList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory();

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
        <FormItem label="物品名字" name="name" component={SysField.Name} />
        <FormItem label="类目id" name="categoryId" component={SysField.CategoryId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={spuList}
        rowKey="spuId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物品名字" dataIndex="name" render={(value,record)=>{
          return (
            <Button type='link' onClick={()=>{
              history.push(`/ERP/spu/${record.spuId}`);
            }}>
              {value}
            </Button>
          );
        }} />

        <Column title="类目id" dataIndex="categoryId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.spuId);
              }} />
              <DelButton api={spuDelete} value={record.spuId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={SpuEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default SpuList;
