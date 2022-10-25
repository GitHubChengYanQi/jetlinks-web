import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input, Select as AntSelect, Button, message} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import moment from 'moment';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Info from '@/pages/equipment/OutStock/Info';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {
  outStockDownloadTemplate, outStockImport, outstockList, outstockUnbind
} from '@/pages/equipment/OutStock/url';
import DatePicker from '@/components/DatePicker';
import Save from '@/pages/equipment/OutStock/Save';
import BatchImport from '@/components/BatchImport';
import {DangerButton, PrimaryButton} from '@/components/Button';
import {isArray} from '@/util/Tools';
import {useRequest} from '@/util/Request';
import SelectModle from '@/pages/equipment/OutStock/Save/components/SelectModle';
import SelectCustomer from '@/pages/equipment/OutStock/Save/components/SelectCustomer';
import SelectBatch from '@/pages/equipment/Batch/components/SelectBatch';

const OutStock = () => {

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState(false);
  const [batchImport, setBatchImport] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const [records, setRecords] = useState([]);

  const keys = records.map(item => item.outstockId);

  const {loading, run} = useRequest(outstockUnbind, {
    manual: true,
    onSuccess: () => {
      message.success('解绑成功！');
      ref.current.refresh();
    }
  });


  const columns = [{
    title: '设备状态', dataIndex: 'deviceResult', align: 'center', render: (value) => {
      const open = value?.status === 'online';
      return <Render>
        <span className={open ? 'green' : 'close'}>{open ? '在线' : '离线'}</span>
      </Render>;
    }
  }, {
    title: '绑定状态', dataIndex: 'status', align: 'center', render: (value, record) => {
      const bind = record.deviceResult?.deptId;
      return <Render>
        <span className={bind ? 'green' : 'red'}>{bind ? '已绑定' : '未绑定'}</span>
      </Render>;
    }
  }, {
    title: '所属客户',
    dataIndex: 'deviceResult',
    align: 'center',
    render: (text) => <Render text={text?.customerName}/>
  },  {
    title: '登记名称',
    dataIndex: 'deviceResult',
    align: 'center',
    render: (value = {}) => <Render text={value?.name}/>
  }, {
    title: '设备类别',
    dataIndex: 'deviceResult',
    align: 'center',
    render: (value = {}) => <Render text={value?.categoryName}/>
  }, {
    title: '设备型号',
    dataIndex: 'deviceResult',
    align: 'center',
    render: (value = {}) => <Render text={value?.modelName}/>
  }, {
    title: '设备MAC地址',
    dataIndex: 'deviceResult',
    align: 'center',
    render: (value = {}) => <Render text={value?.mac}/>
  }, {
    title: '批次',
    dataIndex: 'batchCoding',
    align: 'center',
    render: (value) => <Render text={value}/>
  }, {
    title: '出库人员',
    dataIndex: 'userName',
    align: 'center',
    render: (text) => <Render width={200} text={text}/>
  }, {
    title: '操作时间',
    dataIndex: 'createTime',
    align: 'center',
    render: (text) => <Render width={200} text={text}/>
  }, {
    title: '出库时间',
    dataIndex: 'outstockTime',
    align: 'center',
    render: (text) => <Render width={200} text={text}/>
  }, {
    title: '质保时间',
    dataIndex: 'closingDate',
    align: 'center',
    render: (text) => <Render
      width={150}
      className={moment(text).diff(moment(new Date())) > 0 ? 'green' : 'red'}
      text={text ? moment(text).format('YYYY/MM/DD') : '-'}
    />
  },];

  const outStockMenu = <Menu
    items={[{
      key: '1', label: '单个出库', onClick: () => {
        setSaveVisible({});
      }
    }, {
      key: '2', label: '批量出库', onClick: () => {
        setBatchImport(true);
      }
    },]}
  />;

  const menu = <Menu
    items={[{
      key: '1',
      label: <Warning
        content="您确定解绑么？"
        onOk={() => run({data: {deviceIds: records.map(item => item.deviceId)}})}>批量解绑</Warning>,
    },]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="出库时间" name="time" component={DatePicker} RangePicker/>
      <FormItem label="设备MAC" name="mac" component={Input}/>
      <FormItem label="设备查询" name="name" component={Input}/>
      <FormItem label="设备型号" name="modelId" component={SelectModle}/>
      <FormItem label="批次" name="batchId" component={SelectBatch}/>
      <FormItem label="所属客户" name="customerId" component={SelectCustomer}/>
      <FormItem
        label="设备状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '在线', value: 'online'}, {label: '离线', value: 'offline'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
    </>;
  };

  return <>
    <Table
      loading={loading}
      onChangeRows={setRecords}
      checkedRows={records}
      selectedRowKeys={keys}
      ref={ref}
      tableKey="outstock"
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return values;
      }}
      searchButtons={[
        <Dropdown key={1} overlay={outStockMenu} placement="bottom">
          <PrimaryButton>新增出库</PrimaryButton>
        </Dropdown>,
        <Dropdown key={2} disabled={keys.length === 0} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>, <PrimaryButton key={3} onClick={() => {
          window.open(`${baseURI}/OutStockExcel/export?authorization=${token}&outStockIds=${keys}`);
        }}>导出</PrimaryButton>]}
      searchForm={searchForm}
      api={outstockList}
      columns={columns}
      rowKey="outstockId"
      actionRender={(text, record) => {
        const bind = record.deviceResult?.deptId;
        return <Space>
          <PrimaryButton onClick={() => {
            setInfoVisible(record);
          }}>详情</PrimaryButton>
          <Warning content={`您确定${bind ? '解绑' : '出库'}么？`} onOk={() => {
            if (bind) {
              run({data: {deviceIds: [record.deviceId]}});
            } else {
              setSaveVisible(record);
            }
          }}>
            {bind ? <DangerButton>解绑</DangerButton> : <Button className="bgGreen">出库</Button>}
          </Warning>
        </Space>;
      }}
    />

    <Info visible={infoVisible} onClose={() => setInfoVisible()} data={infoVisible}/>
    <Save
      visible={saveVisible}
      close={() => setSaveVisible(false)}
      data={saveVisible || {}}
      success={(success) => {
        setSaveVisible();
        if (success) {
          ref.current.submit();
        } else {
          ref.current.refresh();
        }
      }}/>
    <BatchImport
      columns={[{title: '设备MAC', dataIndex: 'mac', align: 'center', render: (text) => <Render text={text}/>},]}
      api={outStockImport}
      templeteApi={outStockDownloadTemplate}
      title="出库"
      success={() => {
        setBatchImport(false);
        ref.current.refresh();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};
export default OutStock;
