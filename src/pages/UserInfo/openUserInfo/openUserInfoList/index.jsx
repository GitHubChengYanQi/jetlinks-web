/**
 * 列表页
 *
 * @author
 * @Date 2021-08-25 08:31:10
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {openUserInfoDelete, openUserInfoList} from '../openUserInfoUrl';
import OpenUserInfoEdit from '../openUserInfoEdit';
import * as SysField from '../openUserInfoField';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import User from '@/pages/UserInfo/openUserInfo/components/User';

const {Column} = AntTable;
const {FormItem} = Form;

const OpenUserInfoList = () => {
  const ref = useRef(null);
  const refUser = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <Button type="primary" onClick={() => {
          refUser.current.open(false);
        }}>
          扫码绑定
        </Button>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="用户名" name="username" component={SysField.Username} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={openUserInfoList}
        isModal={false}
        rowKey="primaryKey"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="用户名" dataIndex="username" />
        <Column title="用户昵称" dataIndex="nickname" />
        <Column title="用户来源" dataIndex="source" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.primaryKey);
              }} />
              <DelButton api={openUserInfoDelete} value={record.primaryKey} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={OpenUserInfoEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={800} component={User} onSuccess={() => {
        tableRef.current.refresh();
        refUser.current.close();
      }} ref={refUser} />
    </>
  );
};

export default OpenUserInfoList;
