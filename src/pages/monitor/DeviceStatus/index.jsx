import React, {useRef} from 'react';
import {Button, Select as AntSelect, Tabs} from 'antd';
import {createFormActions} from '@formily/antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import moment from 'moment';
import {isArray} from '@/util/Tools';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import Render from '@/components/Render';
import DatePicker from '@/components/DatePicker';

const formActionsPublic = createFormActions();

const DeviceStatus = (
  {
    value,
  }
) => {

  const ref = useRef();

  return <div style={{padding: 24}}>
    <Table
      ref={ref}
      otherData={
        <Tabs
          activeKey={1}
          items={[{
            key: 1,
            label: '历史数据',
          }]}
        />
      }
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values,  startTime: moment(values.time[0]).format('YYYY/MM/DD 00:00:00'),
            endTime: moment(values.time[1]).format('YYYY/MM/DD 23:59:59'),};
        }
        return {...values, deviceId: value};
      }}
      noTableColumn
      bordered={false}
      searchButtons={<>
        <Button onClick={() => {
          const time = ref.current.formActions.getFieldValue('time') || [];
          const type = ref.current.formActions.getFieldValue('type');
          const {baseURI} = config;
          const token = cookie.get('jetlink-token');
          let exportUrl = `${baseURI}/statusLog/export?authorization=${token}&limit=5000&page=1`;
          if (time.length > 0) {
            exportUrl = `${exportUrl}&startTime=${time[0]}&endTime=${moment(time[1]).format('YYYY/MM/DD 23:59:59')}`;
          }
          if (type) {
            exportUrl = `${exportUrl}&type=${type || ''}`;
          }
          window.open(`${exportUrl}&deviceId=${value}`);
        }}>导出</Button>
      </>}
      searchForm={() => {
        return <>
          <FormItem
            name="type"
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
          <FormItem name="time" component={DatePicker} RangePicker />
        </>;
      }}
      isModal
      formActions={formActionsPublic}
      api={{
        url: '/deviceStatusLog/list',
        method: 'POST'
      }}
      noSort
      noRowSelection
      bodyStyle={{padding: 0}}
      rowKey="logId"
      noAction
      columns={[
        {
          title: '设备状态',
          dataIndex: 'type',
          align: 'center',
          render: (status) => {
            const online = status === 'online';
            return <Render className={online ? 'green' : 'close'}>
              {online ? '在线' : '离线'}
            </Render>;
          }
        }, {
          title: '更新时间',
          dataIndex: 'createTime',
          align: 'center',
        }
      ]}
    />
  </div>;
};

export default DeviceStatus;
