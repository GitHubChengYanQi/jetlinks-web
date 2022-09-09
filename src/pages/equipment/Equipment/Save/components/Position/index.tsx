import React from "react";
import {InputNumber} from "antd";

interface Props {
  value?: any[];
  onChange?: (positions: any[]) => void;
}

const Position: React.FC<Props> = (props) => {
  const {
    value = [],
    onChange = () => {
    },
  } = props;


  return <div style={{display: 'flex'}}>
    <InputNumber
      style={{flexGrow: 1}}
      placeholder='请输入经度'
      value={value[0]}
      onChange={(number) => onChange([number, value[1]])} />
    <InputNumber
      style={{flexGrow: 1}}
      placeholder='请输入维度'
      value={value[1]}
      onChange={(number) => onChange([value[0], number])} />
  </div>;
};

export default Position;
