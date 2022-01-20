import {Popover, Select, Space, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import Cascader from '@/components/Cascader';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';


const SelectSku = ({value, onChange,width, dropdownMatchSelectWidth,placeholder, params, skuIds,ids}) => {

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
      label: items.spuResult && `${items.spuResult.spuClassificationResult && items.spuResult.spuClassificationResult.name} / ${items.spuResult.name}`,
      value: items.skuId,
      attribute: `${(values === '' ? '' : `( ${values} )`)}`,
      spu: items.spuResult,
      standard:items.standard
    };
  };

  const {loading, data, run} = useRequest({...skuList, data: {skuIds:ids, ...params}}, {
    debounceInterval: 1000, onSuccess: (res) => {
      if (res.length === 1) {
        onChange(res[0].skuId);
        setChange(object(res[0]).label + object(res[0]).attribute);
        setSpuClass(res[0].spuResult.spuClassificationResult.pid);
      }
    }
  });

  useEffect(() => {
    run({
      data: {
        skuIds:ids,
        skuId: value,
        ...params
      }
    });
  }, [params, value,ids]);


  const options = !loading ? data && data.map((items) => {
    return object(items);
  }) : [];

  const content = () => {
    return <Space direction="horizontal">
      <Cascader
        width={200}
        placeholder="请选择物料分类"
        value={spuClass}
        api={{...spuClassificationTreeVrew,data:{isNotproduct:1}}}
        onChange={(value) => {
          setSpuClass(value);
          setChange(null);
          run({
            data: {
              skuIds:ids,
              spuClass: value,
              ...params
            }
          });
        }} />
      <Select
        style={{width: 200}}
        placeholder="输入型号(零件号)搜索"
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
              skuIds:ids,
              spuClass,
              skuName: value,
              ...params
            }
          });
        }}
        onChange={(value, option) => {
          setChange(value && value.replace(`standard:${option.standard}`,''));
          if (option) {
            setSpuClass(option.spu && option.spu.spuClassificationResult && option.spu.spuClassificationResult.pid);
            if (option && option.key) {
              onChange(option.key);
            }
          } else {
            setSpuClass(null);
            onChange(null);
            run({
              data: {
                skuIds:ids,
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
          style={{width: width || 180}}
          value={value && (change || (options && options[0] && options[0].label + options[0].attribute))}
        />
      </Popover>
    </>);
};

export default SelectSku;
