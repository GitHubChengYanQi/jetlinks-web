/**
 * 采购配置表编辑页
 *
 * @author
 * @Date 2021-12-21 13:39:47
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {purchaseConfigDetail, purchaseConfigAdd, purchaseConfigEdit} from '../purchaseConfigUrl';
import * as SysField from '../purchaseConfigField';
import {FormEffectHooks, FormPath} from '@formily/antd';
import {request} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: purchaseConfigDetail,
  add: purchaseConfigAdd,
  save: purchaseConfigEdit
};

const PurchaseConfigEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="purchaseConfigId"
      effects={({setFieldState}) => {

        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {
          setFieldState(
            'value',
            state => {
              state.props.type = value;
              state.visible = value;
            }
          );

        });
      }}
    >
      <FormItem label="类型" name="type" component={SysField.Type} required/>
      <FormItem label="值" name="value" visible={false} component={SysField.Value} required/>
    </Form>
  );
};

export default PurchaseConfigEdit;
