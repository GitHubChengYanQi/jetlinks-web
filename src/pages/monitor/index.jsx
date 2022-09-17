import React, {useRef, useState} from 'react';
import {Row, Col, Button, Space, Tooltip, Input, Drawer, Select as AntSelect} from 'antd';
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
import {deviceList} from '@/pages/equipment/Equipment/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';
import Network4G from '@/pages/monitor/components/4gNetwork';
import DatePicker from '@/components/DatePicker';


const Monitor = () => {

  const ref = useRef();

  const [infoVisible, setInfoVisible] = useState({});
  const [noteVisible, setNoteVisible] = useState({});

  const [open, setOpen] = useState({});

  const columns = [
    {
      title: '设备状态',
      dataIndex: 'status',
      align: 'center',
      render: (value) => {
        const online = value === 'online';
        return <Render>
          <span className={online ? 'green' : 'close'}>{online ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {
      title: <Space>
        终端备注
        <Tooltip placement="top" title="终端设备备注的名称，平台可以修改">
          <QuestionCircleOutlined/>
        </Tooltip>
      </Space>,
      dataIndex: 'remarks',
      align: 'center',
      render: (text, record) => {
        return <Space>
          <Button
            className="blue"
            type="link"
            onClick={() => setInfoVisible(record)}>{text}</Button>
          <EditOutlined onClick={() => setNoteVisible({deviceId: record.deviceId, remarks: text})}/>
        </Space>;
      }
    },
    {
      title: <Space>
        登记名称
        <Tooltip placement="top" title="设备上报的登记名称，平台不可以修改">
          <QuestionCircleOutlined/>
        </Tooltip>
      </Space>, dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>
    },
    {title: '市电检测/V', dataIndex: '4', align: 'center', render: (text) => <Render text={text || '-'}/>},
    {
      title: '电网供电监测',
      children: [
        {
          title: '实时值',
          dataIndex: '51',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'GridPowerSupply'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'GridPowerSupply'})}
            text={<span className="green">{text || '-'}</span>}/>
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
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'GridPowerSupply'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'GridPowerSupply'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
      ]
    }, {
      title: '太阳能电池容量',
      children: [
        {
          title: '实时值',
          dataIndex: '51',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'GridPowerSupply'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'GridPowerSupply'})}
            text={<span className="green">{text || '-'}</span>}/>
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
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'BackboneNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'BackboneNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '网络速率/Mbps',
          dataIndex: '53',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'BackboneNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '51',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'BackboneNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '网络丢包率/%',
          dataIndex: '54',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'BackboneNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: 'BackboneNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
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
          render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
        },
      ]
    }, {
      title: '通道控制',
      children: [
        {
          title: '通道数',
          dataIndex: '6',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
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
          render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
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
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: '4gNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: '4gNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        }, {
          title: '信号强度',
          dataIndex: '82',
          align: 'center',
          render: (text, record) => <Render
            className={styles.click}
            onClick={() => setOpen({...record, type: '4gNetwork'})}
            text={<span className="green">{text || '-'}</span>}/>
        },
      ]
    }, {
      title: '上行设备供电状态',
      children: [
        {
          title: '实时值',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
        },
      ]
    }, {
      title: '上行设备网络状态',
      children: [
        {
          title: '实时值',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
        },
      ]
    }, {
      title: '上行设备监测',
      children: [
        {
          title: '网络状态',
          dataIndex: '52',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
        },
        {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
        }, {
          title: '供电状态',
          dataIndex: '82',
          align: 'center',
          render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
        }, {
          title: '报警数',
          dataIndex: '99',
          align: 'center',
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
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
          render: (text) => <Render text={<span className="red">{text || '-'}</span>}/>
        }]
    },
    {
      title: 'GPS定位',
      dataIndex: '10',
      align: 'center',
      render: (text) => <Render text={<span className="green">{text || '-'}</span>}/>
    },
    {title: '设备IP地址', dataIndex: '11', align: 'center', render: (text) => <Render text={text || '-'}/>},
  ];

  const [close, setClose] = useState(false);

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
      <div style={{display:'none'}}><FormItem name="modelId" component={Input}/></div>
      <div style={{display:'none'}}><FormItem name="classifyId" component={Input}/></div>
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree open={close} close={() => setClose(!close)} onChange={(key, type) => {
            switch (type) {
              case 'terminal':
                ref.current.formActions.setFieldValue('modelId', key);
                break;
              case 'group':
                ref.current.formActions.setFieldValue('classifyId', key);
                break;
              default:
                break;
            }
            ref.current.submit();
          }}/>
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <Table
          ref={ref}
          api={deviceList}
          rowKey="deviceId"
          tableKey="monitor"
          searchForm={searchForm}
          columns={columns}
          actionRender={(text, record) => (
            <Button type="primary">孪生数据</Button>
          )}
        />
      </Col>
    </Row>

    <Drawer
      title={`终端备注：${infoVisible.remarks}    设备型号：${infoVisible.modelName}`}
      width="60vw"
      placement="right"
      onClose={() => setInfoVisible({})}
      open={infoVisible.deviceId}
    >
      <Info deviceId={infoVisible.deviceId}/>
    </Drawer>
    <NoteSave
      close={() => setNoteVisible({})}
      data={noteVisible}
      success={() => {
        setNoteVisible({});
        ref.current.submit();
      }}
    />

    <Drawer
      title={`终端备注：${open.remarks}    设备型号：${open.modelName}`}
      destroyOnClose
      width="50vw"
      open={open.type}
      onClose={() => setOpen({})}
      extra={<DatePicker width={200} RangePicker/>}
    >
      {open.type === 'GridPowerSupply' && <GridPowerSupply/>}
      {open.type === 'BackboneNetwork' && <BackboneNetwork/>}
      {open.type === '4gNetwork' && <Network4G/>}
    </Drawer>
  </>;
};
export default Monitor;
