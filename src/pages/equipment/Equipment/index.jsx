import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, Select as AntSelect, message, Modal} from 'antd';
import {useHistory} from 'ice';
import moment from 'moment';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Restart from '@/pages/equipment/Equipment/Restart';
import Save from '@/pages/equipment/Equipment/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList, deviceStart, deviceStop} from '@/pages/equipment/Equipment/url';
import Select from '@/components/Select';
import Cascader from '@/components/Cascader';
import {deviceClassifyTree} from '@/pages/equipment/Grouping/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import DynamicForms from '@/pages/equipment/Equipment/DynamicForms';

const Equipment = () => {

  const ref = useRef();

  const history = useHistory();

  const [saveVisible, setSaveVisible] = useState();

  const [restarting, setRestarting] = useState();

  const [keys, setKeys] = useState([]);

  const [formVisible, setFormVisible] = useState();

  const {loading: startLoading, run: start} = useRequest(deviceStart, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('启用成功！');
      ref.current.submit();
    },
    onError: () => message.error('启用失败!')
  });

  const columns = [
    {
      title: '设备状态',
      dataIndex: 'status',
      align: 'center',
      render: (value) => {
        const open = value === 'online';
        return <Render>
          <span className={open ? 'green' : 'close'}>{open ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {
      title: '终端备注',
      dataIndex: 'remarks',
      align: 'center',
      render: (text, record) => {
        return <Render>
          <a className="blue" onClick={() => history.push({
            pathname: '/monitor',
            search: `deviceId=${record.deviceId}&modelId=${record.modelId}&classifyId=${record.classifyId}`,
          })}>{text}</a>
        </Render>;
      }
    },
    {
      title: '登记名称',
      dataIndex: 'name',
      align: 'center',
      render: (text) => <Render text={text} />
    },
    {
      title: '设备分组',
      dataIndex: 'classifyName',
      align: 'center',
      render: (text) => <Render text={text} />
    },
    {
      title: '设备类别',
      dataIndex: 'categoryName',
      align: 'center',
      render: (text) => <Render text={text} />
    },
    {
      title: '设备型号',
      dataIndex: 'modelName',
      align: 'center',
      render: (text) => <Render width={120} text={text} />
    },
    {
      title: '设备IP地址',
      dataIndex: 'ip',
      align: 'center',
      render: (text) => {
        return <Render width={120}>
          <Warning content="确定进入远程配置么？">
            <Button className="blue" type="link">{text}</Button>
          </Warning>
        </Render>;
      }
    },
    {
      title: '设备MAC地址',
      dataIndex: 'mac',
      align: 'center',
      render: (text) => <Render width={120} text={text} />
    },
    {
      title: '位置信息',
      dataIndex: '10',
      align: 'center',
      render: (text) => <Render width={200} text={text} />
    }, {
      title: '经纬度信息',
      dataIndex: '10',
      align: 'center',
      render: (text, record) => <Render width={200}>
        经度：{record.longitude || '-'}，维度：{record.latitude || '-'}
      </Render>
    },
    {
      title: '运行时间',
      dataIndex: 'logTime',
      align: 'center',
      render: (value, record) => {
        const open = record.status === 'online';
        if (!open) {
          return <Render width={150} text="-" />;
        }
        const oldsecond = moment(new Date()).diff(value, 'second');
        const day = Math.floor(oldsecond / 86400) || 0;
        const hours = Math.floor((oldsecond % 86400) / 3600) || 0;
        const minutes = Math.floor(((oldsecond % 86400) % 3600) / 60) || 0;
        const newsecond = Math.floor(((oldsecond % 86400) % 3600) % 60) || 0;
        return <Render width={150}>
          {day}天{hours}时{minutes}分{newsecond}秒
        </Render>;
      }
    },
    {
      title: '上线时间',
      dataIndex: 'logTime',
      align: 'center',
      render: (value, record) => {
        const open = record.status === 'online';
        return <Render width={150} text={open ? value : '-'} />;
      }
    },
    {
      title: '离线时间',
      dataIndex: 'logTime',
      align: 'center',
      render: (value, record) => {
        const open = record.status === 'online';
        return <Render width={150} text={!open ? value : '-'} />;
      }
    },
    {
      title: '质保时间',
      dataIndex: '12',
      align: 'center',
      render: (text) => <Render width={150} text={text} />
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="确定要重启设备么?" onOk={() => {
          start({data: {deviceIds: keys}});
        }}>批量重启</Warning>,
      },
    ]}
  />;

  const formatKey = (object) => {
    if (typeof object !== 'object') {
      return object;
    }
    Object.keys(object).forEach(key => {
      const value = object[key];
      for (let i = 0; i < key.length; i++) {
        if (key[i] === key[i].toUpperCase() && key[i] !== key[i].toLowerCase()) {
          key = key.replace(key[i], `-${key[i].toLowerCase()}`);
        }
      }
      object[key] = formatKey(value);
    });
    return object;
  };

  const actions = (items = []) => {
    return <Menu
      items={items.map((item, index) => {
        const data = item.data || {};
        switch (item.type) {
          case 'confirm':
            return {
              key: index,
              label: <Warning content={`确定要${item.title}设备么?`} onOk={() => {

              }}>{item.title}</Warning>,
            };
          case 'form':
            return {
              key: index,
              label: item.title,
              onClick: () => setFormVisible({...item, data: Object.keys(data).map(key => formatKey(data[key]))}),
            };
          default:
            return <></>;
        }
      })}
    />;
  };

  const searchForm = () => {
    return <>
      <FormItem
        label="设备状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '在线', value: '99'}, {label: '离线', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
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
      <FormItem label="位置信息" name="7" component={Input} />
      <FormItem label="离线时间" name="time" component={DatePicker} RangePicker />
    </>;
  };


  return <>
    <Table
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return values;
      }}
      onChange={setKeys}
      selectedRowKeys={keys}
      tableKey="device"
      loading={startLoading}
      ref={ref}
      searchButtons={[
        <Button type="primary" key={1}>移动分组</Button>,
        <Dropdown disabled={keys.length === 0} key={2} overlay={menu} placement="bottom">
          <Button type="primary">批量操作</Button>
        </Dropdown>,
        <Button type="primary" key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={deviceList}
      columns={columns}
      rowKey="deviceId"
      actionRender={(text, record) => {
        return <Space>
          <Button
            type="primary"
            onClick={() => setSaveVisible({...record, position: [record.longitude, record.latitude]})}
          >
            编辑
          </Button>
          <Dropdown
            disabled={isArray(record.options).length === 0}
            overlay={actions(record.options || [])}
            placement="bottom"
          >
            <Button type="primary">更多</Button>
          </Dropdown>
        </Space>;
      }}
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}
    />
    <Restart
      visible={restarting}
      success={() => {
        setRestarting(null);
      }}
    />

    <DynamicForms
      open={formVisible}
      formData={formVisible}
      close={() => setFormVisible()}
    />
  </>;
};

export default Equipment;
