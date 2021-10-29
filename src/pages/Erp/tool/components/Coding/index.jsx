import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {codingRulesListSelect} from '@/pages/Erp/tool/toolUrl';
import {Input, Select as AntdSelect} from 'antd';


const Coding = ({value,width,onChange,codingId}) => {

  const [state, setState] = useState();

  const {data} = useRequest(codingRulesListSelect);

  useEffect(() => {
    if (value) {
      onChange(value);
      setState(1);
    } else {
      onChange(codingId);
    }
  }, []);

  return (<div style={{width}}>
    {!state ?
      <AntdSelect defaultValue={`${codingId}`} style={{width: '50%'}} options={data || []} onSelect={(value) => {
        onChange(value);
      }} />
      :
      <Input placeholder="请输入编码" style={{width: '50%'}} disabled={!state} value={value} onChange={(value) => {
        onChange(value.target.value);
      }} />}
    <AntdSelect
      style={{width: '30%', marginLeft: 16}}
      defaultValue={value ? 1 : 0}
      options={[{label: '规则生成', value: 0}, {label: '手动输入', value: 1}]}
      onSelect={(value) => {
        if (value === 0) {
          onChange(codingId);
        }else {
          onChange(null);
        }
        setState(value);
      }} />
  </div>);
};

export default Coding;
