import React, {useRef, useState} from 'react';
import {Row, Col, Input, Select as AntSelect, Modal} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import {createFormActions} from '@formily/antd';
import LeftTree from '@/pages/monitor/LeftTree';
import Render from '@/components/Render';
import Save from '@/pages/equipment/Edition/Save';
import Restart from '../Equipment/Restart';
import styles from '@/pages/monitor/index.module.less';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList} from '@/pages/equipment/Equipment/url';
import {ActionButton, PrimaryButton} from '@/components/Button';
import SelectModle from '@/pages/equipment/OutStock/Save/components/SelectModle';

const formActionsPublic = createFormActions();

const Edition = ({value = {}}) => {

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const [upgradeVisible, setUpgradeVisible] = useState();
  const [restarting, setRestarting] = useState(false);

  const [keys, setKeys] = useState([]);

  const ref = useRef();

  const columns = [
    {
      title: '设备状态', dataIndex: 'status', align: 'center', render: (value) => {
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
    {title: '设备MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '当前版本', dataIndex: 'version', align: 'center', render: (text) => <Render text={text}/>},
    {title: '最新版本', dataIndex: '7', align: 'center', render: (text) => <Render text={text}/>},
    {title: '升级时间', dataIndex: '8', align: 'center', render: (text) => <Render text={text}/>},
  ];

  const [close, setClose] = useState(false);

  const searchForm = () => {
    return <>
      <FormItem label="升级时间" name="0" component={DatePicker} RangePicker/>
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
      <FormItem label="终端备注" name="remarks" component={Input}/>
      <FormItem label="登记名称" name="name" component={Input}/>
      <FormItem label="设备MAC" name="mac" component={Input}/>
      <FormItem label="设备型号" name="modelId" component={SelectModle}/>
      <div style={{display: 'none'}}><FormItem name="classifyId" component={Input}/></div>
    </>;
  };

  return <>
    <Table
      formSubmit={(values) => {
        return {...values, ...value};
      }}
      formActions={formActionsPublic}
      onChange={setKeys}
      selectedRowKeys={keys}
      ref={ref}
      searchButtons={[
        <PrimaryButton key="1" onClick={() => setUpgradeVisible({})}>批量升级</PrimaryButton>,
        <PrimaryButton key="2" onClick={() => {
          window.open(`${baseURI}/deviceExcel/export?authorization=${token}&deviceIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={deviceList}
      columns={columns}
      rowKey="deviceId"
      actionRender={(text, record) => (
        <ActionButton onClick={() => setUpgradeVisible({v: 'V1.1.0'})}>升级</ActionButton>
      )}
    />

    <Save
      success={() => {
        setRestarting(true);
        setUpgradeVisible(null);
      }}
      visible={Boolean(upgradeVisible)}
      close={() => setUpgradeVisible(null)}
      data={upgradeVisible || {}}
    />
    <Restart
      visible={restarting}
      success={() => {
        Modal.success({
          centered: true,
          content: '升级成功!',
          okText: '确定'
        });
        setRestarting(false);
      }}
    />
  </>;
};
export default Edition;

