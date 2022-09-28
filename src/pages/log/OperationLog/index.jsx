import React, {useRef, useState} from 'react';
import {Select as AntSelect, Input, message} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import {operationLogBatchDelete, operationLogList} from './url';
import FormItem from '../../../components/Table/components/FormItem/index';
import {DangerButton, PrimaryButton} from '@/components/Button';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import DatePicker from '@/components/DatePicker';

const OperationLog = () => {

  const ref = useRef();

  const [keys, setKeys] = useState([]);

  const {loading: deleteLoading, run: deleteRun} = useRequest(operationLogBatchDelete, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.submit();
    },
    onError: () => message.error('删除失败!')
  });

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
        <FormItem label="操作时间" select name="time" component={DatePicker} RangePicker />
        <FormItem label="账号姓名" name="name" component={Input}/>
        <FormItem label="账号名称" name="account" component={Input}/>
        <FormItem
          label="角色名称"
          name="roleName"
          component={Input}
        />
      </>
    );
  };

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
      tableKey="operationlog"
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
        <PrimaryButton key="1">导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={operationLogList}
      columns={columns}
      rowKey="operationLogId"
      actionRender={(text, record) => (
        <Warning onOk={() => deleteRun({data: {logIds: [record.operationLogId]}})}><DangerButton>删除</DangerButton></Warning>
      )}
    />
  </>;
};

export default OperationLog;

