import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Select} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/Firmware/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList} from '@/pages/equipment/Equipment/url';

const Firmware = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {title: '设备类别', dataIndex: 'categoryName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备型号', dataIndex: 'modelName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '固件名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: '固件版本', dataIndex: 'version', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '固件状态', dataIndex: 'status', align: 'center',
      render: (text = '0') => {
        const open = text !== '0';
        return <Render><Button type="link" danger={!open}>{open ? '启用' : '禁用'}</Button></Render>;
      }
    },
    {title: '上传时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        const stop = record.status === '0';
        return <Space>
          <Button ghost type="primary" onClick={() => {
            setSaveVisible(record);
          }}>编辑</Button>
          <Warning content="您确定启用么？" onOk={() => {
            if (stop) {

            } else {

            }
          }}>
            <Button ghost danger={!stop} type="primary">{!stop ? '停用' : '启用'}</Button>
          </Warning>
          <Warning>
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
    return <>
      <FormItem label="上传时间" name="time" component={DatePicker} showTime/>
      <FormItem label="上传时间" name="time" component={DatePicker} showTime/>
      <FormItem label="上传时间" name="time" component={DatePicker} showTime/>
      <FormItem label="固件状态" name="1" component={Select}/>
      <FormItem label="设备类别" name="2" component={Select}/>
      <FormItem label="设备型号" name="3" component={Select}/>
    </>;
  };

  return <>
    <Table
      ref={ref}
      searchButtons={[
        <Button key={1} onClick={() => setSaveVisible({})}>新建固件</Button>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={deviceList}
      columns={columns}
      rowKey="deviceId"
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}
    />
  </>;
};
export default Firmware;
