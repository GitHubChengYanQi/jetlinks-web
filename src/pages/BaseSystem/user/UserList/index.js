import React, {useEffect, useRef, useState} from 'react';

import {Grid, Card, Icon, Dialog, Loading, Pagination} from '@alifd/next';

import {userFreeze, userList, userRemove, userReset, userUnfreeze} from '@/Config/ApiUrl/system/user';
import DeptTree from '@/components/DeptTree';
import DelButton from '@/components/DelButton';
import Message from '@/components/Message';
import Table from '@/components/Table';
import {Form, Input, Button, Switch} from 'antd';
import {useRequest} from '@/util/Request';
import {UserOutlined} from '@ant-design/icons';

const UserList = () => {
  const ref = useRef();
  const searchForm = () => {
    return (
      <>
        <Form.Item name="name" label="名称">
          <Input.Search placeholder="按名称搜索" onSearch={() => {
            ref.current.submit();
          }} enterButton/>
        </Form.Item>
      </>
    );
  };

  const [id, setId] = useState(null);
  const [roleUserId, setRoleUserId] = useState(null);

  // 冻结账号
  const {run: freezeRun} = useRequest(userFreeze,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      },
      onSuccess: () => ref.current.refresh()
    });
  const freeze = async (userId) => {
    freezeRun({data: {userId}});
  };

  // 解冻账号
  const {run: unfreezeRun} = useRequest(userUnfreeze,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      },
      onSuccess: () => ref.current.refresh()
    });
  const unfreeze = (userId) => {
    unfreezeRun({data: {userId}});
  };


  const {run: resetRun} = useRequest(userReset,
    {
      manual: true,
      onError: (error) => {
        Message.error(error.message);
      }
    });

  const reset = async (userId) => {
    resetRun({
      data: {userId},
    });
  };

  const columns = [
    {
      title: '账号',
      dataIndex: 'account'
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sexName'
    },
    {
      title: '部门',
      dataIndex: 'deptName'
    },
    {
      title: '职位',
      dataIndex: 'positionName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '状态',
      render: (value, record) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="冻结"
            style={{width: 60}}
            defaultChecked={record.status === 'ENABLE'}
            onChange={(checked) => {
              if (checked) {
                unfreeze(record.userId);
              } else {
                freeze(record.userId);
              }
            }}
          />
        );
      }
    },
    {
      title: '操作',
      align: 'right',
      render: (value, record) => {
        return (
          <>
            <Button type='secondary' className="button-left-margin" onClick={() => {
              setRoleUserId(record.userId);
            }}>分配角色</Button>
            <Button type='normal' className="button-left-margin" onClick={() => {
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
      }
    }
  ];

  return (
    <Table
      ref={ref}
      title={<h2><UserOutlined/> 用户管理</h2>}
      api={userList}
      columns={columns}
      rowKey="userId"
      searchForm={searchForm}
    />
  );
};

export default UserList;
