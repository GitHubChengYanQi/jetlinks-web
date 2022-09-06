import React, {useState} from 'react';
import {Button, Space, Dropdown, Menu, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/Model/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';


const Model = () => {


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
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {title: '设备型号名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: '所属设备类别', dataIndex: 'classifiedName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备数量', dataIndex: '3', align: 'center', render: (text = '0') => <Render text={text}/>},
    {
      title: '设备型号状态',
      dataIndex: 'state',
      align: 'center',
      render: (text = 0) => <Render>{text !== 0 ?
        <Button type="link">启用</Button> :
        <Button type="link" danger>停用</Button>}
      </Render>
    },
    {
      title: '通信协议',
      dataIndex: 'fileId',
      align: 'center',
      render: (text) => <Render>
        <a
          href={text}
          target="_blank"
          rel="noreferrer"
        >
          查看
        </a></Render>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        const stop = record.state === 0;
        return <Space>
          <Button ghost type="primary" onClick={() => {
            setSaveVisible(record);
          }}>编辑</Button>
          <Warning content="您确定启用么？" onOk={() => {
            if (stop) {
              deploy(record);
            } else {
              unDeploy(record);
            }
          }}>
            <Button ghost danger={!stop} type="primary">{!stop ? '停用' : '启用'}</Button>
          </Warning>
          <Warning onOk={() => remove(record.id)}>
            <Button danger>删除</Button>
          </Warning>
        </Space>;
      }
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
      <FormItem label="创建时间" name="0" component={Input}/>
      <FormItem label="设备型号状态" name="1" component={Input}/>
      <FormItem label="设备型号名称" name="2" component={Input}/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Button key={1} onClick={() => setSaveVisible({})}>新建设备型号</Button>,
        <Dropdown key={2} disabled={keys.length === 0} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      onChange={setKeys}
      dataSource={[{id: 1}, {id: 2}]}
      columns={columns}
      rowKey="id"
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {
        setSaveVisible(null);
      }}/>
  </>;
};

export default Model;
