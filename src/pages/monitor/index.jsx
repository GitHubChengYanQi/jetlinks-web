import React, {useRef, useState} from 'react';
import {
  Row,
  Col,
  Button,
  Space,
  Tooltip,
  Input,
  Drawer,
  Select as AntSelect,
} from 'antd';
import {EditOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import LeftTree from '@/pages/monitor/LeftTree';
import NoteSave from '@/pages/monitor/NoteSave';
import Info from '@/pages/monitor/Info';
import Render from '@/components/Render';
import FormItem from '@/components/Table/components/FormItem';
import styles from './index.module.less';
import GridPowerSupply from '@/pages/monitor/components/GridPowerSupply';
import BackboneNetwork from '@/pages/monitor/components/BackboneNetwork';
import Network4G from '@/pages/monitor/components/4gNetwork';
import DatePicker from '@/components/DatePicker';
import {monitorList} from '@/pages/monitor/url';
import Save from '@/pages/monitor/Info/Save';
import {LinkButton} from '@/components/Button';
import Table from '@/components/Table';

const Monitor = () => {

  const [infoVisible, setInfoVisible] = useState({});
  const [noteVisible, setNoteVisible] = useState({});

  const [saveVisible, setSaveVisible] = useState(false);

  const [open, setOpen] = useState({});

  const ref = useRef();

  const [modelColumns, setModelColumns] = useState([]);

  const columns = [
    {
      title: '设备状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => {
        const online = status === 'online';
        return <Render>
          <span className={online ? 'green' : 'close'}>{online ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {
      title: <Space>
        终端备注
        <Tooltip placement="top" title="终端设备备注的名称，平台可以修改">
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>,
      dataIndex: 'remarks',
      align: 'center',
      render: (remarks, record) => {
        return <Space>
          <Button
            className="blue"
            type="link"
            onClick={() => setInfoVisible(record)}>{remarks}</Button>
          <EditOutlined onClick={() => setNoteVisible({deviceId: record.deviceId, remarks})} />
        </Space>;
      }
    },
    {
      title: <Space>
        登记名称
        <Tooltip placement="top" title="设备上报的登记名称，平台不可以修改">
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>,
      dataIndex: 'name',
      align: 'center',
      render: (name) => <Render text={name} />
    },
    ...modelColumns.map(item => {
      const children = item.children || [];
      const render = (text) => <Render text={typeof text === 'object' ? '' : (text || '-')} />;
      return {...item, children: children.map(childrenItem => ({...childrenItem, render})), render};
    }),
    {
      title: 'GPS定位',
      dataIndex: '10',
      align: 'center',
      render: (text) => <Render text={<span className="green">{text || '-'}</span>} />
    },
    {title: '设备IP地址', dataIndex: '11', align: 'center', render: (text) => <Render text={text || '-'} />},
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
      <FormItem label="终端备注" name="remarks" component={Input} />
      <FormItem label="设备名称" name="name" component={Input} />
      <div style={{display: 'none'}}><FormItem name="modelId" component={Input} /></div>
      <div style={{display: 'none'}}><FormItem name="classifyId" component={Input} /></div>
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree firstKey open={close} close={() => setClose(!close)} onChange={(key, type) => {
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
          }} />
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <Table
          condition={(values) => {
            return values.modelId;
          }}
          format={(data = []) => {
            return data.map(item => ({...item, ...(item.protocolDetail || {})}));
          }}
          onResponse={(res = {}) => {
            setModelColumns(res.columns || []);
          }}
          columnsResh
          ref={ref}
          searchForm={searchForm}
          api={monitorList}
          columns={columns}
          rowKey="deviceId"
          actionRender={(text, record) => (
            <Button type="primary">孪生数据</Button>
          )}
        />
      </Col>
    </Row>

    <Drawer
      destroyOnClose
      title={`终端备注：${infoVisible.remarks}    设备型号：${infoVisible.modelName}`}
      width="60vw"
      placement="right"
      onClose={() => setInfoVisible({})}
      open={infoVisible.modelId}
      extra={<LinkButton onClick={() => setSaveVisible(true)}>报警设置</LinkButton>}
    >
      <Info deviceId={infoVisible.deviceId} modelId={infoVisible.modelId} />
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
      style={{minWidth: '50vw'}}
      className={styles.drawer}
      open={open.type}
      onClose={() => setOpen({})}
      extra={<DatePicker width={200} RangePicker />}
    >
      {open.type === 'GridPowerSupply' && <GridPowerSupply />}
      {open.type === 'BackboneNetwork' && <BackboneNetwork />}
      {open.type === '4gNetwork' && <Network4G />}
    </Drawer>

    <Save visible={saveVisible} close={() => setSaveVisible(false)} data={{}} />
  </>;
};
export default Monitor;
