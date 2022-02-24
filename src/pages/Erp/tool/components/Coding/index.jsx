import React, {useEffect, useState} from 'react';
import {Input, Select as AntdSelect, Space, Spin} from 'antd';
import cookie from 'js-cookie';
import {useRequest} from '@/util/Request';


const Coding = ({value, width, onChange, module, placeholder}) => {

  const [state, setState] = useState(value ? 'defined' : (cookie.get('codingType') || 'sys'));

  const {loading, run} = useRequest({
    url: '/codingRules/defaultEncoding',
    method: 'GET'
  }, {
    manual: true,
    onSuccess: (res) => {
      onChange(res);
    }
  });

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
      run({
        params: {
          type: module
        }
      });
    }
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <Space style={{width}}>
      <AntdSelect
        style={{width: 100}}
        value={state}
        dropdownMatchSelectWidth={200}
        options={options}
        onSelect={(value) => {
          cookie.set('codingType', value);
          setState(value);
          if (value === 'sys') {
            run({
              params: {
                type: module
              }
            });
          } else {
            onChange(null);
          }
        }}
      />
      <Input value={value} placeholder={placeholder || '请输入自定义编码'} onChange={(value) => {
        onChange(value.target.value);
      }} />
    </Space>
  );
};

export default Coding;
