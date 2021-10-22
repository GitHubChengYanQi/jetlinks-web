import React, {useEffect, useState} from 'react';
import {Radio} from 'antd';




const Attribute = ({categoryRequests, onChange, attributes}) => {

  const [array,setArray] = useState(attributes || []);

  return (
    <div style={{padding: 16}}>
      {
        categoryRequests && categoryRequests.map((items, index) => {
          const arr = array.filter((value)=>{
            return value.attribute.attributeId === items.attribute.attributeId;
          });

          return (
            <div key={index}>
              {items.attribute.attribute}
              &nbsp;&nbsp;
              <Radio.Group key={index} defaultValue={arr && arr[0] && arr[0].values && arr[0].values.attributeValuesId} onChange={(value) => {
                const arr = array.filter((value)=>{
                  return value.attribute.attributeId !== items.attribute.attributeId;
                });

                const arrValues = items.value.filter((values)=>{
                  return values.attributeValuesId === value.target.value;
                });

                const attributes = {
                  ...items.attribute,
                  attributeId:`${items.attribute.attributeId}`
                };

                const attributeValues = {
                  ...arrValues[0],
                  attributeValuesId:`${arrValues[0].attributeValuesId}`
                };

                onChange([...arr,{attribute:attributes,values:attributeValues}]);
                setArray([...arr,{attribute:attributes,values:attributeValues}]);
              }}>
                {
                  items.value.map((items, index) => {
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
