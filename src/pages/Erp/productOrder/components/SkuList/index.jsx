import React from 'react';
import {Radio} from 'antd';


const SkuList = (props) => {

  const {value,onChange} = props;

  return (
    <>
      <Radio.Group onChange={(value)=>{
        onChange(value);
      }}>
        {
          value && value.map((items, index) => {
            return (
              <Radio value={items.skuId} key={index}>{items.skuName}</Radio>
            );
          })
        }
      </Radio.Group>
    </>
  );
};

export default SkuList;
