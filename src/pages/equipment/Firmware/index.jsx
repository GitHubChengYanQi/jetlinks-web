import React, {useState} from 'react';
import { Button, Space, Dropdown, Menu, Select} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/Firmware/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';

const Firmware = () => {

  const [saveVisible, setSaveVisible] = useState();


  const dataSource = Array(5).fill('').map((item, index) => ({
    key: index,
    '0': '0',
    '1': '智能箱产品',
    '2': 'OPT IMS-4012M',
    '3': `4012M升级固件${index}`,
    '4': 'V2.0.0（22082123）',
    '5': '启用',
    '6': '2022/08/21 12:00:00',
  }));

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {title: '设备类别', dataIndex: '1', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备型号', dataIndex: '2', align: 'center', render: (text) => <Render text={text}/>},
    {title: '固件名称', dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>},
    {title: '固件版本', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '固件状态', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {title: '上传时间', dataIndex: '6', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button ghost type="primary" onClick={() => {
            setSaveVisible({id: '1', name: record['1']});
          }}>编辑</Button>
          <Warning content="您确定启用么？">
            <Button ghost type="primary">启用</Button>
          </Warning>
          <Warning>
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
      searchButtons={[
        <Button key={1} onClick={() => setSaveVisible({})}>新建固件</Button>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      dataSource={dataSource}
      columns={columns}
      rowKey="key"
    />

    <Save visible={Boolean(saveVisible)} close={() => setSaveVisible(null)} data={saveVisible || {}}/>
  </>;
};
export default Firmware;
