import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Divider, Table} from 'antd';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

const {Column} = Table;


const Attribute = ({attribute, spuId, ...props}) => {
  const {onChange} = props;

  const [array, setArray] = useState([]);

  const {run} = useRequest(spuDetail, {
    manual: true,
    onSuccess: (res) => {
      if (res.attribute) {
        const attribute = JSON.parse(res.attribute);
        if (attribute) {

          const defaultValue = attribute.map((items) => {
            return items.attributeValues;
          });
          setArray(attribute);
        }
      }
    }
  });

  useEffect(() => {
    if (spuId) {
      run({
        data: {
          spuId
        }
      });
    }
  }, []);

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

    if (arr.length < 2) {
      onChange({spuRequests: values, values: arr[0]});
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
    onChange({spuRequests: values, values: res});
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

        const defaultValues = array.filter((value)=>{
          return value.attributeId === items.attribute.attributeId;
        });

        const defaultValue = defaultValues && defaultValues[0] && defaultValues[0].attributeValues.map((items,index)=>{
          return items.attributeValuesId;
        });

        return (
          <div key={index}>
            <Button type="text" value={items.attribute.attribute}>
              {items.attribute.attribute}
            </Button>
            <Checkbox.Group options={values} value={defaultValue} onChange={(checkedValue) => {
              const arr = array.filter((value) => {
                return value.attributeId !== items.attribute.attributeId;
              });

              const attributeValue = checkedValue.map((item, index) => {
                const values = items.value.filter((value) => {
                  return value.attributeValuesId === item;
                });
                return {
                  attributeValues: values[0].attributeValues,
                  attributeValuesId: `${values[0].attributeValuesId}`,
                };
              });


              setArray([...arr, {
                attribute: items.attribute.attribute,
                attributeId: `${items.attribute.attributeId}`,
                attributeValues: attributeValue
              }]);
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
