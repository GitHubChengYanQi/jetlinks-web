import React, {useEffect, useRef, useState} from 'react';
import {Grid, Card, Button, Icon, Table, Dialog, Switch, Loading, Pagination} from '@alifd/next';

import {useRequest} from '@/Config/BaseRequest';
import {userFreeze, userList, userRemove, userReset, userUnfreeze} from '@/Config/ApiUrl/system/user';
import DeptTree from '@/components/DeptTree';
import DelButton from '@/components/DelButton';
import UserRole from '@/pages/setting/system/user/UserRole';
import Message from '@/components/Message';
import UserEdit from '../UserEdit';

const {Row, Col} = Grid;

const defaultSearch = {
  search: {},
  pages: {
    page: 1,
  }
};

const UserList = () => {

  const [searchData, setSearchData] = useState({...defaultSearch});
  const [pages, setPages] = useState({...defaultSearch.pages});

  const {loading, request} = useRequest(userList);

  const [dataSource, setDataSource] = useState([]);
  const [id, setId] = useState(null);
  const [roleUserId, setRoleUserId] = useState(null);

  const ref = useRef();

  const getUserList = async () => {
    const {error, response} = await request();
    if (error) {
      setDataSource([]);
    } else {
      setDataSource(response.data);
      setPages({...pages, total: response.count, pageSize: response.pageSize});
    }
  }

  const {loading: removeLoading, request: removeRequest} = useRequest(userRemove);
  const remove = async (userId) => {
    const {error} = await removeRequest({
      data: {userId},
    });
    if (error) {
      Message.error(error.message);
    } else {
      getUserList();
    }
  }

  const RenderActions = () => {
    return (
      <>
        <Button className="button-right-margin" onClick={() => {
          getUserList();
        }}><Icon type="refresh"/></Button>
        <Button
          type='primary'
          onClick={() => {
            setId(0);
          }}>添加</Button>
      </>
    );
  }

  const {loading: resetLoading,request: resetRequest} = useRequest(userReset);
  const reset = async (userId) => {
    const {error} = await resetRequest({
      data: {userId},
    });
    if (error) {
      Message.error(error.message);
    }
  }

  const {loading: freezeLoading, request: freezeRequest} = useRequest(userFreeze);
  const freeze = async (userId) => {
    const {error} = await freezeRequest({
      data: {userId},
    });
    if (error) {
      Message.error(error.message);
    }
    getUserList();
  }

  const {loading: unfreezeLoading, request: unfreezeRequest} = useRequest(userUnfreeze);
  const unfreeze = async (userId) => {
    const {error} = await unfreezeRequest({
      data: {userId},
    });
    if (error) {
      Message.error(error.message);
    }
    getUserList();
  }

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
  }

  const renderOption = (value, index, record) => {
    return (
      <>
        <Button type='primary' className="button-right-margin" onClick={() => {
          setId(record.userId);
        }}>修改</Button>
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
        <DelButton onSuccess={() => {
          remove(record.userId);
        }}/>
      </>
    );
  }

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Card className='main-block' contentHeight='auto' style={{
      // maxWidth: 1400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <Card.Header title={<h2>用户管理</h2>} extra={<RenderActions/>}/>
      <Card.Content className='topLine'>
        <Grid.Row gutter={20}>
          <Grid.Col fixedSpan={14}>
            <DeptTree/>
          </Grid.Col>
          <Grid.Col>
            <Table
              dataSource={dataSource}
              hasBorder={false}
              loading={loading || removeLoading||resetLoading}
              onSort={(dataIndex, order) => {
                console.log(dataIndex, order);
              }}
            >
              <Table.Column title="账号" dataIndex="account" width={120}/>
              <Table.Column title="姓名" dataIndex="name" width={120}/>
              <Table.Column title="性别" dataIndex="sexName" width={80}/>
              <Table.Column title="部门" dataIndex="deptName" width={120}/>
              <Table.Column title="职位" dataIndex="positionName" width={200}/>
              <Table.Column title="创建时间" dataIndex="createTime" width={200}/>
              <Table.Column title="状态" cell={renderStatus} dataIndex="statusName" width={80}/>
              <Table.Column/>
              <Table.Column title="操作" cell={renderOption} align='right'/>
            </Table>
            <Row className="page">
              <Col/>
              <Col className="page-right">
                <Pagination
                  {...pages}
                  onChange={(page) => {
                    searchData.pages.page = page;
                    setSearchData({...searchData});
                  }}/>
              </Col>
            </Row>
          </Grid.Col>
        </Grid.Row>
      </Card.Content>
      <UserEdit
        id={id}
        onClose={() => {
          getUserList();
          setId(null);
        }}
        onViewError={() => {
          Message.error();
          setId(null);
        }}
      />
      <UserRole
        id={roleUserId}
        onClose={() => {
          setRoleUserId(null);
        }}
      />
      <Loading fullScreen visible={freezeLoading || unfreezeLoading}/>
    </Card>
  );
};

export default UserList;
