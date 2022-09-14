import React, {useState} from 'react';
import {Button, Col, Input, Row, Select} from 'antd';
import {Form, FormButtonGroup} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Amap from '@/components/Amap';
import styles from '@/pages/monitor/index.module.less';
import LeftTree from '@/pages/monitor/LeftTree';
import FormItem from '@/components/Table/components/FormItem';

const ElectronicsMap = () => {

  const [close, setClose] = useState(false);

  const searchForm = () => {
    return <>
      <Form
        layout="inline"
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
          name="sbzt"
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
        <FormItem label="设备查询" name="device" component={Input} />
        <FormItem label="位置信息" name="place" component={Input} />
        <FormButtonGroup>
          <Button
            id="submit"
            type="primary"
            htmlType="submit"
            onClick={() => {

            }}><SearchOutlined />查询
          </Button>
          <Button
            onClick={() => {

            }}>
            重置
          </Button>
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
            onChange={() => {

            }}
          />
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <div style={{backgroundColor:'#fff',padding:12}}>
          {searchForm()}
        </div>
        <Amap show noAction />
      </Col>
    </Row>
  </>;
};

export default ElectronicsMap;
