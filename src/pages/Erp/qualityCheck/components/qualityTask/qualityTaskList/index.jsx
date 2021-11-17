/**
 * 质检任务列表页
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {qualityTaskDelete, qualityTaskList} from '../qualityTaskUrl';
import QualityTaskEdit from '../qualityTaskEdit';
import * as SysField from '../qualityTaskField';
import Modal from '@/components/Modal';
import Code from '@/pages/Erp/spu/components/Code';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const QualityTaskList = () => {
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
        <FormItem label="类型" style={{width:200}} name="type" component={SysField.Type} />
        <FormItem label="负责人" style={{width:200}} name="userId" component={SysField.UserId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={qualityTaskList}
        rowKey="qualityTaskId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="编码" dataIndex="coding" render={(value, record) => {
          return (
            <>
              <Code id={record.qualityTaskId} source="quality" />
              {value}
            </>
          );
        }} />
        <Column title="类型" dataIndex="type" />
        <Column title="负责人" dataIndex="userId" />
        <Column title="备注" dataIndex="remark" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.qualityTaskId);
              }} />
              <DelButton api={qualityTaskDelete} value={record.qualityTaskId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={1200} title="编辑" component={QualityTaskEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default QualityTaskList;
