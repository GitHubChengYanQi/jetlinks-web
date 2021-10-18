/**
 * 派工表列表页
 *
 * @author n
 * @Date 2021-08-23 10:25:48
 */

import React, {useRef} from 'react';
import {Button, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';
import {ucMemberList} from '@/pages/Portal/CreateUser/CreateUserUrl';
import UserEdit from '@/pages/BaseSystem/user/UserEdit';
import Drawer from '@/components/Drawer';
import CreateUserEdit from '@/pages/Portal/CreateUser/CreateUserEdit';
import Modal from '@/components/Modal';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';


const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const CreateUserList = () => {

  const ref = useRef(null);
  const tableRef = useRef(null);

  return (
    <>
      <Table
        api={ucMemberList}
        formActions={formActionsPublic}
        rowKey="memberId"
        // searchForm={searchForm}
        isModal={false}
        ref={tableRef}
        footer={false}
      >
        <Column title="微信名" dataIndex="memberId" render={(value,record)=>{
          return (
            <>
              {record.openUserInfo && record.openUserInfo.username}
            </>
          );
        }} />
        <Column title="手机号" dataIndex="phone" />
        <Column title='操作' width={200} align='center' render={(value,record)=>{
          return (
            <>
              <Button onClick={()=>{
                ref.current.open(false);
                ref.current.User(record);
              }} type='link' >添加客户</Button>
            </>
          );
        }} />
      </Table>
      <CreateNewCustomer ref={ref} widths={1200} />
    </>
  );
};

export default CreateUserList;
