import React, {useState} from 'react';
import {Button, Checkbox, Divider, Spin, Table} from 'antd';

const {Column} = Table;

const array = [];

const Attribute = ({attribute, ...props}) => {

  const {onChange} = props;

  const atts = [];
  attribute && attribute.map((items, index) => {
    if (array[index] && array[index].length > 0) {
      return atts.push(items);
    } else {
      return null;
    }
  });


  const [value, setValue] = useState();

  const attributes = (array) => {

    const arrays = [];

    array.map((items, index) => {
      if (items) {
        return arrays.push(items);
      } else {
        return null;
      }
    });

    const Attriute = arrays && arrays.map((items, index) => {
      return {
        attributeId: atts[index] && atts[index].attribute && atts[index].attribute.attributeId,
        attributeValuesParams: items,
      };
    });


    if (arrays.length < 2) {
      onChange({spuRequests: Attriute, values: arrays[0]});
      return arrays[0] || [];
    }

    const res = arrays.reduce((total, currentValue) => {
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

    onChange({spuRequests: Attriute, values: res});
    return res;
  };

  const dataSource = attributes(value || []);

  return (
    <>
      <Divider orientation="center">配置属性</Divider>
      {attribute && attribute.map((items, index) => {
        const values = items.value && items.value.map((items, index) => {
          return {
            label: items.attributeValues,
            value: items,
          };
        });
        return (
          <div key={index}>
            <Button type="text" value={items.attribute.attribute}>
              {items.attribute.attribute}
            </Button>
            <Checkbox.Group options={values} onChange={(checkedValue) => {
              array[index] = checkedValue.length > 0 ? checkedValue : null;
              array.map((items, index) => {
                if (items) {
                  return array[index] = items;
                } else {
                  return null;
                }
              });
              setValue([...array]);
            }} />
          </div>
        );
      })}
      <Divider orientation="center">属性列表</Divider>

      <div style={{overflow: 'auto'}}>
        <Table
          pagination={false}
          dataSource={dataSource || []}
        >
          {atts && atts.map((items, index) => {
            return (
              <Column
                key={index}
                title={items.attribute && items.attribute.attribute}
                render={(value, record) => {
                  return record instanceof Array ? record[index].attributeValues : record.attributeValues;
                }}
              />
            );
          })}
        </Table>
      </div>
    </>
  );

};

export default Attribute;
