/**
 * 字段配置页
 *
 * @author song
 * @Date 2021-09-14 14:36:34
 */

import React, {useEffect, useState} from 'react';
import {Descriptions, Input, InputNumber, message} from 'antd';

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
        title="跟进计划"
        // size={this.state.size}
        // extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="每次提醒间隔">
          <InputNumber min={0} value={json.oneTime} style={{marginRight: 20}} onChange={(value) => {
            if (value<0){
              message.info('请输入正数！');
            }else {
              setJson({
                ...json,
                oneTime: value,
              });
            }
          }}
          />
          天
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

