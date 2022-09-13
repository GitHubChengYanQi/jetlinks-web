import React from 'react';
import {Button, DatePicker, Select, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import {operationLogList} from './url';
import FormItem from '../../../components/Table/components/FormItem/index';
import {DangerButton, PrimaryButton} from '@/components/Button';

const OperationLog = () => {

  const columns = [
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {title: '账号名称', dataIndex: 'account', align: 'center', render: (text) => <Render text={text}/>},
    {title: '角色名称', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {title: '登录IP地址', dataIndex: 'ip', align: 'center', render: (text) => <Render text={text}/>},
    {title: '操作菜单', dataIndex: 'logType', align: 'center', render: (text = '') => <Render text={text}/>},
    {
      title: '操作内容',
      dataIndex: 'logName',
      align: 'center',
      render: (text = '') => <Render className="green" text={text}/>
    },
  ];


  const searchForm = () => {
    return (
      <>
        <FormItem label="操作时间" select name="time" component={DatePicker} showTime/>
        <FormItem label="账号姓名" name="name" component={Input}/>
        <FormItem label="账号名称" name="name" component={Input}/>
        <FormItem label="角色名称" select name="roleId" component={Select}/>
        <FormItem label="操作菜单" select name="menu" component={Select}/>
      </>
    );
  };

  return <>
    <Table
      tableKey='operationlog'
      searchButtons={[
        <Warning key={1}><DangerButton>批量删除</DangerButton></Warning>,
        <PrimaryButton key={2}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={operationLogList}
      columns={columns}
      rowKey="operationLogId"
      actionRender={(text, record) => (
        <Warning><DangerButton>删除</DangerButton></Warning>
      )}
    />
  </>;
};

export default OperationLog;

