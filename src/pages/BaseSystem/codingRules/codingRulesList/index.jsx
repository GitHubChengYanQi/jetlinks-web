/**
 * 编码规则列表页
 *
 * @author song
 * @Date 2021-10-22 17:20:05
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Radio, Select, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {codingRulesDelete, codingRulesEdit, codingRulesList} from '../codingRulesUrl';
import CodingRulesEdit from '../codingRulesEdit';
import * as SysField from '../codingRulesField';
import Breadcrumb from '@/components/Breadcrumb';
import {createFormActions} from '@formily/antd';
import {useBoolean} from 'ahooks';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';

const formActionsPublic = createFormActions();
const {Column} = AntTable;
const {FormItem} = Form;

const CodingRulesList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);

  const {run} = useRequest(codingRulesEdit,{
    manual:true,
    onSuccess:()=>{
      tableRef.current.submit();
    }
  });

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
        <FormItem label="编码规则名称" name="name" component={SysField.Name} />
      </>
    );
  };

  const module = (value) => {
    switch (value){
      case 0:
        return '物料';
      case 1:
        return '工具';
      case 2:
        return '质检';
      default:
        break;
    }
  };


  return (
    <>
      <Table
        title={<Breadcrumb title="编码规则管理" />}
        isModal
        formActions={formActionsPublic}
        api={codingRulesList}
        rowSelection
        rowKey="codingRulesId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="编码规则名称" dataIndex="name" />
        <Column title="模块" dataIndex="module" render={(value)=>{
          return (
            <>{module(value)}</>
          );
        }} />
        <Column title="默认规则" dataIndex="state" render={(value,record)=>{
          return (
            <Radio.Group value={value} onChange={(value)=>{
              run({
                data:{
                  codingRulesId:record.codingRulesId,
                  state:value.target.value
                }
              });
            }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          );
        }} />
        <Column title="编码规则" dataIndex="codingRules" render={(value)=>{
          const array = value.split(',');
          let values = '';
          typeof array === 'object' && array.map((items,index)=>{
            return values += items;
          });
          return (
            <>{values}</>
          );
        }} />
        <Column title='描述' dataIndex='note' />
        <Column title="操作" fixed="right" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.codingRulesId);
              }} />
              <DelButton api={codingRulesDelete} value={record.codingRulesId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal width={800} title="编码规则" component={CodingRulesEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />

    </>
  );
};

export default CodingRulesList;
