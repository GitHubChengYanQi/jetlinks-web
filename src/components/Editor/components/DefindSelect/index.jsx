import React, {useEffect, useState} from 'react';
import {Radio, Space} from 'antd';

const style = {
  margin: 8,
  width: '17%',
  textAlign: 'center'
};


const DefindSelect = ({
  setButton,
  button
}) => {

  const [radio, setRadio] = useState();

  useEffect(() => {
    if (button !== 'defindSelect') {
      setRadio(null);
    }
  }, [button]);

  return <Radio.Group value={radio} onChange={(value) => {
    setRadio(value.target.value);
    setButton('defindSelect');
  }}>
    <Radio.Button value="运费承担" style={style}>运费承担</Radio.Button>
    <Radio.Button value="提取(交付)地点" style={style}>提取(交付)地点</Radio.Button>
    <Radio.Button value="运输方式" style={style}>运输方式</Radio.Button>
    <Radio.Button value="提货人员" style={style}>提货人员</Radio.Button>
    <Radio.Button value="接货人电话" style={style}>接货人电话</Radio.Button>
    <Space>
      变量选项
      <div>
        1.供方承担
      </div>
      <div>
        2.需方自提
      </div>
    </Space>
    <Radio.Button value="质量标准" style={style}>质量标准</Radio.Button>
    <Radio.Button value="质量要求" style={style}>质量要求</Radio.Button>
    <Radio.Button value="质保起始方式" style={style}>质保起始方式</Radio.Button>
    <Radio.Button value="质保周期" style={style}>质保周期</Radio.Button>
    <Radio.Button value="其他约定事项" style={style}>其他约定事项</Radio.Button>
  </Radio.Group>;
};

export default DefindSelect;
