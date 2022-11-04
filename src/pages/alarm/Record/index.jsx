import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input, Tooltip} from 'antd';
import {config, getSearchParams, useHistory} from 'ice';
import {EllipsisOutlined} from '@ant-design/icons';
import cookie from 'js-cookie';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {PrimaryButton} from '@/components/Button';
import {alarmRecordBatchView, alarmRecordList} from '@/pages/alarm/url';
import {useRequest} from '@/util/Request';
import {deviceClassifyTree} from '@/pages/equipment/Grouping/url';
import Cascader from '@/components/Cascader';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import Select from '@/components/Select';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import DatePicker from '@/components/DatePicker';
import SelectCustomer from '@/pages/equipment/OutStock/Save/components/SelectCustomer';
import {isArray} from '@/util/Tools';

const Record = () => {

  const history = useHistory();

  const searchParams = getSearchParams();

  const ref = useRef();

  const [keys, setKeys] = useState([]);

  const ruleTypes = (ruleConditionJson, max) => {
    return isArray(ruleConditionJson).map((item, index) => {
      if (max) {
        if (index > 2) {
          return <div key={index} />;
        } else if (index === 2) {
          return <div key={index}>
            <Tooltip color="#fff" title={() => {
              return ruleTypes(ruleConditionJson);
            }}>
              <EllipsisOutlined />
            </Tooltip>
          </div>;
        }
      }
      let alarmCondition = '';
      switch (item.alarmCondition) {
        case '1':
          alarmCondition = '=';
          break;
        case '2':
          alarmCondition = '>=';
          break;
        case '3':
          alarmCondition = '<=';
          break;
        case '4':
          alarmCondition = '>';
          break;
        case '5':
          alarmCondition = '<';
          break;
        case '6':
          alarmCondition = '<>';
          break;
        case '7':
          alarmCondition = '=';
          break;
        default:
          break;
      }

      let ruleValue = '';
      if (alarmCondition === '7') {
        ruleValue = (item.ruleValue === 1 ? '真' : '假');
      } else {
        ruleValue = item.ruleValue;
      }
      return <div key={index} hidden={!item.protocolValue}>
        <Render className="green" key={index}>
          {item.title} {alarmCondition} {ruleValue} ,当前值：{item.protocolValue}
        </Render>
      </div>;
    });
  };
  const {loading: batchViewLoading, run: batchView} = useRequest(alarmRecordBatchView, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      ref.current.refresh();
    }
  });

  const columns = [
    {title: '报警时间', dataIndex: 'alarmTime', align: 'center', render: (text) => <Render width={150} text={text} />},
    {
      title: '终端备注',
      dataIndex: 'remarks',
      align: 'center',
      render: (text, record) => <Render>
        <div className="blue" onClick={() => {
          history.push(`/monitor?deviceId=${record.deviceId}&modelId=${record.modelId}`);
        }}>{text}</div>
      </Render>
    },
    {title: '登记名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
    {title: '设备分组', dataIndex: 'classifyName', align: 'center', render: (text) => <Render text={text} />},
    {title: '设备类别', dataIndex: 'categoryName', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '设备型号',
      dataIndex: 'modelName',
      align: 'center',
      render: (text) => <Render width={150} text={text} />
    },
    {
      title: '报警类型', dataIndex: 'ruleConditionJson', align: 'center',
      render: (text, record) => {
        let ruleConditionJson = [];
        try {
          ruleConditionJson = JSON.parse(record.ruleConditionJson);
        } catch (e) {
          console.log(e);
        }

        return <Render>{ruleTypes(ruleConditionJson, true)}</Render>;
      }
    },
    {title: 'MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '所属客户',
      dataIndex: 'customerName',
      align: 'center',
      render: (text) => <Render width={200} text={text || '-'} />
    },
    {
      title: '位置信息',
      dataIndex: 'area',
      align: 'center',
      render: (text) => <Render width={150} text={text || '-'} />
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
      <FormItem label="报警时间" name="time" component={DatePicker} RangePicker />
      <FormItem label="终端备注" name="remarks" component={Input} />
      <FormItem label="设备名称" name="name" component={Input} />
      <FormItem label="设备分组" name="classifyId" api={deviceClassifyTree} component={Cascader} />
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select} />
      <FormItem label="设备MAC" name="mac" component={Input} />
      <FormItem label="报警类型" name="ruleConditionJson" component={Input} />
      <FormItem label="所属客户" name="customerId" component={SelectCustomer} />
      <div style={{display: 'none'}}>
        <FormItem name="deviceId" value={searchParams.deviceId} component={Input} />
      </div>
    </>;
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
      ref={ref}
      onChange={setKeys}
      selectedRowKeys={keys}
      loading={batchViewLoading}
      tableKey="record"
      searchButtons={[
        <Dropdown disabled={keys.length === 0} key={2} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton disabled={keys.length === 0} key={3} onClick={() => {
          window.open(`${baseURI}/AlarmRecordExcel/export?authorization=${token}&recordIds=${keys}`);
        }}>导出</PrimaryButton>
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
          <PrimaryButton onClick={() => history.push(`/monitor?deviceId=${record.deviceId}&modelId=${record.modelId}`)}>
            实时监控
          </PrimaryButton>
        </Space>
      )}
    />
  </>;
};
export default Record;
