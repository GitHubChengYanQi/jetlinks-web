import React, {useState} from 'react';
import {Button, Card, Grid, Icon, Pagination, Table} from '@alifd/next';
import {useRequest, useTableRequest} from '@/Config/BaseRequest';
import Message from '@/components/Message';
import DelButton from '@/components/DelButton';

const {Row, Col} = Grid;

const List = ({children, Title, ApiConfig, onAdd, onEdit,onLoad, Edit, OtherNode,fieldKey, ListButton, ...other}) => {

  const {listApi, delApi} = ApiConfig;
  const [id, setId] = useState(null);
  const search = {};
  search[fieldKey] = null;

  const {request: removeRequest} = useRequest(delApi, {
    manual: true,
    onError: (error) => Message.error(error.message),
    onSuccess: () => refresh()
  });
  const {run: removeRun} = removeRequest();
  const remove = async (id) => {
    search[fieldKey] = id;
    removeRun({
      data: {...search},
    });
  };

  const {request} = useTableRequest(listApi);
  const {tableProps, paginationProps, refresh} = request();

  const RenderActions = () => {
    return (
      <>
        <Button className="button-right-margin" onClick={() => {
          refresh();
        }}><Icon type="refresh"/></Button>
        <Button className="button-right-margin" onClick={() => {
          setId(0);
        }} type='primary'>添加</Button>
      </>
    );
  };

  const renderOption = (value, index, record) => {
    return (
      <>
        <Button type='primary' className="button-right-margin" onClick={() => {
          console.log(record[fieldKey]);
          setId(record[fieldKey]);
        }}>修改</Button>
        {ListButton && ListButton(value, index, record)}
        <DelButton onSuccess={() => {
          remove(record[fieldKey]);
        }}/>
      </>
    );
  };
  typeof onLoad === 'function' && onLoad({
    refresh
  });

  return (
    <>
      <Card className='main-block' contentHeight='auto' style={{
        // maxWidth: 1400,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <Card.Header title={Title} extra={<RenderActions/>}/>
        <Card.Content className='topLine'>
          <Table
            {...tableProps}
            hasBorder={false}
            onSort={(dataIndex, order) => {
              console.log(dataIndex, order);
            }}
          >
            {
              children
            }
            <Table.Column/>
            <Table.Column title="操作" cell={renderOption} align='right'/>
          </Table>
          <Row className="page">
            <Col/>
            <Col className="page-right">
              <Pagination
                {...paginationProps}
              />
            </Col>
          </Row>
        </Card.Content>
      </Card>
      <Edit
        id={id}
        onClose={() => {
          setId(null);
        }}
        onRefresh={() => {
          refresh();
        }}
      />
      {OtherNode&&<OtherNode/>}
    </>
  );
};
export default List;
