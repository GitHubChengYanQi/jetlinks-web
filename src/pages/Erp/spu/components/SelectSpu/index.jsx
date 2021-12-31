import {useRequest} from '@/util/Request';
import {spuListSelect} from '@/pages/Erp/productOrder/productOrderUrl';
import React, {useEffect, useState} from 'react';
import {Popover, Radio, Select as AntdSelect, Space} from 'antd';
import Select from '@/components/Select';
import {skuListSelect, spuClassificationListSelect} from '@/pages/Erp/spu/spuUrl';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';


const SelectSpu = ({onChange, ...props}) => {

  const {data, run} = useRequest(spuListSelect);

  const {run:sku} = useRequest(skuDetail,{manual:true});

  const [spuClass, setSpuClass] = useState();
  const [spuType, setSpuType] = useState();
  const [skuId, setSkuId] = useState();

  useEffect(() => {
    run({
      data: {
        spuClassificationId: spuClass,
        productionType: spuType,
      }
    });
  }, [spuClass, spuType]);

  const content = (
    <Space direction="vertical">
      <div>
        <div style={{display: 'inline-block',width:'auto'}}>
          sku&nbsp;&nbsp;型号(零件号)：
        </div>
        <div style={{display: 'inline-block', width: '87%'}}>
          <Select api={skuListSelect} width="100%" value={skuId} onChange={async (value) => {
            const data = await sku({
              data:{
                skuId:value,
              }
            });
            setSkuId(value);
            onChange(data && data.spuId);
          }} />
        </div>
      </div>
      <div>
        生产类型：
        <Radio.Group onChange={(value) => {
          setSpuType(value.target.value);
        }}>
          <Radio value={0}>自制件</Radio>
          <Radio value={1}>委派件</Radio>
          <Radio value={2}>外购件</Radio>
        </Radio.Group>
      </div>
      <Space>
        <div>
          商品分类：
          <Select api={spuClassificationListSelect} width={200} value={spuClass} onChange={(value) => {
            setSpuClass(value);
          }} />
        </div>
        <div>
          选择商品：
          <AntdSelect
            options={data || []}
            style={{width: 200}}
            {...props}
            allowClear
            showSearch
            filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => {
              onChange(value);
            }} />
        </div>
      </Space>
    </Space>
  );

  return (<Popover placement="bottomLeft" content={content} trigger="click">
    <AntdSelect
      options={data || []}
      open={false}
      style={{width: 180}}
      {...props} />
  </Popover>);
};

export default SelectSpu;
