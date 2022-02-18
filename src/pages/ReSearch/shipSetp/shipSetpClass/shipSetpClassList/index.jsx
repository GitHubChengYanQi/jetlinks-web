/**
 * 工序分类表列表页
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {useRef} from 'react';
import {Table as AntTable} from 'antd';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {shipSetpClassDelete, shipSetpClassList} from '../shipSetpClassUrl';
import ShipSetpClassEdit from '../shipSetpClassEdit';
import * as SysField from '../shipSetpClassField';
import Breadcrumb from '@/components/Breadcrumb';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ShipSetpClassList = () => {
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
        <FormItem label="工序分类名称" name="shipSetpClassName" component={SysField.ShipSetpClassName} />
      </>
    );
  };

  return (
    <div style={{padding:16}}>
      <Table
        title={<Breadcrumb title='工序分类' />}
        contentHeight
        noRowSelection
        formActions={formActionsPublic}
        api={shipSetpClassList}
        rowKey="shipSetpClassId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="工序分类名称" dataIndex="shipSetpClassName" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.shipSetpClassId);
              }} />
              <DelButton api={shipSetpClassDelete} value={record.shipSetpClassId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={ShipSetpClassEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </div>
  );
};

export default ShipSetpClassList;
