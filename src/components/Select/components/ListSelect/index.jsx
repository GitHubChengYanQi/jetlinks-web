import React, {useState} from 'react';
import {Select, Spin} from 'antd';
import {request} from '@/util/Request';
import {skuList} from '@/pages/Erp/sku/skuUrl';

const ListSelect = () => {

  const [value, setValue] = useState([]);

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  return <Select
    value={value}
    placeholder="Select users"
    onChange={(newValue) => {
      setValue(newValue);
    }}
    style={{
      width: '100%',
    }}
    labelInValue
    showSearch
    filterOption={false}
    onSearch={(value)=>{
      setOptions([]);
      setFetching(true);
      request({...skuList, data: {skuName: value}}).then((res) => {
        const newOptions = res.map((item) => {
          return {
            label: item.skuName,
            value: item.skuId,
          };
        });
        setOptions(newOptions);
        setFetching(false);
      });
    }}
    notFoundContent={fetching ? <Spin size="small" /> : null}
    options={options}
  />;
};
export default ListSelect;
