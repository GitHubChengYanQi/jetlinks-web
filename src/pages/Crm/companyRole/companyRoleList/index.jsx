/**
 * 公司角色表列表页
 *
 * @author
 * @Date 2021-09-06 11:29:56
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {companyRoleDelete, companyRoleList} from '../companyRoleUrl';
import CompanyRoleEdit from '../companyRoleEdit';
import * as SysField from '../companyRoleField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const CompanyRoleList = () => {
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
        <FormItem label="职位" name="position" component={SysField.Position} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb title='角色管理'/>}
        api={companyRoleList}
        rowKey="companyRoleId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="职位" dataIndex="position" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.companyRoleId);
              }} />
              <DelButton api={companyRoleDelete} value={record.companyRoleId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={CompanyRoleEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CompanyRoleList;
