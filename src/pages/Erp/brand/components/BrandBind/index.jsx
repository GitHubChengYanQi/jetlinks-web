import React, {useEffect, useState} from 'react';
import {Select} from 'antd';
import {useRequest} from '@/util/Request';
import {supplyBind} from '@/pages/Crm/supply/supplyUrl';

const BrandBind = ({
  value:defaultValue,
  onChange,
  skuId,
}) => {

  const {loading, data, run} = useRequest(supplyBind, {manual: true});

  const [value,setValue] = useState();

  useEffect(() => {
    if (skuId) {
      run({
        data: {
          skuId
        }
      });
    }
  }, [skuId]);

  const options = (loading || !data) ? [] : data.map((item) => {
    const name = item.brandResult ? item.brandResult.brandName : '无';
    return {
      label: name,
      value: name,
      id: item.brandId
    };
  });

  return (<Select
    options={[{label:'无指定品牌',value:0},...options]}
    showSearch
    style={{width: 200}}
    value={value}
    onChange={(value, option)=>{
      setValue(value);
      onChange(option.id);
    }}
    onSearch={(value) => {
      run({
        data: {
          skuId,
          nameSource: '品牌',
          name: value,
        }
      });
    }}
  />);
};

export default BrandBind;
