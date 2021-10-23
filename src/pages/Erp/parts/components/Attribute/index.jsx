import React, {useEffect, useState} from 'react';
import {Radio} from 'antd';




const Attribute = ({attribute, onChange, attributes}) => {

  const [array,setArray] = useState(attributes || []);

  return (
    <div style={{padding: 16}}>
      {
        attribute && attribute.map((items, index) => {
          const arr = array.filter((value)=>{
            return value.attribute.attributeId === items.attributeId;
          });

          return (
            <div key={index}>
              {items.attribute}
              &nbsp;&nbsp;
              <Radio.Group key={index} defaultValue={arr && arr[0] && arr[0].values && arr[0].values.attributeValuesId} onChange={(value) => {
                const arr = array.filter((value)=>{
                  return value.attribute.attributeId !== items.attributeId;
                });

                const arrValues = items.attributeValues.filter((values)=>{
                  return values.attributeValuesId === value.target.value;
                });

                const attributes = {
                  attribute:items.attribute,
                  attributeId:items.attributeId
                };


                onChange([...arr,{attribute:attributes,values:arrValues[0]}]);
                setArray([...arr,{attribute:attributes,values:arrValues[0]}]);
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
