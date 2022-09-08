import React, {useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, Select as AntSelect} from 'antd';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Restart from '@/pages/equipment/Equipment/Restart';
import Save from '@/pages/equipment/Equipment/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList} from '@/pages/equipment/Equipment/url';
import Select from '@/components/Select';
import Cascader from '@/components/Cascader';
import {deviceClassifyTree} from '@/pages/equipment/Grouping/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import {categoryFindAll} from '@/pages/equipment/Category/url';

const Equipment = () => {

  const history = useHistory();

  const [saveVisible, setSaveVisible] = useState();

  const [restarting, setRestarting] = useState();

  const changeDeploy = (record) => {

  };

  const unDeploy = (record) => {

  };

  const columns = [
    {
      title: '设备状态', dataIndex: 'status', align: 'center', render: (value) => {
        const open = value === '99';
        return <Render>
          <Button type="link" disabled={!open}>{open ? '在线' : '离线'}</Button>
        </Render>;
      }
    },
    {
      title: '终端备注',
      dataIndex: 'remarks',
      align: 'center',
      render: (text) => {
        return <Render>
          <div onClick={() => history.push('/monitor')}>{text}</div>
        </Render>;
      }
    },
    {
      title: '登记名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>
    },
    {title: '设备分组', dataIndex: 'classifyName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别', dataIndex: 'categoryName', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '设备型号',
      dataIndex: 'modelName',
      align: 'center',
      render: (text) => <Render width={120} text={text}/>
    },
    {
      title: '设备IP地址', dataIndex: '8', align: 'center', render: (text) => {
        return <Render width={120}>
          <Warning content="确定进入远程配置么？">
            <Button type="link">{text}</Button>
          </Warning>
        </Render>;
      }
    },
    {title: '设备MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '位置信息', dataIndex: '10', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '运行时间', dataIndex: '11', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '上线时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render width={150} text={text}/>
    },
    {title: '离线时间', dataIndex: '12', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '质保时间', dataIndex: '12', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        const stateValue = record.state?.value;
        const notActive = stateValue === 'notActive';
        return <Space>
          <Button ghost type="primary" onClick={() => setSaveVisible({id: 11})}>编辑</Button>
          <Warning content={`确定要${notActive ? '重启' : '禁用'}重启设备么？`} onOk={() => setRestarting(record)}>
            <Button ghost danger={!notActive} type="primary">{notActive ? '重启' : '禁用 '}</Button>
          </Warning>
        </Space>;
      }
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="确定要重启设备么?" onOk={() => setRestarting({})}>批量重启</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const actionMenu = <Menu
    items={[
      {
        key: '1',
        label: '单个新增',
        onClick: () => {
          setSaveVisible({});
        }
      },
    ]}
  />;

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
      <FormItem label="终端备注" name="remarks" component={Input}/>
      <FormItem label="设备名称" name="name" component={Input}/>
      <FormItem label="设备分组" name="classifyId" api={deviceClassifyTree} component={Cascader}/>
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select}/>
      <FormItem label="设备MAC" name="mac" component={Input}/>
      <FormItem label="位置信息" name="7" component={Input}/>
      <FormItem label="离线时间" name="8" component={DatePicker} showTime/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Dropdown key={0} overlay={actionMenu} placement="bottom">
          <Button>新增设备</Button>
        </Dropdown>,
        <Button key={1}>移动分组</Button>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={deviceList}
      columns={columns}
      rowKey="deviceId"
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {

      }}
    />
    <Restart
      visible={restarting}
      success={() => {
        if (restarting.id) {
          const stateValue = restarting.state?.value;
          const notActive = stateValue === 'notActive';
          if (notActive) {
            changeDeploy(restarting);
          } else {
            unDeploy(restarting);
          }
        }
        setRestarting(null);
      }}
    />
  </>;
};

export default Equipment;
