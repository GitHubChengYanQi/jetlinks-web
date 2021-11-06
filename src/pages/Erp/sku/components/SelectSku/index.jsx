import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import {Select as AntSelect, Select as AntdSelect} from 'antd';
import React, {useEffect, useState} from 'react';


const SelectSku = ({value,onChange}) => {

  const {loading, data, run} = useRequest({...skuList, data: {type: 0}}, {debounceInterval: 500});

  const [change,setChange] = useState();

  useEffect(()=>{
    run({
      data: {
        skuId: value,
        type: 0
      }
    });
  },[]);

  const object = (items) => {
    let values = '';
    items.skuJsons && items.skuJsons.map((item, index) => {
      if (index === items.skuJsons.length - 1) {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}` : '';
      } else {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}，` : '';
      }
    });
    return {
      label: items.spuResult && `${items.skuName} / ${items.spuResult.name}`,
      value: items.skuId,
      attribute:`${(values === '' ? '' : `( ${values} )`)}`,
    };
  };

  const options = data && data.map((items) => {
    return object(items);
  });

  return (<AntdSelect
    placeholder="物料"
    showSearch
    value={change || (value && options && options[0] && options[0].label)}
    allowClear
    loading={loading}
    style={{width: '100%'}}
    onSearch={(value) => {
      setChange(value);
      run({
        data: {
          skuName: value,
          type: 0
        }
      });
    }}
    onChange={(value,option) => {
      setChange(value);
      if (option && option.key){
        onChange(option.key);
      }
    }}>
    {options && options.map((items) => {
      return (
        <AntSelect.Option key={items.value} title={items.label+items.attribute} value={items.label+items.attribute}>
          {items.label} <em style={{color:'#c9c8c8',fontSize:10}}>{items.attribute}</em>
        </AntSelect.Option>
      );
    })}
  </AntdSelect>);
};

export default SelectSku;
