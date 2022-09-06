import React, {useState} from 'react';
import {Button, Space, Dropdown, Menu, message, Select, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';


const Category = () => {

  const [saveVisible, setSaveVisible] = useState();

  const delConfirm = (id) => {

  };


  const columns = [
    {title: '设备类别名称', dataIndex: 'name'},
    {title: '所属设备型号种类', dataIndex: '2', align: 'center', render: (text) => <Render text={text}/>},
    {title: '所属设备型号数量', dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别状态', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '创建时间', dataIndex: '5', align: 'center', render: (text) => <Render text={text || '--'}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button ghost type="primary" onClick={() => {
            setSaveVisible(record);
          }}>编辑</Button>
          <Warning content="您确定启用么？">
            <Button ghost type="primary">启用</Button>
          </Warning>
          <Warning onOk={() => delConfirm(record.id)}>
            <Button danger>删除</Button>
          </Warning>
        </Space>
      ),
    },
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
        label: <Warning onOk={() => {

        }}>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="创建时间" name="0" component={DatePicker} showTime/>
      <FormItem label="类别状态" name="1" component={Select}/>
      <FormItem label="设备类别名称" name="2" component={Input}/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Button key={1} onClick={() => setSaveVisible({})}>新建设备类别</Button>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      dataSource={[{id: 1}, {id: 2}]}
      columns={columns}
      rowKey="id"
    />

    <Save
      success={() => {
        message.success('保存成功');
        setSaveVisible(null);
      }}
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
    />
  </>;
};
export default Category;
