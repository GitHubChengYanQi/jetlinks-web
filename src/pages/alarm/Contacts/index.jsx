import React from 'react';
import {Button, Space, Dropdown, Menu, Input} from 'antd';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';

const Contacts = () => {

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
    {title: '姓名', dataIndex: '1', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '职务',
      dataIndex: '2',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {title: '负责区域', dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>},
    {title: '剩余免费短信条数', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '是否短信通知', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {title: '手机号码', dataIndex: '6', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '电子邮箱', dataIndex: '7', align: 'center', render: (text) => <Render text={text}/>},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: '单独新增',
        onClick: () => {

        }
      },
      {
        key: '3',
        label: '批量新增',
        onClick: () => {

        }
      },
    ]}
  />;

  const actionMenu = <Menu
    items={[
      {
        key: '1',
        label: '批量删除',
        danger: true,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="姓名" name="1" component={Input}/>
      <FormItem label="职务" name="2" component={Input}/>
      <FormItem label="负责区域" name="3" component={Input}/>
      <FormItem label="通知状态" name="4" component={Input}/>
      <FormItem label="手机号码" name="5" component={Input}/>
      <FormItem label="创建时间" name="6" component={Input}/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Dropdown key={1} overlay={menu} placement="bottom">
          <Button>新增联系人</Button>
        </Dropdown>,
        <Dropdown key={2} overlay={actionMenu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      dataSource={dataSource}
      columns={columns}
      rowKey="key"
      actionRender={(text, record) => (
        <Space>
          <Button type="link">编辑</Button>
          <Warning>
            <Button type="link" danger>删除</Button>
          </Warning>
        </Space>
      )}
    />
  </>;
};
export default Contacts;
