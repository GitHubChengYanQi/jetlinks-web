import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Divider, Input, Radio, Table} from 'antd';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import model from '../../../../../../.ice/auth/model';
import {skuDetail, skuList} from '@/pages/Erp/sku/skuUrl';

const {Column} = Table;


const Attribute = ({attribute, spuId, ...props}) => {
  const {onChange} = props;

  const [array, setArray] = useState([]);

  const [model, setModel] = useState([]);

  const [state, setState] = useState([]);

  const {run} = useRequest(spuDetail, {
    manual: true,
    onSuccess: (res) => {
      if (res.attribute) {
        const attribute = JSON.parse(res.attribute);
        if (attribute) {
          setArray(attribute);
        }
      }
    }
  });

  const {run:sku} = useRequest(skuList, {
    manual: true,
    onSuccess: (res) => {
      const model = res.map((items)=>{
        return items.skuName;
      });
      const state = res.map((items)=>{
        return items.isBan;
      });
      setModel(model);
      setState(state);
    }
  });

  useEffect(() => {
    if (spuId) {
      run({
        data: {
          spuId
        }
      });

      sku({
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

    if (arr.length > 0){
      if (arr.length < 2) {
        const value = arr[0].map((items,index)=>{
          return {
            key:index,
            attributeValues:[items],
            skuName:model[index],
            isBan:state[index],
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
          skuName:model[index],
          isBan:state[index],
        };
      });


      onChange({spuRequests: values, values:value});
      return value;
    }else {
      return [];
    }


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
                  return record.attributeValues && record.attributeValues[index].attributeValues;
                }}
              />
            );
          })}
          <Column title="型号" dataIndex='skuName' width={200} render={(value, record, index) => {
            return (
              <Input placeholder="输入型号" value={value} onChange={(value) => {
                model[index] = value.target.value;
                setModel([...model]);
              }} />
            );
          }} />
          <Column title="操作" dataIndex='isBan' render={(value, record, index) => {
            return (
              <Radio.Group value={value || '0'} onChange={(value) => {
                state[index] = value.target.value;
                setState([...state]);
              }}>
                <Radio value='0'>启用</Radio>
                <Radio value='1'>禁用</Radio>
              </Radio.Group>
            );
          }} />


        </Table>
      </div>
    </>
  );

};

export default Attribute;
