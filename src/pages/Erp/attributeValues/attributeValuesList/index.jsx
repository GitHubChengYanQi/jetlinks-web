/**
 * 产品属性数据表列表页
 *
 * @author song
 * @Date 2021-10-18 11:30:54
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {attributeValuesDelete, attributeValuesList} from '../attributeValuesUrl';
import AttributeValuesEdit from '../attributeValuesEdit';
import * as SysField from '../attributeValuesField';

const {Column} = AntTable;
const {FormItem} = Form;

const AttributeValuesList = () => {
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
        <FormItem label="属性名称" name="attributeId" component={SysField.Difference} />
      </>
    );
  };

  return (
    <>
      <Table
        contentHeight
        title={<h2>列表</h2>}
        api={attributeValuesList}
        rowKey="attributeValuesId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="属性名称" dataIndex="attributeId" />
        <Column title="值" dataIndex="attributeValues" />

        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.attributeValuesId);
              }} />
              <DelButton api={attributeValuesDelete} value={record.attributeValuesId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={AttributeValuesEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default AttributeValuesList;
