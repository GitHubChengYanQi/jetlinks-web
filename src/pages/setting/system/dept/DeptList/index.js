import React, {useEffect, useState} from 'react';
import {Grid, Card, Button, Icon, Table} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {deptDelete, deptList} from '@/Config/ApiUrl/system/dept';
import DeptTree from '@/components/DeptTree';
import DeptEdit from '@/pages/setting/system/dept/DeptEdit';
import DelButton from '@/components/DelButton';
import Message from '@/components/Message';

console.log(Message)

const DeptList = () => {

  const {loading, request} = useRequest(deptList);

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

  const {loading: removeLoading, request: removeRequest} = useRequest(deptDelete);
  const remove = async (deptId) => {
    const {error} = await removeRequest({
      data: {deptId},
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
        <Button
          className="button-right-margin"
          type='primary'
          onClick={() => {
            setId(record.deptId);
          }}>修改</Button>
        <DelButton
          onSuccess={() => {
            remove(record.deptId);
          }}
        />
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
          getList();
        }}
        onViewError={(error)=>{
          Message.error(error.message);
          setId(null);
        }}
      />
    </>
  );
};
export default DeptList;
