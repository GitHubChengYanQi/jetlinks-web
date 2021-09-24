import React, {useState} from 'react';
import {AutoComplete} from 'antd';
import {useRequest} from '@/util/Request';
import {CustomerLevelIdSelect} from '@/pages/Crm/customer/CustomerUrl';


const SelectEdit = ({value:values,val, onChange}) => {

  const [value,setValue] = useState(values);
  const [change,setChange] = useState(val);

  const {data} = useRequest(CustomerLevelIdSelect);

  return (
    <div style={{display: 'inline-block', cursor: 'pointer'}}>
      <AutoComplete
        value={value}
        options={data}
        style={{width: 200}}
        onChange={(value, option)=>{
          setValue(option.label);
          setChange(option.label);
          typeof onChange === 'function' && onChange(option.value);
        }}
      >
        <div>{change || '未填写'}</div>
      </AutoComplete>
    </div>
  );
};

export default SelectEdit;
