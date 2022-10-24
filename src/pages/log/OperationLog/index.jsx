import React, {useRef, useState} from 'react';
import {Input, message} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import {operationLogBatchDelete, operationLogList} from './url';
import FormItem from '../../../components/Table/components/FormItem/index';
import {DangerButton, PrimaryButton} from '@/components/Button';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import DatePicker from '@/components/DatePicker';
import SelectRoles from '@/pages/systemManage/Role/components/SelectRoles';
import {AccountFormat} from '@/pages/systemManage/Account';

const OperationLog = () => {

  const ref = useRef();

  const [keys, setKeys] = useState([]);

  const {loading: deleteLoading, run: deleteRun} = useRequest(operationLogBatchDelete, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
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
    {title: '账号名称', dataIndex: 'account', align: 'center', render: (text) => <Render text={AccountFormat(text)}/>},
    {title: '角色名称', dataIndex: 'roleName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '登录IP地址', dataIndex: 'ipAddress', align: 'center', render: (text) => <Render text={text}/>},
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
          component={SelectRoles}
        />
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
            批量删除
          </DangerButton>
        </Warning>,
        <PrimaryButton key="1" onClick={()=>{
          window.open(`${baseURI}/LogExcel/export?authorization=${token}&operationLogIds=${keys}`);
        }}>导出</PrimaryButton>
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

