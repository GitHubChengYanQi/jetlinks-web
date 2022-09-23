import React, {useRef, useState} from 'react';
import {Col, Drawer, Input, Row, Select} from 'antd';
import {Form, FormButtonGroup, Reset, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import styles from '@/pages/monitor/index.module.less';
import LeftTree from '@/pages/monitor/LeftTree';
import FormItem from '@/components/Table/components/FormItem';
import Amap from '@/components/Amap';
import {LinkButton} from '@/components/Button';
import Info from '@/pages/monitor/Info';
import Save from '@/pages/monitor/Info/Save';

const ElectronicsMap = () => {

  const [close, setClose] = useState(false);

  const [infoVisible, setInfoVisible] = useState({});
  const [saveVisible, setSaveVisible] = useState(false);

  const ref = useRef();

  const searchForm = () => {
    return <>
      <Form
        layout="inline"
        onSubmit={(values) => {
          ref.current.submit(values);
        }}
      >
        <FormItem
          label="报警状态"
          name="bjzt"
          component={({value, onChange}) => {
            return <Select
              defaultValue="all"
              value={value || 'all'}
              options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '禁用', value: '0'},]}
              onChange={(value) => {
                onChange(value === 'all' ? null : value);
              }}
            />;
          }}
          select />
        <FormItem
          label="设备状态"
          name="status"
          component={({value, onChange}) => {
            return <Select
              defaultValue="all"
              value={value || 'all'}
              options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '禁用', value: '0'},]}
              onChange={(value) => {
                onChange(value === 'all' ? null : value);
              }}
            />;
          }}
          select />
        <FormItem label="设备查询" name="name" component={Input} />
        <FormItem label="位置信息" name="place" component={Input} />
        <FormButtonGroup>
          <Submit><SearchOutlined />查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </Form>
    </>;
  };

  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree
            open={close}
            close={() => setClose(!close)}
            noAction
            showModules={['group']}
            onChange={(classifyId) => {
              ref.current.submit({classifyId});
            }}
          />
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <div style={{backgroundColor: '#fff', padding: 12}}>
          {searchForm()}
        </div>
        <Amap ref={ref} show onMarkerClick={setInfoVisible} />
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
    <Save visible={saveVisible} close={() => setSaveVisible(false)} data={{}} />
  </>;
};

export default ElectronicsMap;
