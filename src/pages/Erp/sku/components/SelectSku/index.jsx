import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import {Popover, Select as AntSelect, Select as AntdSelect, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import Select from '@/components/Select';
import Cascader from '@/components/Cascader';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';


const SelectSku = ({value, onChange, dropdownMatchSelectWidth,params}) => {

  const {loading, data, run} = useRequest({...skuList, data: {type: 0,...params}}, {
    debounceInterval: 500, onSuccess: (res) => {
      if (res.length === 1){
        setSpuClass(res && res[0].spuResult.spuClassificationId);
      }
    }
  });

  const [change, setChange] = useState();

  const [spuClass, setSpuClass] = useState();

  useEffect(() => {
    run({
      data: {
        skuId: value,
        type: 0,
        ...params
      }
    });
  }, [params]);

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
      attribute: `${(values === '' ? '' : `( ${values} )`)}`,
      spu:items.spuResult
    };
  };

  const options = data && data.map((items) => {
    return object(items);
  });

  const content = () => {
    return <Space direction="horizontal">
      <Cascader
        width={200}
        placeholder="请选择物料分类"
        value={spuClass}
        api={spuClassificationTreeVrew}
        onChange={(value) => {
          setSpuClass(value);
          setChange(null);
          run({
            data: {
              spuClass: value,
              type: 0,
              ...params
            }
          });
        }} />
      <AntdSelect
        style={{width: 200}}
        placeholder="输入型号搜索"
        showSearch
        value={value && (change || (options && options[0] && options[0].label + options[0].attribute))}
        allowClear
        loading={loading}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        onSearch={(value) => {
          setChange(value);
          run({
            data: {
              spuClass,
              skuName: value,
              type: 0,
              ...params
            }
          });
        }}
        onChange={(value, option) => {
          setChange(value);
          setSpuClass(option.spu && option.spu.spuClassificationId);
          if (option && option.key) {
            onChange(option.key);
          }
        }}>
        {options && options.map((items) => {
          return (
            <AntSelect.Option
              key={items.value}
              spu={items.spu}
              title={items.label + items.attribute}
              value={items.label + items.attribute}>
              {items.label} <em style={{color: '#c9c8c8', fontSize: 10}}>{items.attribute}</em>
            </AntSelect.Option>
          );
        })}
      </AntdSelect>
    </Space>;
  };

  return (
    <>
      <Popover placement="bottomLeft" content={content} trigger="click">
        <AntdSelect
          options={data || []}
          open={false}
          style={{width: 180}}
          value={value && (change || (options && options[0] && options[0].label + options[0].attribute))}
        />
      </Popover>
    </>);
};

export default SelectSku;
