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
  const compoentRef = useRef(null);
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
              <a onClick={() => {
                detail.current.open(record.qualityTaskId);
              }}>
                {value}
              </a>
            </>
          );
        }} />
        <Column title="类型" dataIndex="type" />
        <Column title="负责人" dataIndex="userName" />
        <Column title="状态" dataIndex="state" render={(value) => {
          switch (value) {
            case -1:
              return <Badge text="已拒绝" color="red" />;
            case 0:
              return <Badge text="待分派" color="red" />;
            case 1:
              return <Badge text="已分派" color="yellow" />;
            case 2:
              return <Badge text="已完成" color="blue" />;
            case 3:
              return <Badge text="已入库" color="green" />;
            default:
              break;
          }
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="备注" dataIndex="remark" />
        <Column />
      </Table>
      <Modal
        width={1250}
        title="质检任务"
        compoentRef={compoentRef}
        component={QualityTaskEdit}
        footer={<Button
          type="primary"
          onClick={() => {
            compoentRef.current.formRef.current.submit();
          }}>
          发起
        </Button>}
        onSuccess={() => {
          tableRef.current.refresh();
          ref.current.close();
        }}
        ref={ref} />
      <Modal width={1200} component={QualityTaskDetailList} onSuccess={() => {
        detail.current.close();
      }} ref={detail} />
    </>
  );
};

export default QualityTaskList;
