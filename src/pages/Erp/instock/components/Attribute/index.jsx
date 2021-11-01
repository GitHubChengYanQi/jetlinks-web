import React, {useEffect, useImperativeHandle, useState} from 'react';
import {Radio} from 'antd';


const Attribute = ({sku, onChange, attributes}, ref) => {

  const [array, setArray] = useState(attributes || []);

  const attValue = array.map((items) => {
    return items.values.id;
  });

  const atts = sku && sku.tree && sku.tree.map((items) => {
    return `s${items.k_s}`;
  });

  const skuIds = sku && sku.list && sku.list.filter((values) => {
    let skuId = false;
    for (let i = 0; i < atts.length; i++) {
      if (values[atts[i]] === attValue[i]) {
        skuId = true;
      } else {
        skuId = false;
        break;
      }
    }
    return skuId;
  });


  const onchange = () => {
    if (skuIds && skuIds.length === 1) {
      typeof onChange === 'function' && onChange(skuIds[0].id);
    }
  };

  useImperativeHandle(ref, () => (
    {
      onchange,
    }
  ));


  return (
    <div style={{padding: 16}}>
      {
        sku && sku.tree && sku.tree.map((items, index) => {
          const arr = array.filter((value) => {
            return value.attribute.k_s === items.k_s;
          });

          return (
            <div key={index}>
              {items.k}
              &nbsp;&nbsp;
              <Radio.Group
                key={index}
                defaultValue={arr && arr[0] && arr[0].values && arr[0].values.id}
                onChange={(value) => {

                  const arrs = [];

                  array.map((items, index) => {
                    return arrs[index] = items;
                  });

                  const arrValues = items.v.filter((values) => {
                    return values.id === value.target.value;
                  });

                  const attributes = {
                    k: items.k,
                    k_s: items.k_s,
                  };

                  arrs[index] = {attribute: attributes, values: arrValues[0]};
                  setArray(arrs);
                }}>
                {
                  items.v.map((items, index) => {
                    return (
                      <Radio value={items.id} key={index}>{items.name}</Radio>
                    );
                  })
                }
              </Radio.Group>
            </div>
          );
        })
      }
    </div>
  );
};

export default React.forwardRef(Attribute);
