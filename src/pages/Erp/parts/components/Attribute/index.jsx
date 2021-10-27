import React, {useEffect, useState} from 'react';
import {Radio} from 'antd';


const Attribute = ({attribute, onChange, attributes}) => {

  const [array, setArray] = useState(attributes || []);

  return (
    <div style={{padding: 16}}>
      {
        attribute && attribute.map((items, index) => {
          const arr = array.filter((value) => {
            return value.attribute.attributeId === items.attributeId;
          });

          return (
            <div key={index}>
              {items.attribute}
              &nbsp;&nbsp;
              <Radio.Group
                key={index}
                defaultValue={arr && arr[0] && arr[0].values && arr[0].values.attributeValuesId}
                onChange={(value) => {

                  const arrs = [];

                  array.map((items, index) => {
                    return arrs[index] = items;
                  });

                  const arrValues = items.attributeValues.filter((values) => {
                    return values.attributeValuesId === value.target.value;
                  });

                  const attributes = {
                    attribute: items.attribute,
                    attributeId: items.attributeId
                  };

                  // if (arrs[index]) {
                  //   if (arrs[index].attributeId === items.attribute.attributeId) {
                  //     arrs[index] = {attribute:attributes,values:arrValues[0]};
                  //   }
                  // } else {
                  arrs[index] = {attribute: attributes, values: arrValues[0]};
                  // }


                  onChange(arrs);
                  setArray(arrs);
                }}>
                {
                  items.attributeValues.map((items, index) => {
                    return (
                      <Radio value={items.attributeValuesId} key={index}>{items.attributeValues}</Radio>
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
