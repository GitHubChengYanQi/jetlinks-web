/**
 * 质检任务列表页
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Badge, Button, Table as AntTable} from 'antd';
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
import QualityTaskDetailList from '@/pages/Erp/qualityCheck/components/qualityTaskDetail/qualityTaskDetailList';

const {Column} = AntTable;
const {FormItem} = Form;

const QualityTaskList = () => {
  const ref = useRef(null);
  const detail = useRef(null);
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
        <FormItem label="类型" style={{width: 200}} name="type" component={SysField.Type} />
        <FormItem label="状态" name="state" component={SysField.State} />
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
        <Column title="编号" dataIndex="coding" render={(value, record) => {
          return (
            <>
              <Code id={record.qualityTaskId} source="quality" />
              <a onClick={() => {
                detail.current.open(record);
              }}>
                {value}
              </a>
            </>
          );
        }} />
        <Column title="类型" dataIndex="type" />
        <Column title="负责人" dataIndex="userName" />
        <Column title="状态" dataIndex="state" render={(value) => {
          return value === 0 ? <Badge text="进行中" color="blue" /> : <Badge text="已完成" color="green" />;
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="备注" dataIndex="remark" />
        <Column />
      </Table>
      <Modal width={1200} title="编辑" component={QualityTaskEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={1200} component={QualityTaskDetailList} onSuccess={() => {
        detail.current.close();
      }} ref={detail} />
    </>
  );
};

export default QualityTaskList;
