import React, {useState} from 'react';
import { Button, Space, Dropdown, Menu, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/OutStock/Save';
import Info from '@/pages/equipment/OutStock/Info';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {outstockList} from '@/pages/equipment/OutStock/url';

const OutStock = () => {

  const [saveVisible, setSaveVisible] = useState(false);

  const [infoVisible, setInfoVisible] = useState({});

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {title: '设备状态', dataIndex: '1', align: 'center', render: (text) => <Render text={text}/>},
    {title: '绑定状态', dataIndex: '2', align: 'center', render: (text) => <Render text={text}/>},
    {title: '所属客户', dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>},
    {title: '终端备注', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备名称', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别', dataIndex: '6', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备型号', dataIndex: '7', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '设备MAC地址', dataIndex: '8', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '出库人员', dataIndex: '9', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '出库时间', dataIndex: '10', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '质保时间', dataIndex: '11', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button ghost type="primary" onClick={() => {
            setInfoVisible({id: '1'});
          }}>详情</Button>
          <Warning content="您确定解绑么？">
            <Button danger>解绑</Button>
          </Warning>
        </Space>
      ),
    },
  ];

  const outStockMenu = <Menu
    items={[
      {
        key: '1',
        label: '单个出库',
        onClick: () => {
          setSaveVisible(true);
        }
      }, {
        key: '2',
        label: '批量出库',
        onClick: () => {

        }
      },
    ]}
  />;

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定解绑么？">批量解绑</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="出库时间" name="1" component={Input}/>
      <FormItem label="设备MAC" name="2" component={Input}/>
      <FormItem label="设备查询" name="3" component={Input}/>
      <FormItem label="设备类别" name="4" component={Input}/>
      <FormItem label="设备型号" name="5" component={Input}/>
      <FormItem label="所属客户" name="6" component={Input}/>
      <FormItem label="设备状态" name="7" component={Input}/>
      <FormItem label="绑定状态" name="8" component={Input}/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Dropdown key={1} overlay={outStockMenu} placement="bottom">
          <Button>新增出库</Button>
        </Dropdown>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={outstockList}
      columns={columns}
      rowKey="outstockId"
    />

    <Info id={infoVisible.id} onClose={() => setInfoVisible({})}/>
    <Save visible={saveVisible} close={() => setSaveVisible(false)}/>
  </>;
};
export default OutStock;
