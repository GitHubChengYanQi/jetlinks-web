import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, message, Select, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {categoryDelete, categoryList} from '@/pages/equipment/Category/url';
import {request} from '@/util/Request';


const Category = () => {


  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const delConfirm = (categoryId) => {
    request({...categoryDelete, data: {categoryId}}).then((res) => {
      if (res.success) {
        message.success('删除成功!');
        ref.current.submit();
      }
    }).catch(() => message.success('删除失败！'));
  };


  const columns = [
    {title: '设备类别名称', dataIndex: 'name'},
    {title: '所属设备型号种类', dataIndex: 'modelNum', align: 'center', render: (text) => <Render>{text || 0}</Render>},
    {title: '所属设备型号数量', dataIndex: '3', align: 'center', render: (text) => <Render>{text || 0}</Render>},
    {
      title: '设备类别状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => <Render><Button type="link" danger={text === '0'}>{text === '1' ? '启用' : '禁用'}</Button></Render>
    },
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text || '--'}/>},
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
      <FormItem label="创建时间" name="createTime" component={DatePicker} RangePicker/>
      <FormItem
        initialValue={0}
        label="类别状态"
        name="status"
        component={({value, onChange}) => {
          return <Select
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '禁用', value: '0'},]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
        select
      />
      <FormItem label="设备类别名称" name="name" component={Input}/>
    </>;
  };

  return <>
    <Table
      ref={ref}
      searchButtons={[
        <Button key={1} onClick={() => setSaveVisible({})} type='primary' ghost>新建设备类别</Button>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={categoryList}
      columns={columns}
      rowKey="categoryId"
      actionRender={(text, record) => {
        const open = record.status === '1';
        return <Space>
          <Button ghost type="primary" onClick={() => {
            setSaveVisible(record);
          }}>编辑</Button>
          <Warning content={`您确定${open ? '禁用' : '启用'}么？`}>
            <Button ghost danger={open} type="primary">{open ? '禁用' : '启用'}</Button>
          </Warning>
          <Warning onOk={() => delConfirm(record.categoryId)}>
            <Button danger>删除</Button>
          </Warning>
        </Space>;
      }}
    />

    <Save
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
    />
  </>;
};
export default Category;
