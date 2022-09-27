import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input} from 'antd';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {PrimaryButton} from '@/components/Button';
import {alarmRecordBatchView, alarmRecordList} from '@/pages/alarm/url';
import {useRequest} from '@/util/Request';

const Record = () => {

  const history = useHistory();

  const ref = useRef();

  const [keys, setKeys] = useState([]);

  const {loading: batchViewLoading, run: batchView} = useRequest(alarmRecordBatchView, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      ref.current.submit();
    }
  });

  const columns = [
    {title: '报警时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render width={150} text={text} />},
    {
      title: '终端备注',
      dataIndex: 'deviceResult',
      align: 'center',
      render: (text) => <Render>
        <div className="blue" onClick={() => {
          history.push('/monitor');
        }}>{text?.remarks}</div>
      </Render>
    },
    {title: '登记名称', dataIndex: 'deviceResult', align: 'center', render: (text) => <Render text={text?.name} />},
    {title: '设备分组', dataIndex: 'deviceResult', align: 'center', render: (text) => <Render text={text?.classifyName} />},
    {title: '设备类别', dataIndex: 'deviceResult', align: 'center', render: (text) => <Render text={text?.categoryName} />},
    {
      title: '设备型号',
      dataIndex: 'deviceResult',
      align: 'center',
      render: (text) => <Render width={150} text={text?.modelName} />
    },
    {title: '报警类型', dataIndex: '7', align: 'center', render: (text) => <Render className="green" text={text || '-'} />},
    {title: 'MAC地址', dataIndex: 'deviceResult', align: 'center', render: (text) => <Render text={text?.mac} />},
    {
      title: '所属客户',
      dataIndex: 'deviceResult',
      align: 'center',
      render: (text) => <Render width={200} text={text?.customerName || '-'} />
    },
    {
      title: '位置信息',
      dataIndex: 'deviceResult',
      align: 'center',
      render: (text) => <Render width={150} text={text?.area || '-'} />
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定处理么？" onOk={() => batchView({data: {recordIds: keys}})}>批量已阅</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="报警时间" name="1" component={Input} />
      <FormItem label="终端备注" name="2" component={Input} />
      <FormItem label="登记名称" name="3" component={Input} />
      <FormItem label="设备分组" name="4" component={Input} />
      <FormItem label="设备类别" name="5" component={Input} />
      <FormItem label="设备型号" name="6" component={Input} />
      <FormItem label="报警类型" name="7" component={Input} />
      <FormItem label="所属客户" name="8" component={Input} />
      <FormItem label="设备MAC" name="9" component={Input} />
    </>;
  };

  return <>
    <Table
      ref={ref}
      onChange={setKeys}
      selectedRowKeys={keys}
      loading={batchViewLoading}
      tableKey="record"
      searchButtons={[
        <Dropdown disabled={keys.length === 0} key={2} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={alarmRecordList}
      columns={columns}
      rowKey="recordId"
      actionRender={(text, record) => (
        <Space>
          <Warning
            disabled={record.status === '1'}
            content="您确定处理么？"
            onOk={() => batchView({data: {recordIds: [record.recordId]}})}>
            <PrimaryButton disabled={record.status === '1'} type="link">已阅</PrimaryButton>
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
