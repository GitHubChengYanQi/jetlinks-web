/**
 * 工具表列表页
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Breadcrumb, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {toolDelete, toolList} from '../toolUrl';
import ToolEdit from '../toolEdit';
import * as SysField from '../toolField';
import Modal from '@/components/Modal';
import BadgeState from '@/pages/Crm/customer/components/BadgeState';

const {Column} = AntTable;
const {FormItem} = Form;

const ToolList = () => {
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
        <FormItem label="工具名称" name="name" component={SysField.Name} />
        <FormItem style={{width:200}} label="工具分类" name="toolClassificationId" component={SysField.ToolClassificationId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={toolList}
        rowKey="toolId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="工具编码" dataIndex="coding" />
        <Column title="工具名称" dataIndex="name" />
        <Column title="工具状态" dataIndex="state" render={(value)=>{
          return (
            <BadgeState state={value} text={['启用', '停用']} color={['green', 'red']} />
          );
        }} />
        <Column title="单位" dataIndex="unitId" />
        <Column title="工具分类" dataIndex="toolClassificationId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.toolId);
              }} />
              <DelButton api={toolDelete} value={record.toolId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={800} title="工具" component={ToolEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ToolList;
