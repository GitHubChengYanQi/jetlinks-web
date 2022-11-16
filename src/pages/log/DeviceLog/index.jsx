import React, {useRef} from 'react';
import {Input} from 'antd';
import Render from '@/components/Render';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem/index';
import {deviceLogList} from '@/pages/log/DeviceLog/url';
import Note from '@/components/Note';


const DeviceLog = () => {

  const ref = useRef();

  const columns = [
    {title: '设备MAC', dataIndex: 'mac', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '上报协议',
      dataIndex: 'protocol',
      align: 'center',
      render: (text) => <Note style={{margin: 'auto'}} value={text} copyable={text} width={300} />
    },
    {
      title: '响应协议',
      dataIndex: 'responseProtocol',
      align: 'center',
      render: (text) => <Note style={{margin: 'auto'}} value={text || '-'} copyable={text} width={300} />
    },
    {title: '上报时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text} />},
  ];

  const searchForm = () => {
    return (
      <>
        <FormItem label="设备MAC查询" name="mac" component={Input} />
      </>
    );
  };

  return <>
    <Table
      noAction
      noRowSelection
      ref={ref}
      searchForm={searchForm}
      api={deviceLogList}
      columns={columns}
      rowKey="recordId"
    />
  </>;
};
export default DeviceLog;

