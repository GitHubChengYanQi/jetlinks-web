import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {codingRulesListSelect} from '@/pages/Erp/tool/toolUrl';
import {AutoComplete, Input, Select as AntdSelect} from 'antd';


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
          if (value === '自定义'){
            setState(false);
            onChange(null);
          }
        }} />
      :
      <AutoComplete
        allowClear
        value={value}
        options={[{label:'编码规则',options:data || []}]}
        style={{width: '100%'}}
        placeholder="请输入编码"
        onChange={(value) => {
          onChange(value);
        }}
        onSelect={(value) => {
          onChange(value);
          setState(true);
        }}
        filterOption={(input, option) =>
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />
    }
  </div>);
};

export default Coding;
