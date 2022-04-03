import {Button, Select, Spin} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {useRequest} from '@/util/Request';
import {skuDetail, skuList} from '@/pages/Erp/sku/skuUrl';
import Modal from '@/components/Modal';
import SkuEdit from '@/pages/Erp/sku/skuEdit';


const SelectSku = (
  {
    value,
    onChange,
    dropdownMatchSelectWidth,
    placeholder,
    getSkuDetail = () => {
    },
    params,
    skuIds,
    noAdd,
    spuClassId,
    ids,
    spu
  }) => {

  const formRef = useRef();
  const ref = useRef();

  const [change, setChange] = useState();

  const [addLoading, setAddLoading] = useState();

  const object = (items) => {
    return {
      disabled: skuIds && skuIds.filter((value) => {
        return value === items.skuId;
      }).length > 0,
      label: items.spuResult && `${items.spuResult.name} / ${items.skuName} ${items.specifications ? `/ ${items.specifications}` : ''}`,
      value: items.skuId,
      spu: items.spuResult,
      standard: items.standard
    };
  };

  const {loading, data, run} = useRequest({...skuList, data: {skuIds: ids, ...params}}, {
    debounceInterval: 300,
  });

  const getSkuList = (data) => {
    run({
      data: {
        skuIds: ids, spuClass: spuClassId, ...data
      }
    });
  };

  const {run: detail} = useRequest(skuDetail, {
    manual: true, onSuccess: (res) => {
      onChange(spu ? res.spuId : res.skuId);
      getSkuDetail(res);
      setChange(object(res).label);
    }
  });

  useEffect(() => {
    if (value) {
      detail({
        data: {
          skuId: value
        }
      });
    } else {
      setChange(null);
    }
  }, [value]);

  useEffect(() => {
    getSkuList();
  }, [spuClassId]);


  const options = !loading ? data && data.map((items) => {
    return object(items);
  }) : [];

  return (<>
    <Select
      style={{width: 200}}
      placeholder={placeholder || '搜索物料'}
      showSearch
      allowClear
      onClear={() => {
        onChange(null);
      }}
      value={value && change}
      notFoundContent={loading && <div style={{textAlign: 'center', padding: 16}}><Spin/></div>}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth || 400}
      onSearch={(value) => {
        setChange(value);
        getSkuList({skuName: value,});
      }}
      onChange={(value, option) => {
        if (value === 'add') {
          ref.current.open(false);
          return;
        }
        setChange(value && value.replace(`standard:${option.standard}`, ''));
        if (option) {
          if (option && option.key) {
            onChange(spu ? option.spu.spuId : option.key);
          }
        } else {
          onChange(null);
          getSkuList();
        }

      }}>
      {!noAdd && <Select.Option
        key="add"
        title="新增物料"
        value="add"
      >
        <a>
          新增物料
        </a>
      </Select.Option>}
      {options && options.map((items) => {
        return (<Select.Option
          key={items.value}
          spu={items.spu}
          disabled={items.disabled}
          title={items.label}
          standard={items.standard}
          value={`${items.label}standard:${items.standard}`}
        >
          {items.label}
        </Select.Option>);
      })}
    </Select>


    <Modal
      title="物料"
      compoentRef={formRef}
      loading={setAddLoading}
      component={SkuEdit}
      onSuccess={(res) => {
        onChange(res);
        ref.current.close();
      }}
      ref={ref}
      footer={<>
        <Button
          loading={addLoading}
          type="primary"
          onClick={() => {
            formRef.current.nextAdd(false);
          }}
        >完成</Button>
      </>}/>

  </>);
};

export default SelectSku;
