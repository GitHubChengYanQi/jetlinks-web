import React from 'react';
import {Button, DatePicker, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import {loginLogList} from './url';
import FormItem from '@/components/Table/components/FormItem/index'


const LoginLog = () => {

  const columns = [
    {title: '登录时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text} />},
    {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
    {title: '账号名称', dataIndex: 'account', align: 'center', render: (text) => <Render text={text} />},
    {title: '登录IP地址', dataIndex: 'ipAddress', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '登录内容',
      dataIndex: 'succeed',
      align: 'center',
      render: (text) => <Render><Button danger={text !== '成功'} type='link'>{text}</Button></Render>
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Warning><Button danger>删除</Button></Warning>
      ),
    }
  ];

  const searchForm = () => {
    return (
      <>
        <FormItem label="登录时间" name="time" component={DatePicker} showTime />
        <FormItem label="账号姓名" name="username" component={Input} />
        <FormItem label="账号名称" name="name" component={Input} />
      </>
    );
  };

  return <>
    <Table
      searchButtons={[
        <Warning key='0'><Button danger>批量删除</Button></Warning>,
        <Button key='1'>导出</Button>
      ]}
      searchForm={searchForm}
      api={loginLogList}
      columns={columns}
      rowKey="loginLogId"
    />
  </>;
};
export default LoginLog;

