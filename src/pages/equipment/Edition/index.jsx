import React, {useState} from 'react';
import {Row, Col, Button, Input, Select as AntSelect} from 'antd';
import LeftTree from '@/pages/monitor/LeftTree';
import Render from '@/components/Render';
import Save from '@/pages/equipment/Edition/Save';
import Restart from '../Equipment/Restart';
import styles from '@/pages/monitor/index.module.less';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList} from '@/pages/equipment/Equipment/url';
import Select from '@/components/Select';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';

const Edition = () => {

  const [upgradeVisible, setUpgradeVisible] = useState();
  const [restarting, setRestarting] = useState(false);

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
    {title: '设备MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '当前版本', dataIndex: 'version', align: 'center', render: (text) => <Render text={text}/>},
    {title: '最新版本', dataIndex: '7', align: 'center', render: (text) => <Render text={text}/>},
    {title: '升级时间', dataIndex: '8', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Button onClick={() => setUpgradeVisible({v: 'V1.1.0'})}>升级</Button>
      ),
    }
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
            options={[{label: '全部', value: 'all'}, {label: '在线', value: '99'}, {label: '离线', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
      <FormItem label="终端备注" name="remarks" component={Input}/>
      <FormItem label="登记名称" name="name" component={Input}/>
      <FormItem label="设备MAC" name="mac" component={Input}/>
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select}/>
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 0 : 4}>
        <div className={styles.leftTree}>
          <LeftTree close={() => setClose(true)} noAction onChange={(key) => {

          }}/>
        </div>
      </Col>
      <Col span={close ? 24 : 20}>
        <Table
          searchButtons={[
            <Button key="1" onClick={() => setUpgradeVisible({})}>批量升级</Button>,
            <Button key="2">导出</Button>
          ]}
          searchForm={searchForm}
          api={deviceList}
          columns={columns}
          rowKey="deviceId"
        />
      </Col>
    </Row>

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
      close={() => setRestarting(false)}
    />
  </>;
};
export default Edition;

