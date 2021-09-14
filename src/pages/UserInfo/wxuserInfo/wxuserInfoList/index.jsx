/**
 * 用户小程序关联列表页
 *
 * @author cheng
 * @Date 2021-09-14 08:37:48
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {wxuserInfoDelete, wxuserInfoList} from '../wxuserInfoUrl';
import WxuserInfoEdit from '../wxuserInfoEdit';
import * as SysField from '../wxuserInfoField';
import Modal from '@/components/Modal';
import User from '@/pages/UserInfo/openUserInfo/components/User';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const WxuserInfoList = () => {
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
        <AddButton name='手动添加' onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="用户id" name="userId" component={SysField.UserId} />
        <FormItem label="用户第三方系统的唯一id" name="uuid" component={SysField.Uuid} />
        <FormItem label="会员编号" name="memberId" component={SysField.MemberId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={wxuserInfoList}
        rowKey="userInfoId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="用户名称" dataIndex="userId" />
        <Column title="微信用户" dataIndex="memberId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              {/*<EditButton onClick={() => {*/}
              {/*  ref.current.open(record.userInfoId);*/}
              {/*}} />*/}
              <DelButton api={wxuserInfoDelete} value={record.userInfoId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="编辑" component={WxuserInfoEdit} onSuccess={() => {
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

export default WxuserInfoList;
