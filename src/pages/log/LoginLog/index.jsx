import React from 'react';
import {Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import {loginLogList} from './url';
import FormItem from '@/components/Table/components/FormItem/index';
import {DangerButton, PrimaryButton} from '@/components/Button';
import DatePicker from '@/components/DatePicker';


const LoginLog = () => {

  const columns = [
    {title: '登录时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
    {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: '账号名称', dataIndex: 'account', align: 'center', render: (text) => <Render text={text}/>},
    {title: '登录IP地址', dataIndex: 'ipAddress', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '登录内容',
      dataIndex: 'succeed',
      align: 'center',
      render: (text) => {
        const success = text === '成功';
        return <Render>
          <span className={success ? 'green' : 'red'}>{success ? '登陆成功' : '登陆失败'}</span>
        </Render>;
      }
    },
  ];

  const searchForm = () => {
    return (
      <>
        <FormItem label="登录时间" name="time" component={DatePicker} RangePicker />
        <FormItem label="账号姓名" name="name" component={Input}/>
        <FormItem label="账号名称" name="account" component={Input}/>
      </>
    );
  };

  return <>
    <Table
      tableKey='loginlog'
      searchButtons={[
        <Warning key="0"><DangerButton danger>批量删除</DangerButton></Warning>,
        <PrimaryButton key="1">导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={loginLogList}
      columns={columns}
      rowKey="loginLogId"
      actionRender={(text, record) => (
        <Warning><DangerButton>删除</DangerButton></Warning>
      )}
    />
  </>;
};
export default LoginLog;

