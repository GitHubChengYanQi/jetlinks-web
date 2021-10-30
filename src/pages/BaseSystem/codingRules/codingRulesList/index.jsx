/**
 * 编码规则列表页
 *
 * @author song
 * @Date 2021-10-22 17:20:05
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Select, Table as AntTable} from 'antd';
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
import CodingRulesClassificationList
  from '@/pages/Erp/codingRules/components/codingRulesClassification/codingRulesClassificationList';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';
import RulesRelationList from '@/pages/Erp/codingRules/components/rulesRelation/rulesRelationList';

const formActionsPublic = createFormActions();
const {Column} = AntTable;
const {FormItem} = Form;

const CodingRulesList = () => {
  const ref = useRef(null);
  const refRule = useRef(null);
  const tableRef = useRef(null);


  const [state, {toggle}] = useBoolean();

  const actions = () => {
    return (
      <>
        <Button type='link' onClick={()=>{
          refRule.current.open(false);
        }}>
          默认规则设置
        </Button>
        <Button onClick={() => {
          toggle();
        }}>编码分类管理</Button>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} style={{marginLeft: 16}} />
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


  return (
    <>
      {
        state ?
          <CodingRulesClassificationList toggle={() => {
            toggle();
          }} />
          :
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
            <Column title="分类" dataIndex="codingRulesClassificationId" render={(value,record)=>{
              return (
                <>
                  {record.codingRulesClassificationResult && record.codingRulesClassificationResult.name}
                </>
              );
            }} />
            <Column title="编码规则" dataIndex="codingRules" />
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
      }
      <Drawer width={800} title="编辑" component={CodingRulesEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />

      <Drawer width={800} title="编辑" component={RulesRelationList} onSuccess={() => {
        tableRef.current.refresh();
        refRule.current.close();
      }} ref={refRule} />
    </>
  );
};

export default CodingRulesList;
