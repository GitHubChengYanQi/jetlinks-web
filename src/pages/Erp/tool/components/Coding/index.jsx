import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {codingRulesListSelect} from '@/pages/Erp/tool/toolUrl';
import {Input, Select as AntdSelect, Space} from 'antd';


const Coding = ({value, width, onChange, codingId}) => {

  const [state, setState] = useState();

  const {data} = useRequest(codingRulesListSelect);

  const options = [
    {
      label: '编码规则',
      options: data || []
    },
    {
      label: '自定义',
      options: [
        {
          label: '自定义',
          value: '自定义'
        }
      ]
    }
  ];

  useEffect(() => {
    if (value) {
      onChange(value);
      setState(false);
    } else {
      onChange(codingId);
      setState(true);
    }
  }, []);

  return (<div style={{width}}>
    {state ?
      <AntdSelect
        allowClear
        showSearch
        value={value}
        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        defaultValue={codingId ? `${codingId}` : ''}
        style={{width: '100%'}}
        options={options || []}
        onSelect={(value) => {
          onChange(value);
          if (value === '自定义') {
            setState(false);
            onChange(null);
          }
        }} />
      :
      <Space>
        <AntdSelect
          value="自定义"
          style={{minWidth: 100}}
          dropdownMatchSelectWidth={200}
          options={[
            {
              label: '编码规则',
              options: data || []
            },
          ]}
          onSelect={(value) => {
            setState(true);
            onChange(value);
          }} />
        <Input value={value} style={width && {width:(width-100)}} placeholder="输入自定义编码" onChange={(value)=>{
          onChange(value.target.value);
        }} />
      </Space>
    }
  </div>);
};

export default Coding;
