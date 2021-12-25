import {Popover, Select, Space, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import Cascader from '@/components/Cascader';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';


const SelectSku = ({value, onChange, dropdownMatchSelectWidth,placeholder, params, skuIds}) => {

  const [spuClass, setSpuClass] = useState();
  const [change, setChange] = useState();

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
      disabled: skuIds && skuIds.filter((value) => {
        return value === items.skuId;
      }).length > 0,
      label: items.spuResult && `${items.skuName} / ${items.spuResult.name}`,
      value: items.skuId,
      attribute: `${(values === '' ? '' : `( ${values} )`)}`,
      spu: items.spuResult,
      standard:items.standard
    };
  };

  const {loading, data, run} = useRequest({...skuList, data: {type: 0, ...params}}, {
    debounceInterval: 1000, onSuccess: (res) => {
      if (res.length === 1) {
        onChange(res[0].skuId);
        setChange(object(res[0]).label + object(res[0]).attribute);
        setSpuClass(res[0].spuResult.spuClassificationId);
      }
    }
  });


  useEffect(() => {
    run({
      data: {
        skuId: value,
        type: 0,
        ...params
      }
    });
  }, [params, value]);


  const options = !loading ? data && data.map((items) => {
    return object(items);
  }) : [];

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
      <Select
        style={{width: 200}}
        placeholder="输入型号搜索"
        showSearch
        allowClear
        onClear={()=>{
          onChange(null);
        }}
        value={value && (change || (options && options[0] && options[0].label + options[0].attribute))}
        notFoundContent={loading && <div style={{textAlign: 'center', padding: 16}}><Spin /></div>}
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
          setChange(value && value.replace(`standard:${option.standard}`,''));
          if (option) {
            setSpuClass(option.spu && option.spu.spuClassificationId);
            if (option && option.key) {
              onChange(option.key);
            }
          } else {
            setSpuClass(null);
            onChange(null);
            run({
              data: {
                type: 0,
                ...params
              }
            });
          }

        }}>
        {options && options.map((items) => {
          return (
            <Select.Option
              key={items.value}
              spu={items.spu}
              disabled={items.disabled}
              title={items.label + items.attribute}
              standard={items.standard}
              value={`${items.label + items.attribute}standard:${items.standard}`}>
              {items.label} <em style={{color: '#c9c8c8', fontSize: 10}}>{items.attribute}</em>
            </Select.Option>
          );
        })}
      </Select>
    </Space>;
  };

  return (
    <>
      <Popover placement="bottomLeft" content={content} trigger="click">
        <Select
          placeholder={placeholder}
          open={false}
          style={{width: 180}}
          value={value && (change || (options && options[0] && options[0].label + options[0].attribute))}
        />
      </Popover>
    </>);
};

export default SelectSku;
