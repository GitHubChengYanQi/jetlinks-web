import React, {useRef, useState} from 'react';
import {Space, Input, message} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import {createFormActions} from '@formily/antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Info from '@/pages/equipment/InStock/Info';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {
  instockBatchDelete,
  instockDownloadTemplate,
  instockImport,
} from '@/pages/equipment/InStock/url';
import {useRequest} from '@/util/Request';
import BatchImport from '@/components/BatchImport';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import {isArray} from '@/util/Tools';
import {deviceBatchDelete, deviceBatchList, deviceStart, deviceStop} from '@/pages/equipment/Batch/url';
import Save from '@/pages/equipment/Batch/Save';

const formActionsPublic = createFormActions();

const Batch = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState(false);
  const [batchImport, setBatchImport] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const [records, setResords] = useState([]);

  const keys = records.map(item => item.instockId);

  const {loading: stopLoading, run: stop} = useRequest(deviceStop, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('关闭成功！');
      ref.current.refresh();
    },
  });

  const {loading: startLoading, run: start} = useRequest(deviceStart, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(deviceBatchDelete, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
  });


  const columns = [
    {title: '批次', dataIndex: 'coding', align: 'center', render: (text) => <Render text={text} />},
    {title: '所属批次设备数量', dataIndex: 'number', align: 'center', render: (text) => <Render>{text}</Render>},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render width={200} text={text} />},
  ];


  const searchForm = () => {
    return <>
      <FormItem label="批次" name="coding" component={Input} />
      <FormItem label="创建时间" name="time" component={DatePicker} RangePicker />
    </>;
  };

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>
    <Table
      formActions={formActionsPublic}
      loading={deleteLoading || stopLoading || startLoading}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1], time: undefined};
        }
        return values;
      }}
      tableKey="batchId"
      checkedRows={records}
      onChangeRows={setResords}
      selectedRowKeys={keys}
      ref={ref}
      searchButtons={[
        <PrimaryButton key={1} onClick={() => setSaveVisible({})}>新增批次</PrimaryButton>,
        <PrimaryButton disabled={keys.length === 0} key={3} onClick={() => {
          window.open(`${baseURI}/DeviceBatchExcel/export?authorization=${token}&batchIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={deviceBatchList}
      columns={columns}
      rowKey="batchId"
      actionRender={(text, record) => {
        const open = record.status === 1;
        return <Space>
          <Warning content={`您确定${open ? '停用' : '启用'}么？`} onOk={() => {
            if (open) {
              stop({data: {batchId: record.batchId}});
            } else {
              start({data: {batchId: record.batchId}});
            }
          }}>
            {open ? <DangerButton>停用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
          <Warning disabled={record.number > 0} onOk={() => deleteRun({data: {batchId: record.batchId}})}>
            <DangerButton disabled={record.number > 0}>删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />

    <Info visible={infoVisible} onClose={() => setInfoVisible()} data={infoVisible} />
    <Save data={saveVisible} visible={saveVisible} close={() => setSaveVisible(false)} success={(success) => {
      setSaveVisible(false);
      if (success) {
        ref.current.submit();
      } else {
        ref.current.refresh();
      }
    }} />
    <BatchImport
      columns={[
        {title: '登记名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
        {title: '设备备注', dataIndex: 'remark', align: 'center', render: (text) => <Render text={text} />},
        {title: '设备分组', dataIndex: 'classifyName', align: 'center', render: (text) => <Render text={text} />},
        {title: '设备类别', dataIndex: 'categoryName', align: 'center', render: (text) => <Render text={text} />},
        {title: '设备型号', dataIndex: 'modelName', align: 'center', render: (text) => <Render text={text} />},
        {title: '设备MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render text={text} />},
        {title: '物料网卡号', dataIndex: 'cardNumber', align: 'center', render: (text) => <Render text={text} />},
      ]}
      api={instockImport}
      templeteApi={instockDownloadTemplate}
      title="入库"
      success={() => {
        setBatchImport(false);
        ref.current.submit();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};
export default Batch;
