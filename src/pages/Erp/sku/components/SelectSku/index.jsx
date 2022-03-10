import {Button, Select, Spin} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {useRequest} from '@/util/Request';
import {skuDetail, skuList} from '@/pages/Erp/sku/skuUrl';
import store from '@/store';
import Modal from '@/components/Modal';
import SkuEdit from '@/pages/Erp/sku/skuEdit';


const SelectSku = ({
  value,
  onChange,
  width,
  dropdownMatchSelectWidth,
  placeholder,
  params,
  skuIds,
  noAdd,
  disabled,
  spuClassId,
  ids,
  spu
}) => {

  const [state] = store.useModel('dataSource');

  const formRef = useRef();
  const ref = useRef();

  const [change, setChange] = useState();

  const [visible, setVisible] = useState();

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

  const {run: detail} = useRequest(skuDetail, {
    manual: true, onSuccess: (res) => {
      onChange(spu ? res.spuId : res.skuId);
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
    run({
      data: {
        skuIds: ids,
        ...params,
        spuClass: spuClassId,
      }
    });
  }, [params, ids && ids.length, spuClassId]);


  const options = !loading ? data && data.map((items) => {
    return object(items);
  }) : [];

  return (
    <>
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
              skuName: value,
              ...params
            }
          });
        }}
        onChange={(value, option) => {
          if (value === 'add') {
            setVisible(false);
            ref.current.open(false);
            return;
          }
          setVisible(false);
          setChange(value && value.replace(`standard:${option.standard}`, ''));
          if (option) {
            if (option && option.key) {
              onChange(spu ? option.spu.spuId : option.key);
            }
          } else {
            onChange(null);
            run({
              data: {
                skuIds: ids,
                ...params
              }
            });
          }

        }}>
        {!noAdd && <Select.Option
          key="add"
          title="新增物料"
          value="add">
          <a>
            新增物料
          </a>
        </Select.Option>}
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
      </Select>;


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
        </>} />

    </>);
};

export default SelectSku;
