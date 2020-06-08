# 列表页面模板

```jsx
import React, {useEffect, useState} from 'react';
import {Grid, Card, Button, Icon, Table} from '@alifd/next';

import {useRequest} from '@/Config/BaseRequest';
import {userList, userRemove} from '@/Config/ApiUrl/system/user';
import DeptTree from '@/components/DeptTree';
import DelButton from '@/components/DelButton';
import Message from '@/components/Message';  

const ${COMPONENT_NAME} = () => {

  const {loading, request} = useRequest(userList);

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
  
  const {loading: removeLoading, request: removeRequest} = useRequest(userRemove);
  const remove = async (userId) => {
    const {error} = await removeRequest({
      data: {userId},
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
        <Button
          className="button-right-margin"
          onClick={()=>{
            getList();
          }}
        ><Icon type="refresh"/></Button>
        <Button
          type='primary'
          onClick={() => {
            setId(0);
          }}
        >添加</Button>
      </>
    );
  }

  const renderOption = (value, index, record) => {
    return (
      <>
        <Button type='primary' className="button-right-margin" onClick={() => {
          setId(record.userId);
        }}>修改</Button>
        <DelButton onSuccess={()=>{
          remove(record.userId);
        }}/>
      </>
    );
  }

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <Card className='main-block' contentHeight='auto' style={{
        // maxWidth: 1400,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <Card.Header title={<h2>部门管理</h2>} extra={<RenderActions/>}/>
        <Card.Content className='topLine'>
          <Grid.Row gutter={20}>
            <Grid.Col fixedSpan={14}>
              <DeptTree/>
            </Grid.Col>
            <Grid.Col>
              <Table
                dataSource={dataSource}
                hasBorder={false}
                loading={loading || removeLoading}
                onSort={(dataIndex, order) => {
                  console.log(dataIndex, order);
                }}>
                <Table.Column title="部门简称" dataIndex="simpleName" width={120}/>
                <Table.Column title="部门全称" dataIndex="fullName" width={120}/>
                <Table.Column title="排序" dataIndex="sort" width={80}/>
                <Table.Column title="备注" dataIndex="description" width={200}/>
                <Table.Column/>
                <Table.Column title="操作" cell={renderOption} align='right'/>
              </Table>
            </Grid.Col>
          </Grid.Row>
        </Card.Content>
      </Card>
      <DeptEdit
        id={id}
        onClose={() => {
          setId(null);
        }}
        onViewError={() => {
          Message.error(error.message);
          setId(null);
        }}
      />
    </>
  );
};

export default ${COMPONENT_NAME};

```