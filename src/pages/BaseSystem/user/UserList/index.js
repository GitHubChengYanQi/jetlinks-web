import React, {useEffect, useState} from 'react';
import {Grid, Card, Button, Icon, Table, Dialog, Switch, Loading, Pagination} from '@alifd/next';

import {useRequest, useTableRequest} from '@/Config/BaseRequest';
import {userFreeze, userList, userRemove, userReset, userUnfreeze} from '@/Config/ApiUrl/system/user';
import DeptTree from '@/components/DeptTree';
import DelButton from '@/components/DelButton';
import UserRole from '@/pages/setting/system/user/UserRole';
import Message from '@/components/Message';
import List from '@/components/List';
import { useEva, createAsyncActions, createEffects } from "react-eva";
import UserEdit from '../UserEdit';

const defaultSearch = {
  search: {},
  pages: {
    page: 1,
  }
};

const ApiConfig = {
  listApi: userList,
  delApi: userRemove
};

let func;

const UserList = () => {

  const [id, setId] = useState(null);
  const [roleUserId, setRoleUserId] = useState(null);

  // 冻结账号
  const {request: freezeRequest} = useRequest(userFreeze,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      },
      onSuccess:()=>func.refresh()
    });
  const {run: freezeRun} = freezeRequest();
  const freeze = async (userId) => {
    freezeRun({data: {userId}});
  };

  // 解冻账号
  const {request: unfreezeRequest} = useRequest(userUnfreeze,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      },
      onSuccess:()=>func.refresh()
    });
  const {run: unfreezeRun} = unfreezeRequest();
  const unfreeze = (userId) => {
    unfreezeRun({data: {userId}});
  };


  const {request: resetRequest} = useRequest(userReset,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      }
    });
  const {run: resetRun} = resetRequest();
  const reset = async (userId) => {
    resetRun({
      data: {userId},
    });
  };


  const renderStatus = (value, index, record) => {
    return (
      <Switch
        checkedChildren="启用"
        unCheckedChildren="冻结"
        style={{width: 80}}
        checked={record.status === 'ENABLE'}
        onChange={(checked) => {
          if (checked) {
            unfreeze(record.userId);
          } else {
            freeze(record.userId);
          }
        }}
      />
    );
  };

  const renderOption = (value, index, record) => {
    return (
      <>
        <Button type='secondary' className="button-right-margin" onClick={() => {
          setRoleUserId(record.userId);
        }}>分配角色</Button>
        <Button type='normal' className="button-right-margin" onClick={() => {
          Dialog.confirm({
            title: '提示',
            content: '系统初始化为111111，实际请参考系统设置。',
            onOk: () => {
              reset(record.userId);
            },
            onCancel: () => {
            }
          });
        }}>重置密码</Button>
      </>
    );
  };

  const renderRole = () => {
    return (
      <UserRole
        id={roleUserId}
        onClose={() => {
          setRoleUserId(null);
        }}
      />
    );
  };

  return (
    <List
      Title={<h2>用户管理</h2>}
      Edit={UserEdit}
      OtherNode={renderRole}
      ApiConfig={ApiConfig}
      onLoad={(fun) => {
        func = fun;
      }}
      ListButton={renderOption}
      fieldKey="userId"
    >
      <Table.Column title="账号" dataIndex="account" width={120}/>
      <Table.Column title="姓名" dataIndex="name" width={120}/>
      <Table.Column title="性别" dataIndex="sexName" width={80}/>
      <Table.Column title="部门" dataIndex="deptName" width={120}/>
      <Table.Column title="职位" dataIndex="positionName" width={200}/>
      <Table.Column title="创建时间" dataIndex="createTime" width={200}/>
      <Table.Column title="状态" cell={renderStatus} dataIndex="statusName" width={80}/>
    </List>
  );
};

export default UserList;
