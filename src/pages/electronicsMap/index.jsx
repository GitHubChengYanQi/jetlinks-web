import React, {useRef, useState} from 'react';
import {Col, Drawer, Input, Row, Select as AntSelect, Select} from 'antd';
import {Form, FormButtonGroup, Reset, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import {useHistory} from 'ice';
import styles from '@/pages/monitor/index.module.less';
import LeftTree from '@/pages/monitor/LeftTree';
import FormItem from '@/components/Table/components/FormItem';
import {LinkButton} from '@/components/Button';
import Info from '@/pages/monitor/Info';
import store from '@/store';
import Bmap from '@/components/Bmap';
import Cascader from '@/components/Cascader';
import {isArray} from '@/util/Tools';

const ElectronicsMap = () => {

  const [dataSource] = store.useModel('dataSource');

  const history = useHistory();

  const infoRef = useRef();

  const [close, setClose] = useState(false);

  const [infoVisible, setInfoVisible] = useState({});

  const [params, setParams] = useState({});

  const ref = useRef();

  const searchForm = () => {
    return <>
      <Form
        layout="inline"
        onSubmit={(values) => {
          ref.current.submit(values);
        }}
        onReset={() => {
          ref.current.submit(params, true);
        }}
      >
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
        <FormItem
          label="报警状态"
          name="alarmType"
          component={({value, onChange}) => {
            return <Select
              defaultValue="all"
              value={value || 'all'}
              options={[
                {label: '全部', value: 'all'},
                {label: '正常', value: 'n'},
                {label: '报警', value: 'y'},
              ]}
              onChange={(value) => {
                onChange(value === 'all' ? null : value);
              }}
            />;
          }}
          select
        />
        <FormItem label="终端备注查询" name="name" component={Input} placeholder="请输入要查询的终端备注" />
        <FormItem
          label="位置信息"
          name="position"
          options={dataSource.area}
          component={({value, onChange}) => {
            return <Cascader
              placeholder="请选择位置信息"
              width={200}
              value={value?.value}
              options={dataSource.area}
              onChange={(value, option, options) => {
                onChange(option);
                if (isArray(options).length === 0) {
                  return;
                }
                let zoom = 0;
                switch (options.length) {
                  case 1:
                    zoom = 8;
                    break;
                  case 2:
                    zoom = 12;
                    break;
                  case 3:
                    zoom = 16;
                    break;
                  default:
                    break;
                }
                ref.current.movingLocation(options[options.length - 1].label, zoom);
              }}
            />;
          }}
        />
        <FormButtonGroup>
          <Submit><SearchOutlined />查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </Form>
    </>;
  };

  const customer = dataSource.customer || {};

  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree
            open={close}
            showModules={customer.deptId ? ['terminal', 'group'] : ['terminal', 'customer']}
            close={() => setClose(!close)}
            noAction
            onChange={(key, type) => {
              switch (type) {
                case 'terminal':
                  ref.current.submit({modelId: key});
                  setParams({...params, modelId: key});
                  break;
                case 'group':
                  ref.current.submit({classifyId: key});
                  setParams({...params, classifyId: key});
                  break;
                case 'customer':
                  ref.current.submit({deptId: key});
                  setParams({...params, deptId: key});
                  break;
                default:
                  break;
              }
            }}
          />
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <div style={{backgroundColor: '#fff', padding: 12}}>
          {searchForm()}
        </div>
        <div style={{height: 'calc(100vh - 160px)'}}>
          <Bmap ref={ref} onMarkerClick={setInfoVisible} onHistory={(url) => {
            history.push(url);
          }} />
        </div>
      </Col>
    </Row>

    <Drawer
      className={styles.infoDrawer}
      destroyOnClose
      title={`终端备注：${infoVisible.remarks}    设备型号：${infoVisible.modelName}`}
      width="auto"
      placement="right"
      onClose={() => setInfoVisible({})}
      open={infoVisible.modelId}
      extra={<LinkButton onClick={() => infoRef.current.openAlarm()}>报警设置</LinkButton>}
    >
      <Info
        ref={infoRef}
        deviceId={infoVisible.deviceId}
        modelId={infoVisible.modelId}
      />
    </Drawer>
  </>;
};

export default ElectronicsMap;
