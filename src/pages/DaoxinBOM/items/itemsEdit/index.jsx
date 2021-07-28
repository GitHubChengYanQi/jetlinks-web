/**
 * 物品表编辑页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef, useState} from 'react';
import {Button, Divider, Input, message, Select, Steps} from 'antd';
import Form from '@/components/Form';
import {itemsDetail, itemsAdd, itemsEdit} from '../itemsUrl';
import * as SysField from '../itemsField';
import FormIndex from '@/components/Form/client';



const {FormItem} = Form;

const ApiConfig = {
  view: itemsDetail,
  add: itemsAdd,
  save: itemsEdit
};

const ItemsEdit = ({...props}) => {

  const {Step} = Steps;

  const [result, setResult] = useState(props.value);
  console.log(result);

  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '必填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="itemId"
              success={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="物品名字" name="name" component={SysField.Name} required />
              <FormItem label="生产日期" name="productionTime" component={SysField.ProductionTime} required />
              <FormItem label="材质名称" name="materialId" component={SysField.MaterialId} required />
              <FormItem label="易损" name="vulnerability" component={SysField.Vulnerability} required />
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '选填项',
      content:
        <>

          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="itemId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <FormItem label="质保期" name="shelfLife" component={SysField.ShelfLife} />
              <FormItem label="物品库存" name="inventory" component={SysField.Inventory} />
              <FormItem label="重要程度" name="important" component={SysField.Important} />
              <FormItem label="物品重量" name="weight" component={SysField.Weight} />
              <FormItem label="成本" name="cost" component={SysField.Cost} />
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </FormIndex>
          </div>

        </>
    },
  ];


  const next = () => {
    setCurrent(current + 1);
  };


  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>


      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>

    </>
  );

};

export default ItemsEdit;
