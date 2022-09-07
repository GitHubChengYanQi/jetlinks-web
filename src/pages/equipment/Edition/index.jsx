import React, {useState} from 'react';
import {Row, Col, Button, Select, Input} from 'antd';
import LeftTree from '@/pages/monitor/LeftTree';
import Render from '@/components/Render';
import Save from '@/pages/equipment/Edition/Save';
import Restart from '../Equipment/Restart';
import styles from '@/pages/monitor/index.module.less';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {deviceList} from '@/pages/equipment/Equipment/url';

const Edition = () => {

  const [upgradeVisible, setUpgradeVisible] = useState();
  const [restarting, setRestarting] = useState(false);

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {title: '设备状态', dataIndex: '1', align: 'center', render: (text) => <Render text={text}/>},
    {title: '终端备注', dataIndex: '2', align: 'center', render: (text) => <Render text={text}/>},
    {title: '分组名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: 'MAC地址', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {title: '当前版本', dataIndex: '6', align: 'center', render: (text) => <Render text={text}/>},
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
      <FormItem label="升级时间" name="0" component={DatePicker} showTime/>
      <FormItem label="设备状态" name="1" component={Select}/>
      <FormItem label="终端备注" name="2" component={Input}/>
      <FormItem label="登记名称" name="3" component={Input}/>
      <FormItem label="设备MAC" name="4" component={Input}/>
      <FormItem label="设备型号" name="5" component={Input}/>
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
  ;
};
export default Edition;

