/**
 * 话术分类列表页
 *
 * @author
 * @Date 2021-09-13 13:00:15
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {speechcraftTypeDelete, speechcraftTypeList} from '../speechcraftTypeUrl';
import SpeechcraftTypeEdit from '../speechcraftTypeEdit';
import * as SysField from '../speechcraftTypeField';
import Modal from '@/components/Modal';
import SpeechcraftTypeDetailList
  from '@/pages/Crm/speechcraft/speechcraftType/speechcraftTypeDetail/speechcraftTypeDetailList';
import {createFormActions} from '@formily/antd';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;
const formActions = createFormActions();
const SpeechcraftTypeList = () => {
  const ref = useRef(null);
  const refDetail = useRef(null);
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
        <FormItem label="分类排序" name="speechcraftTypeSort" component={SysField.SpeechcraftTypeSort} />
        <FormItem label="分类名称" name="speechcraftTypeName" component={SysField.SpeechcraftTypeName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={speechcraftTypeList}
        rowKey="speechcraftTypeId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        formActions={formActions}
      >
        <Column
          title="分类名称"
          dataIndex="speechcraftTypeName"
          // render={(value, record) => {
          //   return (
          //     <Button type="link" onClick={() => {
          //       refDetail.current.open(record.speechcraftTypeId);
          //     }}>{value}</Button>
          //   );
          // }}
        />
        <Column title="分类排序" dataIndex="speechcraftTypeSort" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.speechcraftTypeId);
              }} />
              <DelButton api={speechcraftTypeDelete} value={record.speechcraftTypeId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={SpeechcraftTypeEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={800} title="话术分类明细" component={SpeechcraftTypeDetailList} onSuccess={() => {
        tableRef.current.refresh();
        refDetail.current.close();
      }} ref={refDetail} />
    </>
  );
};

export default SpeechcraftTypeList;
