import {useRequest} from '@/util/Request';
import {spuListSelect} from '@/pages/Erp/productOrder/productOrderUrl';
import React, {useEffect, useState} from 'react';
import {Popover, Radio, Select as AntdSelect, Space} from 'antd';
import Select from '@/components/Select';
import {spuClassificationListSelect} from '@/pages/Erp/spu/spuUrl';


const SelectSpu = ({onChange,select,...props}) => {

  const {data, run} = useRequest(spuListSelect);

  const [spuClass, setSpuClass] = useState();
  const [spuType, setSpuType] = useState();

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
              typeof select === 'function' && select(value);
            }} />
        </div>
      </Space>
    </Space>
  );

  useEffect(() => {
    if (props.value) {
      onChange(props.value);
    }
  }, []);

  return (<Popover placement="bottomLeft" content={content} trigger="click">
    <AntdSelect
      options={data || []}
      open={false}
      style={{width: 200}}
      {...props} />
  </Popover>);
};

export default SelectSpu;
