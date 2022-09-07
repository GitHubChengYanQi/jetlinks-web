import React, {useState} from 'react';
import {Button, Space, Menu, Dropdown, Select, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import AccountAsk from '@/pages/Login/AccountAsk';
import {customerList} from '@/pages/systemManage/Tenant/url';


const Tenant = () => {


  const [askAccount, setAskAccount] = useState();

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {
      title: '审核结果',
      dataIndex: 'status',
      align: 'center',
      render: (text) => <Render>
        <Button danger={text !== 1} type="link">{text === 1 ? '通过' : '待审核'}</Button></Render>
    },
    {title: '企业名称', dataIndex: 'name', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '统一社会信用代码', dataIndex: 'code', align: 'center', render: (text) => <Render text={text}/>},
    {title: '企业经营场所', dataIndex: 'place', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '联系人姓名', dataIndex: 'contactName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '联系人手机号码', dataIndex: 'contactPhone', align: 'center', render: (text) => <Render text={text}/>},
    {title: '管理员账号', dataIndex: 'adminId', align: 'center', render: (text) => <Render text={text}/>},
    {title: '身份证号 ', dataIndex: 'idNumber', align: 'center', render: (text) => <Render text={text}/>},
    {title: '营业执照 ', dataIndex: '9', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '提交时间 ',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render width={150} text={text}/>
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Warning content="您确定通过么?">
            <Button type="primary" ghost>通过</Button>
          </Warning>
          <Button type="primary" ghost onClick={() => setAskAccount(record)}>修改</Button>
          <Button type="primary" ghost>数据转发</Button>
          <Warning>
            <Button danger>删除</Button>
          </Warning>
        </Space>
      ),
    }
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定通过么？">批量通过</Warning>,
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
      <FormItem label="审核结果" name="jg" component={Select} select/>
      <FormItem label="提交时间" name="tj" component={DatePicker} select/>
      <FormItem label="企业查询" name="qy" component={Input} select/>
      <FormItem label="联系人查询" name="lxr" component={Input} select/>
    </>;
  };

  return <>
    <Table
      api={customerList}
      searchButtons={[
        <Dropdown key={1} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={2}>导出</Button>
      ]}
      searchForm={searchForm}
      columns={columns}
      rowKey="customerId"
    />

    <AccountAsk
      visibilityToggle={false}
      visible={askAccount}
      onClose={() => setAskAccount(null)}
      data={askAccount || {}}
    />
  </>;
};

export default Tenant;


