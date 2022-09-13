import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, message, Select, Input, Badge} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {categoryDelete, categoryList} from '@/pages/equipment/Category/url';
import {request} from '@/util/Request';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';


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
    {title: '设备类别名称', dataIndex: 'name', align: 'center',},
    {title: '所属设备型号种类', dataIndex: 'modelNum', align: 'center', render: (text) => <Render>{text || 0}</Render>},
    {
      title: '所属设备型号数量',
      dataIndex: '3',
      align: 'center',
      render: (text) => <Render className="green">{text || 0}</Render>
    },
    {
      title: '设备类别状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => {
        const open = text === '1';
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
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
      tableKey='category'
      ref={ref}
      searchButtons={[
        <PrimaryButton key={1} onClick={() => setSaveVisible({})}>新建设备类别</PrimaryButton>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={categoryList}
      columns={columns}
      rowKey="categoryId"
      actionRender={(text, record) => {
        const open = record.status === '1';
        return <Space>
          <PrimaryButton onClick={() => {
            setSaveVisible(record);
          }}>编辑</PrimaryButton>
          <Warning content={`您确定${open ? '停用' : '启用'}么？`}>
            {open ? <DangerButton>停用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
          <Warning onOk={() => delConfirm(record.categoryId)}>
            <DangerButton>删除</DangerButton>
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
