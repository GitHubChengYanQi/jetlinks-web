import React, {useState} from 'react';
import {Button, Space, Menu, Dropdown, Input, Select} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import DatePicker from '@/components/DatePicker';
import FormItem from '../../../components/Table/components/FormItem/index';
import {roleList} from '@/Config/ApiUrl/system/role';

const Role = () => {

  const [saveVisible, setSaveVisible] = useState();


  const handleDelete = (item) => {

  };

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50} />
    },
    {title: '角色名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
    {title: '菜单权限', dataIndex: '2', align: 'center', render: (text) => <Render width={200} text={text} />},
    {title: '分组权限', dataIndex: '3', align: 'center', render: (text) => <Render text={text} />},
    {title: '角色状态', dataIndex: '4', align: 'center', render: (text) => <Render width={200} text={text} />},
    {title: '应用账号数', dataIndex: '5', align: 'center', render: (text) => <Render text={text} />},
    {title: '创建时间', dataIndex: '6', align: 'center', render: (text) => <Render width={150} text={text} />},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button type="primary" ghost onClick={() => setSaveVisible(record)}>编辑</Button>
          <Warning content="您确定启用么?">
            <Button type="primary" ghost>启用</Button>
          </Warning>
          <Warning onOk={() => handleDelete(record)}>
            <Button danger>删除</Button>
          </Warning>
        </Space>
      ),
    }
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？">批量启用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？">批量停用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '3',
        label: <Warning>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return (
      <>
        <FormItem label="创建时间" select name="time" component={DatePicker} showTime />
        <FormItem label="角色状态" name="status" component={Select} />
        <FormItem label="角色名称" name="name" component={Input} />
      </>
    );
  };

  return <>

    <Table
      searchForm={searchForm}
      searchButtons={[
        <Button key="0" onClick={() => setSaveVisible({})}>新建角色</Button>,
        <Dropdown key="1" overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key="2">导出</Button>
      ]}
      api={roleList}
      columns={columns}
      rowKey="roleId"
    />

    <Save
      success={() => {
        setSaveVisible(null);
      }}
      close={() => setSaveVisible(null)}
      visible={saveVisible}
      data={saveVisible}
    />
  </>;
};

export default Role;

