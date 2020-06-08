import React, {useEffect, useRef, useState} from 'react';
import {Message, Card, Button, Icon, Table} from '@alifd/next';

import {useRequest} from '@/Config/BaseRequest';
import {roleList, roleRemove} from '@/Config/ApiUrl/system/role';
import RoleEdit from '@/pages/setting/system/role/RoleEdit';
import DelButton from '@/components/DelButton';

const RoleList = () => {

  const {loading, request} = useRequest(roleList);

  const [dataSource, setDataSource] = useState([]);
  const [id, setId] = useState(null);

  const getList = async () => {
    const {error, response} = await request();
    if (error) {
      setDataSource([]);
    } else {
      setDataSource(response.data);
    }
  }
  const {loading: removeLoading, request: removeRequest} = useRequest(roleRemove);
  const remove = async (roleId) => {
    const {error} = await removeRequest({
      params: {roleId},
    });
    if (error) {
      Message.error(error.message);
    } else {
      getList();
    }
  }

  const RenderActions = () => {
    return (
      <>
        <Button className="button-right-margin" onClick={() => {
          getList();
        }}><Icon type="refresh"/></Button>
        <Button type='primary' onClick={() => {
          setId(0);
        }}>添加</Button>
      </>
    );
  }

  const renderOption = (value, index, record) => {
    return (
      <>
        <Button type='primary' className="button-right-margin" onClick={() => {
          setId(record.roleId);
        }}>修改</Button>
        <Button type='secondary' className="button-right-margin">权限配置</Button>
        <DelButton onSuccess={() => {
          remove(record.roleId);
        }}/>
      </>
    );
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Card className='main-block' contentHeight='auto' style={{
        // maxWidth: 1400,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <Card.Header title={<h2>角色管理</h2>} extra={<RenderActions/>}/>
        <Card.Content className='topLine'>
          <Table
            dataSource={dataSource}
            hasBorder={false}
            loading={loading || removeLoading}
            onSort={(dataIndex, order) => {
              console.log(dataIndex, order);
            }}>
            <Table.Column title="名称" dataIndex="name" width={200}/>
            <Table.Column title="上级角色" dataIndex="pName" width={200}/>
            <Table.Column title="别名" dataIndex="description" width={300}/>
            <Table.Column/>
            <Table.Column title="操作" cell={renderOption} align='right' width={280}/>
          </Table>
        </Card.Content>
      </Card>
      <RoleEdit id={id} onClose={() => {
        setId(null);
        getList();
      }}/>
    </>
  );
};

export default RoleList;
