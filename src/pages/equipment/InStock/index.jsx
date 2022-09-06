import React, {useState} from 'react';
import {Button, Space, Dropdown, Menu, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/InStock/Save';
import Info from '@/pages/equipment/InStock/Info';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';

const InStock = () => {


  const [saveVisible, setSaveVisible] = useState(false);

  const [infoVisible, setInfoVisible] = useState({});

  const dataSource = Array(5).fill('').map((item, index) => ({
    key: index,
    '0': '0',
    '1': '在线',
    '3': `4012M智能箱${index}`,
    '4': '智能箱产品',
    '5': '智能箱产品',
    '6': 'OPT IMS-4012M',
    '7': 'EC:B9:70:BB:74:34',
    '8': '李子木',
    '9': '2022/08/21 12:00:00'
  }));

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {title: '设备状态', dataIndex: '1', align: 'center', render: (text) => <Render text={text}/>},
    {title: '所属客户', dataIndex: '2', align: 'center', render: (text) => <Render text={text}/>},
    {title: '终端备注', dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备名称', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备型号', dataIndex: '6', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '设备MAC地址', dataIndex: '7', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '入库人员', dataIndex: '8', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '入库时间', dataIndex: '9', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button ghost type="primary" onClick={() => {
            setInfoVisible({id: '1'});
          }}>详情</Button>
          <Warning>
            <Button danger>删除</Button>
          </Warning>
        </Space>
      ),
    },
  ];


  const inStockMenu = <Menu
    items={[
      {
        key: '1',
        label: '单个入库',
        onClick: () => {
          setSaveVisible(true);
        }
      }, {
        key: '2',
        label: '批量入库',
        onClick: () => {

        }
      },
    ]}
  />;

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;


  const searchForm = () => {
    return <>
      <FormItem label="入库时间" name="0" component={DatePicker} showTime/>
      <FormItem label="设备MAC" name="1" component={Input}/>
      <FormItem label="登记名称" name="2" component={Input}/>
      <FormItem label="设备类别" name="3" component={Input}/>
      <FormItem label="设备型号" name="4" component={Input}/>
      <FormItem label="所属客户" name="6" component={Input}/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Dropdown key={1} overlay={inStockMenu} placement="bottom">
          <Button>新增入库</Button>
        </Dropdown>,
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

    <Info id={infoVisible.id} onClose={() => setInfoVisible({})}/>
    <Save visible={saveVisible} close={() => setSaveVisible(false)}/>
  </>;
};
export default InStock;
