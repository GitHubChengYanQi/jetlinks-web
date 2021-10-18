/**
 * 产品属性表列表页
 *
 * @author song
 * @Date 2021-10-18 11:28:39
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {itemAttributeDelete, itemAttributeList} from '../itemAttributeUrl';
import ItemAttributeEdit from '../itemAttributeEdit';
import * as SysField from '../itemAttributeField';

const {Column} = AntTable;
const {FormItem} = Form;

const ItemAttributeList = () => {
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
        <FormItem label="属性名" name="version" component={SysField.Version} />
      </>
    );
  };

  return (
    <>
      <Table
        contentHeight
        title={<h2>列表</h2>}
        api={itemAttributeList}
        rowKey="attributeId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="产品名称" dataIndex="itemId" />
        <Column title="属性名称" dataIndex="attribute" />

        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.attributeId);
              }} />
              <DelButton api={itemAttributeDelete} value={record.attributeId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={ItemAttributeEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ItemAttributeList;
