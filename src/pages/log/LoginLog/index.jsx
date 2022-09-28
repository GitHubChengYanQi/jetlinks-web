import React, {useRef, useState} from 'react';
import {Input, message} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import {loginLogBatchDelete, loginLogList} from './url';
import FormItem from '@/components/Table/components/FormItem/index';
import {DangerButton, PrimaryButton} from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import {config} from 'ice';
import cookie from 'js-cookie';


const LoginLog = () => {

  const ref = useRef();

  const [keys, setKeys] = useState([]);

  const {loading: deleteLoading, run: deleteRun} = useRequest(loginLogBatchDelete, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.submit();
    },
    onError: () => message.error('删除失败!')
  });

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
        <FormItem label="登录时间" name="time" component={DatePicker} RangePicker/>
        <FormItem label="账号姓名" name="name" component={Input}/>
        <FormItem label="账号名称" name="account" component={Input}/>
      </>
    );
  };

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>
    <Table
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return values;
      }}
      loading={deleteLoading}
      selectedRowKeys={keys}
      onChange={setKeys}
      ref={ref}
      tableKey="loginlog"
      searchButtons={[
        <Warning
          disabled={keys.length === 0}
          key="0"
          onOk={() => deleteRun({data: {logIds: keys}})}
        >
          <DangerButton
            disabled={keys.length === 0}
            danger
          >
            批量删除</DangerButton>
        </Warning>,
        <PrimaryButton key="1" onClick={() => {
          window.open(`${baseURI}/LoginLogExcel/export?authorization=${token}&logIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={loginLogList}
      columns={columns}
      rowKey="loginLogId"
      actionRender={(text, record) => (
        <Warning onOk={() => deleteRun({data: {logIds: [record.loginLogId]}})}><DangerButton>删除</DangerButton></Warning>
      )}
    />
  </>;
};
export default LoginLog;

