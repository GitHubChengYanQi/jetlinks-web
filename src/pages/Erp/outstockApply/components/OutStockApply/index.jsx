import Form from '@/components/Form';
import * as SysField from '@/pages/Erp/outstockApply/outstockApplyField';
import {Button, Card} from 'antd';
import React, {useRef} from 'react';
import {itemsAdd, itemsDetail, itemsEdit} from '@/pages/Erp/items/ItemsUrl';
import {
  OutBound,
  outstockApplyAdd,
  outstockApplyDetail,
  outstockApplyEdit
} from '@/pages/Erp/outstockApply/outstockApplyUrl';
import {Type} from '@/pages/Erp/outstockApply/outstockApplyField';

const ApiConfig = {
  view: outstockApplyDetail,
  add: OutBound,
  save: OutBound
};


const OutStockApply = (props) => {

  const formRef = useRef();

  return (
    <Card title="一键发货">
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="outstockApplyId"
        onSuccess={(result) => {
          // if (result.data !== '') {
          //   setResult(result.data);
          // }
          // next();
        }}
      >
        <Form.FormItem label="仓库" component={SysField.StoreHouse} name="stockId" required />
        <Form.FormItem label="物流方式" component={SysField.Type} name="type" required />
        <div style={{display:'none'}}>
          <Form.FormItem label="负责人" component={SysField.Type} name="userId" required />
          <Form.FormItem label="客户" component={SysField.Type} name="customerId" required />
          <Form.FormItem label="地址" component={SysField.Type} name="adressId" required />
          <Form.FormItem label="联系人" component={SysField.Type} name="contactsId" required />
          <Form.FormItem label="电话" component={SysField.Type} name="phoneId" required />
        </div>
      </Form>
    </Card>
  );
};

export default OutStockApply;
