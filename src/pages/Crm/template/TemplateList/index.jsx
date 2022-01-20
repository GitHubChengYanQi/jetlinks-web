/**
 * 合同模板列表页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef, useState} from 'react';
import {Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {templateDelete, templateList} from '../TemplateUrl';
import TemplateEdit from '../TemplateEdit';
import * as SysField from '../TemplateField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;
const formActions = createFormActions();
const TemplateList = () => {
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
        <FormItem label="合同模板" name="name" component={SysField.Name} />
      </>
    );
  };


  const [ids, setIds] = useState([]);

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      // ...customerBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <>
      <Table
        footer={footer}
        contentHeight
        onChange={(keys) => {
          setIds(keys);
        }}
        title={<Breadcrumb title="合同模板管理" />}
        api={templateList}
        rowKey="templateId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        formActions={formActions}
      >
        <Column title="合同模板" dataIndex="name" />
        <Column title="合同分类" dataIndex="classResult" render={(value)=>{
          return <>{value && value.name}</>;
        }} />
        <Column title="合同类型" width={120} dataIndex="module" render={(value) => {
          switch (value) {
            case 'procurement':
              return <>采购</>;
            default:
              break;
          }
        }} />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.templateId);
              }} />
              <DelButton api={templateDelete} value={record.templateId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Modal width={1000} title="合同模板" component={TemplateEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default TemplateList;
