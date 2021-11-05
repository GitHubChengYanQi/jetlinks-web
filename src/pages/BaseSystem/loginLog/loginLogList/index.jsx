import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import {loginLogDelete, loginLogList} from '../loginLogUrl';
import LoginLogEdit from '../loginLogEdit';

const {Column} = AntTable;

const MenuList = () => {
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

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={loginLogList}
        rowKey="loginLogId"
        actions={actions()}
        ref={tableRef}
      >
        <Column title="日志名称" dataIndex="logName" />
        <Column title="管理员id" dataIndex="userId" />
        <Column title="创建时间" dataIndex="createTime" />
        <Column title="是否执行成功" dataIndex="succeed" />
        <Column title="具体消息" dataIndex="message" />
        <Column title="登录ip" dataIndex="ipAddress" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.loginLogId);
              }} />
              <DelButton api={loginLogDelete} value={record.loginLogId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={LoginLogEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default MenuList;
