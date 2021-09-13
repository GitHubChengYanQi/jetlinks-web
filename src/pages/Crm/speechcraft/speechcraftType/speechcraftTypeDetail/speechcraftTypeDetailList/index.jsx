/**
 * 话术分类详细列表页
 *
 * @author cheng
 * @Date 2021-09-13 15:24:19
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Breadcrumb, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {speechcraftTypeDetailDelete, speechcraftTypeDetailList} from '../speechcraftTypeDetailUrl';
import SpeechcraftTypeDetailEdit from '../speechcraftTypeDetailEdit';
import * as SysField from '../speechcraftTypeDetailField';

const {Column} = AntTable;
const {FormItem} = Form;

const SpeechcraftTypeDetailList = (props) => {

  const {value} = props;

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
        <FormItem hidden display name="speechcraftTypeId" value={value || null} component={SysField.SpeechcraftTypeId} />
        <FormItem label="排序" name="sort" component={SysField.Sort} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={speechcraftTypeDetailList}
        rowKey="speechcraftTypeDetailId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="名称" dataIndex="name" />
        <Column title="排序" dataIndex="sort" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.speechcraftTypeDetailId);
              }} />
              <DelButton api={speechcraftTypeDetailDelete} value={record.speechcraftTypeDetailId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={SpeechcraftTypeDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} speechcraftTypeId={value || null} />
    </>
  );
};

export default SpeechcraftTypeDetailList;
