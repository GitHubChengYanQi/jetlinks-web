import React from 'react';
import {Input, InputNumber} from 'antd';

export const Name = (props) => {
  return (<Input {...props} />);
};
export const Code = (props) => {
  return (<Input {...props} />);
};
export const Remark = (props) => {
  return (<Input {...props} />);
};
export const Sort = (props) => {
  return (<InputNumber min={0} {...props} />);
};
