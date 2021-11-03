import React, {useEffect, useImperativeHandle, useState} from 'react';
import {Radio} from 'antd';


const Attribute = ({sku, onChange, value}) => {

  const [array, setArray] = useState(value || []);

  return (
    <div style={{padding: 16}}>
      {
        sku && sku.tree && sku.tree.map((items, index) => {

          return (
            <div key={index} style={{margin:8}}>
              {items.k}
              &nbsp;&nbsp;
              <Radio.Group
                key={index}
                // defaultValue={arr && arr[0] && arr[0].values && arr[0].values.id}
                onChange={(value) => {

                  const arrs = [];

                  array.map((items, index) => {
                    return arrs[index] = items;
                  });

                  const arrValues = items.v.filter((values) => {
                    return values.id === value.target.value;
                  });


                  arrs[index] = {attributeId: items.k_s, attributeValuesId: arrValues[0].id};
                  onChange(arrs);
                  setArray(arrs);
                }}>
                {
                  items.v.map((items, index) => {
                    return (
                      <Radio.Button value={items.id} key={index}>{items.name}</Radio.Button>
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

export default Attribute;
