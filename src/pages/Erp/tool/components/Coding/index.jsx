import React, {useEffect, useState} from 'react';
import {Input, Select as AntdSelect, Space} from 'antd';
import {useRequest} from '@/util/Request';
import {codingRulesListSelect} from '@/pages/Erp/tool/toolUrl';


const Coding = ({value, width, onChange, codingId, module}) => {

  const [state, setState] = useState(false);

  const {data} = useRequest(codingRulesListSelect,
    {
      defaultParams: {
        data: {
          module
        }
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
    if (value) {
      onChange(value);
    } else if (codingId){
      onChange(codingId);
      setState(true);
    }
  }, []);

  return (
    <Space style={{width}}>
      <AntdSelect
        style={{width: 100}}
        value={state ? 'sys' : 'defined'}
        dropdownMatchSelectWidth={200}
        options={options}
        onSelect={(value) => {
          setState(value !== 'defined');
          onChange(null);
        }}
      />
      <div style={{minWidth:100}}>
        {
          state ?
            <AntdSelect
              allowClear
              showSearch
              value={value}
              filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              defaultValue={codingId ? `${codingId}` : ''}
              options={data || []}
              onSelect={(value) => {
                onChange(value);
              }} />
            :
            <Input value={value} placeholder="输入自定义编码" onChange={(value) => {
              onChange(value.target.value);
            }} />
        }
      </div>
    </Space>
  );
};

export default Coding;
