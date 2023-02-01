import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input, Tooltip, message} from 'antd';
import {config, getSearchParams, useHistory} from 'ice';
import {EllipsisOutlined} from '@ant-design/icons';
import cookie from 'js-cookie';
import moment from 'moment';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {PrimaryButton} from '@/components/Button';
import {alarmRecordBatchView, alarmRecordList} from '@/pages/alarm/url';
import {useRequest} from '@/util/Request';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import SelectCustomer from '@/pages/equipment/OutStock/Save/components/SelectCustomer';
import {isArray} from '@/util/Tools';
import SelectGroup from '@/pages/equipment/OutStock/Save/components/SelectGroup';
import SelectModle from '@/pages/equipment/OutStock/Save/components/SelectModle';

export const handelAlarmLog = {url: '/alarmRecord/handelAlarmLog', method: 'POST'};

const Record = () => {

  const history = useHistory();

  const searchParams = getSearchParams();
  console.log(searchParams);
  const ref = useRef();

  const [records, setResords] = useState([]);

  const keys = records.map(item => item.key);

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
          alarmCondition = '';
          break;
        case '7':
          alarmCondition = '=';
          break;
        default:
          break;
      }


      return <div key={index} hidden={!item.protocolValue}>
        <Render className="green" key={index}>
          {item.title} {alarmCondition} {item.ruleValue}
          <span hidden={item.alarmCondition === '7'}>,当前值：{item.protocolValue}</span>
        </Render>
      </div>;
    });
  };


  const {loading: batchViewLoading, run: batchView} = useRequest(alarmRecordBatchView, {
    fetchKey: (request) => {
      return request?.key;
    },
    manual: true,
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

  const getData = (item) => {
    return {
      deviceRecordId: item.deviceRecordId,
      key: item.tag,
      deviceId: item.deviceId,
    };
  };

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定处理么？" onOk={async () => {
          const promise = records.filter(item => item.status !== '1').map(async (item, index) => {
            await batchView({
              key: index,
              data: getData(item)
            });
          });
          await Promise.all(promise);
          message.success('处理成功！');
          setResords([]);
          ref.current.refresh();
        }}>批量已阅</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="报警时间" name="time" component={DatePicker} RangePicker />
      <FormItem label="终端备注" name="remarks" component={Input} />
      <FormItem label="登记名称" name="name" component={Input} />
      <FormItem label="设备分组" name="classifyId" component={SelectGroup} />
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" component={SelectModle} />
      <FormItem label="设备MAC" name="mac" value={searchParams.mac} component={Input} />
      <FormItem label="报警类型" name="ruleConditionJson" component={Input} />
      <FormItem label="所属客户" name="customerId" component={SelectCustomer} />
    </>;
  };


  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>
    <Table
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {
            ...values,
            startTime: moment(values.time[0]).format('YYYY/MM/DD 00:00:00'),
            endTime: moment(values.time[1]).format('YYYY/MM/DD 23:59:59')
          };
        }
        return {
          ...values,
          remarks: values.remarks ? `%${values.remarks}%` : null,
          name: values.name ? `%${values.name}%` : null,
          mac: values.mac ? `%${values.mac}%` : null,
          ruleConditionJson: values.ruleConditionJson ? `%${values.ruleConditionJson}%` : null,
        };
      }}
      ref={ref}
      format={(data) => {
        return data.map((item, index) => ({...item, key: index}));
      }}
      checkedRows={records}
      onChangeRows={setResords}
      selectedRowKeys={keys}
      loading={batchViewLoading}
      tableKey="record"
      searchButtons={[
        <Dropdown disabled={records.length === 0} key={2} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton disabled={records.length === 0} key={3} onClick={() => {
          window.open(`${baseURI}/AlarmRecordExcel/export?authorization=${token}&recordIds=${records.map(item => item.creattTimestamp)}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={alarmRecordList}
      columns={columns}
      rowKey="key"
      actionRender={(text, record) => (
        <Space>
          <Warning
            disabled={record.status === '1'}
            content="您确定处理么？"
            onOk={async () => {
              await batchView({
                data: getData(record)
              });
              message.success('处理成功！');
              ref.current.refresh();
            }}>
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
