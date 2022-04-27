import React, {useEffect, useState} from 'react';
import {Input, Select as AntdSelect, Space} from 'antd';
import cookie from 'js-cookie';


const Coding = ({value, width, onChange, module, placeholder}) => {

  const [state, setState] = useState(value ? 'defined' : (cookie.get('codingType') || 'defined'));

  const options = [
    {
      label: '自动生成',
      value: 'sys'
    },
    {
      label: '自定义',
      value: 'defined'
    }
  ];

  useEffect(() => {
    if (!value && module !== undefined && cookie.get('codingType') === 'sys') {

    }
  }, []);

  return (
    <div style={{display: 'flex'}}>
      <AntdSelect
        style={state === 'defined' ? {width: 100, marginRight: 16} : {}}
        value={state}
        // dropdownMatchSelectWidth={200}
        options={options}
        onSelect={(value) => {
          cookie.set('codingType', value);
          setState(value);
          if (value === 'sys') {

          } else {
            onChange(null);
          }
        }}
      />
      {state === 'defined' && <Input value={value} placeholder={placeholder || '请输入自定义编码'} onChange={(value) => {
        onChange(value.target.value);
      }} />}
    </div>
  );
};

export default Coding;
