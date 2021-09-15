import React, {useRef} from 'react';
import Form from '@/components/Form';

import {
  outBound,
  outstockOrderAdd,
  outstockOrderDetail,
} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import * as SysField from '@/pages/Erp/outstock/outstockOrder/outstockOrderField';
import OutstockListingList from '@/pages/Erp/outstock/outstockListing/outstockListingList';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outBound
};


const OutStock = (props) => {

  const formRef = useRef();


  return (
    <div style={{paddingTop:20}}>
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
        <FormItem
          label="选择经手人"
          name="userId"
          component={SysField.UserId}
          required
        />
        <FormItem
          label="备注"
          name="note"
          component={SysField.Note}
          required
        />

        {/*<OutstockListingList outStockId={props.value || null} />*/}
        <div style={{display: 'none'}}>
          <FormItem
            hidden
            name="state"
            component={SysField.State}
          />
        </div>
      </Form>
    </div>

  );
};
export default OutStock;
