/**
 * 付款模板列表页
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React, {useRef} from 'react';
import {Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {paymentTemplateDelete, paymentTemplateList} from '../paymentTemplateUrl';
import PaymentTemplateEdit from '../paymentTemplateEdit';
import * as SysField from '../paymentTemplateField';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const PaymentTemplateList = () => {
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
        listHeader={false}
        api={paymentTemplateList}
        formActions={formActionsPublic}
        contentHeight
        rowKey="templateId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="名称" dataIndex="name" />
        <Column title="是否常用" dataIndex="oftenUser" render={(value) => {
          return value ? '是' : '否';
        }} />
        <Column title="备注" dataIndex="remark" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.templateId);
              }} />
              <DelButton api={paymentTemplateDelete} value={record.templateId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Modal width={900} title="付款计划模板" component={PaymentTemplateEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default PaymentTemplateList;
