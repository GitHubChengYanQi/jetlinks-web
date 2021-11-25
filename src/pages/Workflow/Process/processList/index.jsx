/**
 * 流程主表列表页
 *
 * @author c
 * @Date 2021-11-19 10:58:01
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Radio, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {processDelete, processEdit, processList} from '../processUrl';
import ProcessEdit from '../processEdit';
import * as SysField from '../processField';
import Breadcrumb from '@/components/Breadcrumb';
import {useHistory} from 'ice';
import {useRequest} from '@/util/Request';
import {codingRulesEdit} from '@/pages/BaseSystem/codingRules/codingRulesUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcessList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);

  const {run} = useRequest(processEdit, {
    manual: true,
    onSuccess: () => {
      tableRef.current.submit();
    }
  });

  const history = useHistory();

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
        <FormItem label="名称" name="processName" component={SysField.ProcessName} />
        <FormItem label="类型" name="type" component={SysField.Type} style={{width: 200}} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={processList}
        rowKey="processId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="名称" dataIndex="processName" render={(value, record) => {
          return (
            <>
              <a onClick={() => {
                history.push(`/workflow/process/${record.processId}`);
              }}>{value}</a>
            </>
          );
        }} />
        <Column title="类型" dataIndex="type" render={(value, record) => {
          switch (value) {
            case 'ship':
              return <>工艺</>;
            case 'audit':
              return <>审核</>;
            default:
              break;
          }
        }} />
        <Column title="功能" dataIndex="module" render={(value, record) => {
          switch (value) {
            case 'quality':
              return <>质检</>;
            default:
              break;
          }
        }} />
        <Column title="状态" dataIndex="display" render={(value, record) => {
          switch (value) {
            case 1:
              return <>启用</>;
            case 0:
              return <>停用</>;
            default:
              break;
          }
        }} />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          if (!record.status) {
            return (
              <>
                <Button type="link" onClick={() => {
                  run({
                    data: {
                      processId: record.processId,
                      module: 'quality',
                      status: 99
                    }
                  });
                }}>发布</Button>
                <EditButton onClick={() => {
                  ref.current.open(record.processId);
                }} />
                <DelButton api={processDelete} value={record.processId} onSuccess={() => {
                  tableRef.current.refresh();
                }} />
              </>
            );
          } else {
            return null;
          }

        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={ProcessEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ProcessList;
