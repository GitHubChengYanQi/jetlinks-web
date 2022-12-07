import React from 'react';
import {Button, Select as AntSelect, Tabs} from 'antd';
import {createFormActions} from '@formily/antd';
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

  return <div style={{padding: 24}}>
    <Table
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
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return {...values, deviceId: value};
      }}
      noTableColumn
      bordered={false}
      searchButtons={<>
        <Button>导出</Button>
      </>}
      searchForm={() => {
        return <>
          <FormItem
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
          <FormItem name="time" component={DatePicker} RangePicker />
        </>;
      }}
      isModal
      formActions={formActionsPublic}
      api={{
        url: '/deviceStatus/list',
        method: 'POST'
      }}
      noSort
      noRowSelection
      bodyStyle={{padding: 0}}
      rowKey="statusId"
      noAction
      columns={[
        {
          title: '设备状态',
          dataIndex: 'status',
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
