import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import {Select as AntSelect, Select as AntdSelect} from 'antd';
import React from 'react';


const SelectSku = ({value,onChange}) => {

  const {loading, data, run} = useRequest({...skuList, data: {type: 0}}, {debounceInterval: 500});

  const options = data && data.map((items) => {
    let values = '';
    items.skuJsons && items.skuJsons.map((item, index) => {
      if (index === items.skuJsons.length - 1) {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}` : '';
      } else {
        return values += (item.values && item.values.attributeValues) ? `${item.attribute && item.attribute.attribute}：${item.values && item.values.attributeValues}，` : '';
      }
    });
    return {
      label: items.spuResult && `${items.skuName} / ${items.spuResult.name}  ${(values === '' ? '' : `( ${values} )`)}`,
      value: items.skuId,
    };
  });

  return (<AntdSelect
    placeholder="物料"
    showSearch
    value={value}
    loading={loading}
    style={{width: '100%'}}
    onSearch={(value) => {
      run({
        data: {
          skuName: value,
          type: 0
        }
      });
    }}
    onChange={(value) => {
      onChange(value);
    }}>
    {options && options.map((items, index) => {
      return (
        <AntSelect.Option key={index} value={items.value}>
          {items.label}
        </AntSelect.Option>
      );
    })}
  </AntdSelect>);
};

export default SelectSku;
