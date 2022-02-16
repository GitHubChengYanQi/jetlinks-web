/**
 * 工艺路线列表列表页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 14:12:28
 */

import React, {useRef} from 'react';
import {Button, Table as AntTable} from 'antd';
import {useHistory} from 'ice';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {processRouteDelete, processRouteList} from '../processRouteUrl';
import * as SysField from '../processRouteField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcessRouteList = () => {
  const tableRef = useRef(null);
  const history = useHistory(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          history.push('/SPU/processRoute/add');
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="工艺路线编号" name="processRouteCoding" component={SysField.ProcessRouteCoding} />
        <FormItem label="工艺路线名称" name="processRoteName" component={SysField.ProcessRoteName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={processRouteList}
        rowKey="processRouteId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="工艺路线编号" dataIndex="processRouteCoding" />
        <Column title="工艺路线名称" dataIndex="processRoteName" />
        <Column title="关联工艺物料清单" dataIndex="partsId" />
        <Column title="版本号" dataIndex="version" />
        <Column title="状态" dataIndex="status" />
        <Column />
        <Column title="操作" align="right" dataIndex="processRouteId" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                history.push(`/SPU/processRoute/${value}`);
              }} />
              <DelButton api={processRouteDelete} value={record.processRouteId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
    </>
  );
};

export default ProcessRouteList;
