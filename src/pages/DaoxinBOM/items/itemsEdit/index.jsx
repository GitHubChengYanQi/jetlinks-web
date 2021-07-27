/**
 * 物品表编辑页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef} from 'react';
import {Button, Divider, Input, message, Select, Steps} from 'antd';
import Form from '@/components/Form';
import {itemsDetail, itemsAdd, itemsEdit} from '../itemsUrl';
import * as SysField from '../itemsField';
import {Submit} from '@formily/antd';
import Forms from '@/components/Form/indexFrom';

const {Step} = Steps;

const {FormItem} = Form;

const ApiConfig = {
  view: itemsDetail,
  add: itemsAdd,
  save: itemsEdit
};

const ItemsEdit = ({...props}) => {

  const formRef = useRef();

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: '必填项',
      content:
        <div  style={{margin: '50px 150px'}}>
          <FormItem label="物品名字" name="name" component={SysField.Name} required />
          <FormItem label="生产日期" name="productionTime" component={SysField.ProductionTime} required />
          <FormItem label="材质名称" name="materialId" component={SysField.MaterialId} required />
          <FormItem label="易损" name="vulnerability" component={SysField.Vulnerability} required />
        </div>
      ,
    },
    {
      title: '选填项',
      content:
        <div  style={{margin: '50px 150px'}}>
          <FormItem label="质保期" name="shelfLife" component={SysField.ShelfLife}  />
          <FormItem label="物品库存" name="inventory" component={SysField.Inventory}  />
          <FormItem label="重要程度" name="important" component={SysField.Important}  />
          <FormItem label="物品重量" name="weight" component={SysField.Weight}  />
          <FormItem label="成本" name="cost" component={SysField.Cost}  />
        </div>,
    },
  ];


  return (
    <>
      <Forms
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="itemId"
        value={props.value}
      >

        <Steps current={current} >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Submit showLoading>保存</Submit>
          )}
          {current > 0 && (
            <Button style={{margin: '0 8px'}} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>


      </Forms>
    </>
  );
};

export default ItemsEdit;
