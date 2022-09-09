import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, Select, Badge} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/Model/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {deviceModelList} from '@/pages/equipment/Model/url';
import DatePicker from '@/components/DatePicker';


const Model = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();
  const [keys, setKeys] = useState([]);

  const remove = (id) => {

  };

  const deploy = (record) => {

  };

  const unDeploy = (record) => {

  };

  const batchOperation = ({ids, type}) => {

  };

  const columns = [
    {title: '设备型号名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '所属设备类别',
      dataIndex: 'categoryResult',
      align: 'center',
      render: (categoryResult = {}) => <Render text={categoryResult.name}/>
    },
    {title: '设备数量', dataIndex: '3', align: 'center', render: (text = '0') => <Render text={text}/>},
    {
      title: '设备型号状态',
      dataIndex: 'status',
      align: 'center',
      render: (text = '0') => {
        const open = text !== '0';
        return <Render>
          <Badge color={open ? 'green' : 'red'} text={open ? '启用' : '禁用'}/>
        </Render>;
      }
    },
    {
      title: '通信协议',
      dataIndex: 'filePath',
      align: 'center',
      render: (text) => <Render>
        <Button type="link" onClick={() => {
          window.location.href = text;
        }}>
          查看
        </Button></Render>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？" onOk={() => batchOperation({ids: keys, type: 'start'})}>批量启用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？" onOk={() => batchOperation({ids: keys, type: 'stop'})}>批量停用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => batchOperation({ids: keys, type: 'delete'})}>批量删除</Warning>,
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
        label="设备型号状态"
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
      <FormItem label="设备型号名称" name="name" component={Input}/>
    </>;
  };

  return <>
    <Table
      ref={ref}
      searchButtons={[
        <Button key={1} onClick={() => setSaveVisible({})} type='primary' ghost>新建设备型号</Button>,
        <Dropdown key={2} disabled={keys.length === 0} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      api={deviceModelList}
      searchForm={searchForm}
      onChange={setKeys}
      columns={columns}
      rowKey="modelId"
      actionRender={(text, record) => {
        const stop = record.status === '0';
        return <Space>
          <Button type="link" onClick={() => {
            setSaveVisible(record);
          }}>编辑</Button>
          <Warning content="您确定启用么？" onOk={() => {
            if (stop) {
              deploy(record);
            } else {
              unDeploy(record);
            }
          }}>
            <Button danger={!stop} type="link">{!stop ? '停用' : '启用'}</Button>
          </Warning>
          <Warning onOk={() => remove(record.id)}>
            <Button danger type='link'>删除</Button>
          </Warning>
        </Space>;
      }}
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}/>
  </>;
};

export default Model;
