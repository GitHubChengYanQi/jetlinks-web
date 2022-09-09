import React, {useState} from 'react';
import {Row, Col, Button, Space, Tooltip, Select, Input} from 'antd';
import {EditOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import LeftTree from '@/pages/monitor/LeftTree';
import NoteSave from '@/pages/monitor/NoteSave';
import Info from '@/pages/monitor/Info';
import Render from '@/components/Render';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import styles from './index.module.less';


const Monitor = () => {


  const [infoVisible, setInfoVisible] = useState({});
  const [noteVisible, setNoteVisible] = useState({});

  const dataSource = Array(5).fill('').map((item, index) => ({
    key: index,
    '0': '0',
    '1': '在线',
    '2': `4012M智能箱${index}`,
    '3': '智能箱产品',
    '4': '220/4',
    '51': '通/4',
    '52': '通/4',
    '53': '通/4',
    '6': '光连接/4',
    '7': '24',
    '81': '4',
    '82': '4',
    '9': '5',
    '10': '123.4556789',
    '11': '内网：192.168.1.1',
  }));

  const columns = [
    {title: '设备状态', dataIndex: '1', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: <Space>
        终端备注
        <Tooltip placement="top" title="终端设备备注的名称，平台可以修改">
          <QuestionCircleOutlined/>
        </Tooltip>
      </Space>,
      dataIndex: '2',
      align: 'center',
      render: (text) => {
        return <Space>
          <Button type="link" onClick={() => setInfoVisible({id: '1'})}>{text}</Button>
          <EditOutlined onClick={() => setNoteVisible({id: '1', note: text})}/>
        </Space>;
      }
    },
    {
      title: <Space>
        登记名称
        <Tooltip placement="top" title="设备上报的登记名称，平台不可以修改">
          <QuestionCircleOutlined/>
        </Tooltip>
      </Space>, dataIndex: '3', align: 'center', render: (text) => <Render text={text}/>
    },
    {title: '市电检测/V', dataIndex: '4', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '主干网络检测',
      children: [
        {
          title: '网络状态',
          dataIndex: '51',
          align: 'center',
          render: (text) => <Render text={text}/>
        },
        {
          title: '网络速率/Mbps',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={text}/>
        },
        {
          title: '网络丢包率/%',
          dataIndex: '53',
          align: 'center',
          render: (text) => <Render text={text}/>
        },
      ]
    },
    {title: 'Combo口', dataIndex: '6', align: 'center', render: (text) => <Render text={text}/>},
    {title: '接入网口', dataIndex: '7', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '4G网络',
      children: [
        {
          title: '网络状态',
          dataIndex: '81',
          align: 'center',
          render: (text) => <Render text={text}/>
        },
        {
          title: '信号强度',
          dataIndex: '82',
          align: 'center',
          render: (text) => <Render text={text}/>
        },
      ]
    },
    {title: '附属检测', dataIndex: '9', align: 'center', render: (text) => <Render text={text}/>},
    {title: 'GPS定位', dataIndex: '10', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备IP地址', dataIndex: '11', align: 'center', render: (text) => <Render text={text}/>},
  ];

  const [close, setClose] = useState(false);

  const searchForm = () => {
    return <>
      <FormItem label="设备状态" name="0" component={Select} select/>
      <FormItem label="终端备注" name="1" component={Input} select/>
      <FormItem label="设备名称" name="2" component={Input} select/>
      <FormItem label="设备型号" name="3" component={Input} select/>
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 0 : 4}>
        <div className={styles.leftTree}>
          <LeftTree close={() => setClose(true)} onChange={(key) => {

          }}/>
        </div>
      </Col>
      <Col span={close ? 24 : 20}>
        <Table
          searchForm={searchForm}
          searchButtons={[<Button key={0}>导出</Button>]}
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          actionRender={(text, record) => (
            <Button type='link'>孪生数据</Button>
          )}
        />
      </Col>
    </Row>

    <Info id={infoVisible.id} onClose={() => setInfoVisible({})}/>
    <NoteSave close={() => setNoteVisible({})} data={noteVisible}/>
  </>;
};
export default Monitor;
