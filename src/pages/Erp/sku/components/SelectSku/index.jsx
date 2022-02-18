import {Popover, Select, Space, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import Cascader from '@/components/Cascader';
import {spuClassificationTreeVrew} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';


const SelectSku = ({
  value,
  onChange,
  width,
  dropdownMatchSelectWidth,
  placeholder,
  params,
  skuIds,
  ids,
  spu
}) => {

  const [spuClass, setSpuClass] = useState();
  const [change, setChange] = useState();

  const object = (items) => {
    return {
      disabled: skuIds && skuIds.filter((value) => {
        return value === items.skuId;
      }).length > 0,
      label: items.spuResult && `${items.spuResult.spuClassificationResult && items.spuResult.spuClassificationResult.name} / ${items.spuResult.name} ${items.specifications ? `/ ${items.specifications}` : ''}`,
      value: items.skuId,
      spu: items.spuResult,
      standard: items.standard
    };
  };

  const {loading, data, run} = useRequest({...skuList, data: {skuIds: ids, ...params}}, {
    debounceInterval: 1000, onSuccess: (res) => {
      if (res.length === 1) {
        onChange(spu ? res[0].spuId : res[0].skuId);
        setChange(object(res[0]).label);
        setSpuClass(res[0].spuResult.spuClassificationResult.pid);
      }
    }
  });

  useEffect(() => {
    run({
      data: {
        skuIds: ids,
        skuId: value,
        ...params
      }
    });
  }, [params, value, ids && ids.length]);


  const options = !loading ? data && data.map((items) => {
    return object(items);
  }) : [];

  const content = () => {
    return <Space direction="horizontal">
      <Cascader
        width={200}
        placeholder="请选择物料分类"
        value={spuClass}
        api={{...spuClassificationTreeVrew, data: {isNotproduct: 1}}}
        onChange={(value) => {
          setSpuClass(value);
          setChange(null);
          run({
            data: {
              skuIds: ids,
              spuClass: value,
              ...params
            }
          });
        }} />
      <Select
        style={{width: 200}}
        placeholder={spu ? '名称/型号' : '名称/型号/物料编码'}
        showSearch
        allowClear
        onClear={() => {
          onChange(null);
        }}
        value={value && (change || (options && options[0] && options[0].label))}
        notFoundContent={loading && <div style={{textAlign: 'center', padding: 16}}><Spin /></div>}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth || 400}
        onSearch={(value) => {
          setChange(value);
          run({
            data: {
              skuIds: ids,
              spuClass,
              skuName: value,
              ...params
            }
          });
        }}
        onChange={(value, option) => {
          setChange(value && value.replace(`standard:${option.standard}`, ''));
          if (option) {
            setSpuClass(option.spu && option.spu.spuClassificationResult && option.spu.spuClassificationResult.pid);
            if (option && option.key) {
              onChange(spu ? option.spu.spuId : option.key);
            }
          } else {
            setSpuClass(null);
            onChange(null);
            run({
              data: {
                skuIds: ids,
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
              title={items.label}
              standard={items.standard}
              value={`${items.label}standard:${items.standard}`}>
              {items.label}
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
          value={value && (change || (options && options[0] && options[0].label))}
        />
      </Popover>
    </>);
};

export default SelectSku;
