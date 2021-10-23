/**
 * 编码规则列表页
 *
 * @author song
 * @Date 2021-10-22 17:20:05
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {codingRulesDelete, codingRulesList} from '../codingRulesUrl';
import CodingRulesEdit from '../codingRulesEdit';
import * as SysField from '../codingRulesField';
import Breadcrumb from '@/components/Breadcrumb';
import {createFormActions} from '@formily/antd';
import {useBoolean} from 'ahooks';
import CodingRulesClassificationList
  from '@/pages/Erp/codingRules/components/codingRulesClassification/codingRulesClassificationList';

const formActionsPublic = createFormActions();
const {Column} = AntTable;
const {FormItem} = Form;

const CodingRulesList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);

  const [state, {toggle}] = useBoolean();

  const actions = () => {
    return (
      <>
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
          <CodingRulesClassificationList toggle={()=>{
            toggle();
          }} />
          :
          <Table
            title={<Breadcrumb title='编码规则管理' />}
            isModal
            formActions={formActionsPublic}
            api={codingRulesList}
            contentHeight
            rowSelection
            rowKey="codingRulesId"
            searchForm={searchForm}
            actions={actions()}
            ref={tableRef}
          >
            <Column title="编码规则名称" dataIndex="name" />
            <Column title="编码规则分类" dataIndex="codingRulesClassificationId" />
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
    </>
  );
};

export default CodingRulesList;
