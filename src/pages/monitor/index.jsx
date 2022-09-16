import React, {useState} from 'react';
import {Row, Col, Button, Space, Tooltip, Select, Input, Drawer} from 'antd';
import {EditOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import LeftTree from '@/pages/monitor/LeftTree';
import NoteSave from '@/pages/monitor/NoteSave';
import Info from '@/pages/monitor/Info';
import Render from '@/components/Render';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import styles from './index.module.less';
import GridPowerSupply from '@/pages/monitor/components/GridPowerSupply';
import BackboneNetwork from '@/pages/monitor/components/BackboneNetwork';


const Monitor = () => {


  const [infoVisible, setInfoVisible] = useState({});
  const [noteVisible, setNoteVisible] = useState({});

  const [open, setOpen] = useState('');

  const dataSource = Array(5).fill('').map((item, index) => ({
    key: index,
    '0': '0',
    '1': '在线',
    '2': `4012M智能箱${index}`,
    '3': '智能箱产品',
    '4': '220/4',
    '51': '220',
    '52': '通',
    '53': '1000',
    '54': '0',
    '6': '光连接',
    '7': '24',
    '81': '4',
    '82': '4',
    '9': '5',
    '10': '123.4556789',
    '11': '内网：192.168.1.1',
    '99': '5'
  }));

  const columns = [
    {
      title: '设备状态',
      dataIndex: '1',
      align: 'center',
      render: (text) => <Render text={<span className="green">{text}</span>}/>
    },
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
          <Button className="blue" type="link" onClick={() => setInfoVisible({id: '1'})}>{text}</Button>
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
      title: '电网供电监测',
      children: [
        {
          title: '实时值',
          dataIndex: '51',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('GridPowerSupply')}
            text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('GridPowerSupply')}
            text={<span className="red">{text}</span>}/>
        },
      ]
    },
    {
      title: '太阳能供电监测',
      children: [
        {
          title: '实时值',
          dataIndex: '51',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('GridPowerSupply')}
            text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('GridPowerSupply')}
            text={<span className="red">{text}</span>}/>
        },
      ]
    }, {
      title: '太阳能电池容量',
      children: [
        {
          title: '实时值',
          dataIndex: '51',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('GridPowerSupply')}
            text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('GridPowerSupply')}
            text={<span className="red">{text}</span>}/>
        },
      ]
    },
    {
      title: '主干网络检测',
      children: [
        {
          title: '网络状态',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('BackboneNetwork')}
            text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('BackboneNetwork')}
            text={<span className="red">{text}</span>}/>
        },
        {
          title: '网络速率/Mbps',
          dataIndex: '53',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('BackboneNetwork')}
            text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '51',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('BackboneNetwork')}
            text={<span className="red">{text}</span>}/>
        },
        {
          title: '网络丢包率/%',
          dataIndex: '54',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('BackboneNetwork')}
            text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render
            className={styles.click}
            onClick={() => setOpen('BackboneNetwork')}
            text={<span className="red">{text}</span>}/>
        },
      ]
    },
    {
      title: 'Combo',
      children: [
        {
          title: '实时值',
          dataIndex: '6',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        },
      ]
    }, {
      title: '通道控制',
      children: [
        {
          title: '通道数',
          dataIndex: '6',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        },
      ]
    },
    {
      title: '接入网口',
      children: [
        {
          title: '通道数',
          dataIndex: '51',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        },
      ]
    },
    {
      title: '4G网络',
      children: [
        {
          title: '实时值',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        }, {
          title: '信号强度',
          dataIndex: '82',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
      ]
    }, {
      title: '上行设备供电状态',
      children: [
        {
          title: '实时值',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        },
      ]
    }, {
      title: '上行设备网络状态',
      children: [
        {
          title: '实时值',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        },
      ]
    }, {
      title: '上行设备监测',
      children: [
        {
          title: '网络状态',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        }, {
          title: '供电状态',
          dataIndex: '82',
          align: 'center',
          render: (text) => <Render text={<span className="green">正常</span>}/>
        }, {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        },
      ]
    },
    {
      title: '附属检测',
      align: 'center',
      children: [
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text}</span>}/>
        }]
    },
    {
      title: 'GPS定位',
      dataIndex: '10',
      align: 'center',
      render: (text) => <Render text={<span className="green">{text}</span>}/>
    },
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
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree open={close} close={() => setClose(!close)} onChange={(key) => {

          }}/>
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <Table
          tableKey="monitor"
          searchForm={searchForm}
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          actionRender={(text, record) => (
            <Button type="primary">孪生数据</Button>
          )}
        />
      </Col>
    </Row>

    <Info id={infoVisible.id} onClose={() => setInfoVisible({})}/>
    <NoteSave close={() => setNoteVisible({})} data={noteVisible}/>

    <Drawer
      title='终端备注：4012M智能箱；设备型号：OPT IMS-4012M'
      destroyOnClose
      width="50vw"
      open={open}
      onClose={() => setOpen('')}
    >
      {open === 'GridPowerSupply' && <GridPowerSupply/>}
      {open === 'BackboneNetwork' && <BackboneNetwork/>}
    </Drawer>
  </>;
};
export default Monitor;
