/**
 * 参数配置列表页
 *
 * @author
 * @Date 2021-10-20 10:50:00
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {configDelete, configList} from '../configUrl';
import ConfigEdit from '../configEdit';
import * as SysField from '../configField';

const {Column} = AntTable;
const {FormItem} = Form;

const ConfigList = () => {
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
        <FormItem label="名称" name="name" component={SysField.Name} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={configList}
        rowKey="id"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="名称" dataIndex="name" />
        <Column title="属性编码标识" dataIndex="code" />
        <Column title="是否是字典中的值" dataIndex="dictFlag" />
        <Column title="字典类型的编码" dataIndex="dictTypeId" />
        <Column title="属性值，如果是字典中的类型，则为dict的code" dataIndex="value" />
        <Column title="备注" dataIndex="remark" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }} />
              <DelButton api={configDelete} value={record.id} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={ConfigEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ConfigList;
