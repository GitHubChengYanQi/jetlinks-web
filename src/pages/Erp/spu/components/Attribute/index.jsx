import React, {useState} from 'react';
import {Button, Checkbox} from 'antd';


const Attribute = ({spuAttribute,attribute, spuId, ...props}) => {
  const {onChange} = props;

  const [array, setArray] = useState(spuAttribute || []);

  const dataSource = [];
  const title = [];
  const values = [];

  array.map((items) => {
    if (items.attributeValues.length > 0) {
      values.push(items);
      dataSource.push(items.attributeValues);
      title.push(items);
      return null;
    } else {
      return null;
    }
  });



  const attributes = (arr) => {

    if (arr.length > 0){
      if (arr.length < 2) {
        const value = arr[0].map((items,index)=>{
          return {
            key:index,
            attributeValues:[items],
          };
        });
        onChange({spuRequests: values, values:value});
        return value || [];
      }

      const res = arr.reduce((total, currentValue) => {
        const res = [];
        if (total instanceof Array) {
          total.forEach((t) => {
            if (currentValue) {
              currentValue.forEach((cv) => {
                if (t instanceof Array) {
                  res.push([...t, cv]);
                } else {
                  res.push([t, cv]);
                }
              });
            }
          });
        }

        return res;
      });

      const value = res.map((items,index)=>{
        return {
          key:index,
          attributeValues:items,
        };
      });


      onChange({spuRequests: values, values:value});
      return value;
    }else {
      return [];
    }


  };

  if (dataSource){
    attributes(dataSource);
  }


  return (
    <>
      {attribute && attribute.map((items, index) => {

        const values = items.value && items.value.map((items) => {
          return {
            label: items.attributeValues,
            value: items.attributeValuesId,
          };
        });

        const defaultValues = array.filter((value) => {
          return value.attributeId === items.attribute.attributeId;
        });

        const defaultValue = defaultValues && defaultValues[0] && defaultValues[0].attributeValues.map((items, index) => {
          return items.attributeValuesId;
        });

        return (
          <div key={index}>
            <Button type="text" value={items.attribute.attribute}>
              {items.attribute.attribute}
            </Button>
            <Checkbox.Group options={values} value={defaultValue} onChange={(checkedValue) => {

              const attributeValue = checkedValue.map((item, index) => {
                const values = items.value.filter((value) => {
                  return value.attributeValuesId === item;
                });
                return {
                  attributeId:items.attribute.attributeId,
                  attributeValues: values[0].attributeValues,
                  attributeValuesId: `${values[0].attributeValuesId}`,
                };
              });

              const arrs = [];

              array.map((items, index) => {
                return arrs[index] = items;
              });

              arrs[index] = {
                attribute: items.attribute.attribute,
                id: items.attribute.attributeId,
                attributeId: `${items.attribute.attributeId}`,
                attributeValues: attributeValue
              };

              setArray(arrs);
            }} />
          </div>
        );
      })}
    </>
  );

};

export default Attribute;
