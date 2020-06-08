import React, {useEffect, useState} from 'react';
import {Card, Button, Icon, Table,Message} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {positionDel, positionList} from '@/Config/ApiUrl/system/position';
import PositionEdit from '@/pages/setting/system/position/PositionEdit';
import DelButton from "@/components/DelButton";


const PositionList = () => {

  const {loading, request} = useRequest(positionList);

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

  const {loading: removeLoading, request: removeRequest} = useRequest(positionDel);
  const remove = async (positionId) => {
    const {error} = await removeRequest({
      data: {positionId},
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
        <Button className="button-right-margin" onClick={()=>{
          getList();
        }}><Icon type="refresh"/></Button>
        <Button className="button-right-margin" onClick={()=>{
          setId(0);
        }} type='primary'>添加</Button>
      </>
    );
  }

  const renderOption = (value, index, record) => {
    return (
      <>
        <Button type='primary' className="button-right-margin" onClick={()=>{
          setId(record.positionId);
        }} >修改</Button>
        <DelButton onSuccess={()=>{
          remove(record.positionId);
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
        <Card.Header title={<h2>职位管理</h2>} extra={<RenderActions/>}/>
        <Card.Content className='topLine'>
          <Table dataSource={dataSource} hasBorder={false} loading={loading} onSort={(dataIndex, order) => {
            console.log(dataIndex, order);
          }}>
            <Table.Column title="职位名称" dataIndex="name" width={120}/>
            <Table.Column title="职位编码" dataIndex="code" width={120}/>
            <Table.Column title="备注" dataIndex="remark" width={200}/>
            <Table.Column title="创建时间" dataIndex="createTime" width={200}/>
            <Table.Column title="更新时间" dataIndex="updateTime" width={200}/>
            <Table.Column title="状态" dataIndex="status" width={200}/>
            <Table.Column/>
            <Table.Column title="操作" cell={renderOption} align='right'/>
          </Table>
        </Card.Content>
      </Card>
      <PositionEdit id={id} onClose={() => {
        setId(null);
        getList();
      }}/>
    </>
  );
};

export default PositionList;
