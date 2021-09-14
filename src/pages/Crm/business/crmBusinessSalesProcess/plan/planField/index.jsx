/**
 * 字段配置页
 *
 * @author song
 * @Date 2021-09-14 14:36:34
 */

import React, {useEffect, useState} from 'react';
import {Descriptions, Input, InputNumber} from 'antd';

export const SalesProcessId = (props) => {
  const {salesProcessId} = props;
  if (salesProcessId) {
    props.onChange(props.salesProcessId);
  }
  return <Input />;
};

export const SalesProcessPlanId = (props) => {

  const {value} = props;

  const [json, setJson] = useState( value || {
    oneTime : null,
    twoTime : null});

  useEffect(() => {
    props.onChange(json);
  }, [json]);

  return (
    <>
      <Descriptions
        bordered
        title="跟踪计划"
        // size={this.state.size}
        // extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="第一次计划时间">
          <InputNumber value={json.oneTime} style={{marginRight: 20}} onChange={(value) => {
            setJson({
              ...json,
              oneTime: value,
            });
          }}
          />
          天
        </Descriptions.Item>
        <Descriptions.Item label="第二次计划时间">
          <InputNumber value={json.twoTime} style={{marginRight: 20}} onChange={(value) => {
            setJson({
              ...json,
              twoTime: value,
            });
          }}
          />
          天
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

