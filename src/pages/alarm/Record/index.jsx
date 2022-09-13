import React from 'react';
import {Button, Space, Dropdown, Menu, Input} from 'antd';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {PrimaryButton} from '@/components/Button';

const Record = props => {

  const history = useHistory();

  const dataSource = Array(5).fill('').map((item, index) => ({
    key: index,
    '0': '0',
    '1': '2022/08/19 12:00:00',
    '2': `4012M智能箱${index}`,
    '3': '智能箱产品',
    '4': '浑南区、和平区',
    '5': '浑南区、和平区',
    '6': 'OPT IMS-4012M',
    '7': '市电断电',
    '8': 'EC:B9:70:BB:74:34',
    '9': '辽宁奥普泰通信股份有限公司',
    '10': '沈阳市浑南区文溯街',
  }));

  const columns = [
    {title: '报警时间', dataIndex: '1', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '终端备注',
      dataIndex: '2',
      align: 'center',
      render: (text) => <Render>
        <div onClick={() => {
          history.push('/monitor');
        }}>{text}</div>
      </Render>
    },
    {title: '登记名称', dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备分组', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备型号', dataIndex: '6', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '报警类型', dataIndex: '7', align: 'center', render: (text) => <Render text={text}/>},
    {title: 'MAC地址', dataIndex: '8', align: 'center', render: (text) => <Render text={text}/>},
    {title: '所属客户', dataIndex: '9', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '位置信息', dataIndex: '10', align: 'center', render: (text) => <Render width={150} text={text}/>},
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定处理么？">批量已阅</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="报警时间" name="1" component={Input}/>
      <FormItem label="终端备注" name="2" component={Input}/>
      <FormItem label="登记名称" name="3" component={Input}/>
      <FormItem label="设备分组" name="4" component={Input}/>
      <FormItem label="设备类别" name="5" component={Input}/>
      <FormItem label="设备型号" name="6" component={Input}/>
      <FormItem label="报警类型" name="7" component={Input}/>
      <FormItem label="所属客户" name="8" component={Input}/>
      <FormItem label="设备MAC" name="9" component={Input}/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Dropdown key={2} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      dataSource={dataSource}
      columns={columns}
      rowKey="key"
      actionRender={(text, record) => (
        <Space>
          <Warning content="您确定处理么？">
            <PrimaryButton type="link">已阅</PrimaryButton>
          </Warning>
          <PrimaryButton onClick={() => history.push('/monitor')}>
            实时监控
          </PrimaryButton>
        </Space>
      )}
    />
  </>;
};
export default Record;
