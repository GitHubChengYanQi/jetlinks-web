import React, {useState} from 'react';
import {Button, Checkbox, Divider, Table} from 'antd';

const {Column} = Table;


const Attribute = ({attribute, ...props}) => {

  const {onChange} = props;

  const [array, setArray] = useState([]);

  const dataSource = [];
  const title = [];
  array.map((items) => {
    if (items.attributeValuesParams.length > 0) {
      dataSource.push(items.attributeValuesParams);
      title.push(items.attribute);
      return null;
    } else {
      return null;
    }
  });

  const attributes = (arr) => {

    const spuRequest = array.map((items) => {
      return {
        attributeId: items.attribute.attributeId,
        attributeValuesParams: items.attributeValuesParams
      };
    });

    if (arr.length < 2) {
      onChange({spuRequests: spuRequest, values: arr[0]});
      return arr[0] || [];
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
    onChange({spuRequests: spuRequest, values: res});
    return res;
  };


  return (
    <>
      <Divider orientation="center">配置属性</Divider>
      {attribute && attribute.map((items, index) => {
        const values = items.value && items.value.map((items) => {
          return {
            label: items.attributeValues,
            value: items.attributeValuesId,
          };
        });
        return (
          <div key={index}>
            <Button type="text" value={items.attribute.attribute}>
              {items.attribute.attribute}
            </Button>
            <Checkbox.Group options={values} defaultValue={[]} onChange={(checkedValue) => {
              const arr = array.filter((value) => {
                return value.attribute.attributeId !== items.attribute.attributeId;
              });

              const attributeValues = checkedValue.map((item, index) => {
                const values = items.value.filter((value) => {
                  return value.attributeValuesId === item;
                });
                return values[0];
              });

              setArray([...arr, {attribute: items.attribute, attributeValuesParams: attributeValues}]);
            }} />
          </div>
        );
      })}
      <Divider orientation="center">属性列表</Divider>

      <div style={{overflow: 'auto'}}>
        <Table
          pagination={false}
          dataSource={attributes(dataSource)}
        >
          {title && title.map((items, index) => {
            return (
              <Column
                key={index}
                title={items && items.attribute}
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
