import React, {useRef} from 'react';
import Form from '@/components/Form';

import {
  outBound,
  outstockOrderAdd,
  outstockOrderDetail,
  outstockOrderEdit
} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import * as SysField from '@/pages/Erp/outstock/outstockOrder/outstockOrderField';
import {Storhouse} from '@/pages/Erp/outstock/outstockOrder/outstockOrderField';
import {Card} from 'antd';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outBound
};


const OutStock = (props) => {

  const formRef = useRef();


  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockOrderId"
    >
      <FormItem
        label="选择仓库"
        name="storehouseId"
        component={SysField.Storhouse}
        required
      />
      <div style={{display: 'none'}}>
        <FormItem
          hidden
          name="state"
          component={SysField.State}
        />
      </div>
    </Form>
  );
};
export default OutStock;
