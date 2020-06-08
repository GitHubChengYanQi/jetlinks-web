import React, {useEffect, useState} from 'react';
import {Card, Button, Icon, Table, Grid, Pagination, Tag} from '@alifd/next';

import {useRequest} from '@/Config/BaseRequest';
import DelButton from '@/components/DelButton';
import {menuList, menuRemove} from '@/Config/ApiUrl/system/menu';
import OptionTitle from '@/components/OptionTitle';
import Message from '@/components/Message';  
import MenuEdit from '@/pages/setting/system/menu/MenuEdit';

const {Row, Col} = Grid;

const defaultSearch = {
  search: {},
  pages: {
    page: 1,
  }
};

const MenuList = () => {

  const [searchData, setSearchData] = useState({...defaultSearch});
  const [pages, setPages] = useState({...defaultSearch.pages});

  const {loading, request} = useRequest(menuList);

  const [dataSource, setDataSource] = useState([]);
  const [id, setId] = useState(null);

  const getList = async () => {
    const {error, response} = await request({
      params: searchData.pages,
      data: searchData.search,
    });
    if (error) {
      setDataSource([]);
    } else {
      setDataSource(response.data);
      setPages({...pages, total: response.count, pageSize: response.pageSize});
    }
  }
  const {loading: removeLoading, request: removeRequest} = useRequest(menuRemove);
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
          setId(record.menuId);
        }}>修改</Button>
        <DelButton onSuccess={() => {
          remove(record.menuId);
        }}/>
      </>
    );
  }

  useEffect(() => {
    getList();
  }, [searchData]);

  return (
    <>
      <Card className='main-block' contentHeight='auto' style={{
        // maxWidth: 1400,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <Card.Header title={<h2>权限列表</h2>} extra={<RenderActions/>}/>
        <Card.Content className='topLine'>
          <Table
            dataSource={dataSource}
            hasBorder={false}
            loading={loading || removeLoading}
            onSort={(dataIndex, order) => {
              console.log(dataIndex, order);
            }}>
            <Table.Column title="名称" dataIndex="name" width={200}/>
            <Table.Column title="编码" dataIndex="code" width={200}/>
            <Table.Column title="状态" dataIndex="statusName" width={200}/>
            <Table.Column title="请求地址" dataIndex="url" width={300}/>
            <Table.Column/>
            <Table.Column title={OptionTitle} cell={renderOption} align='right' width={280}/>
          </Table>
        </Card.Content>
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
      </Card>
      <MenuEdit
        id={id}
        onClose={() => {
          setId(null);
          getList();
        }}
        onViewError={(error) => {
          Message.error(error.message);
          setId(null);
        }}
      />
    </>
  );
};

export default MenuList;
