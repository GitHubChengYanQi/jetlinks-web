/**
 * sku表编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {skuDetail, skuAdd, skuEdit} from '../skuUrl';
import * as SysField from '../skuField';
import {Divider} from 'antd';

const {FormItem} = Form;

const ApiConfig = {
  view: skuDetail,
  add: skuAdd,
  save: skuEdit
};


const SkuEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="skuId"
      >
        <FormItem label="物料分类" name='spuId' component={SysField.SpuId} required />
        <FormItem label="型号" name='skuName' component={SysField.SkuName} required />
        <FormItem label="执行标准" name='standard' component={SysField.SkuName} required />
        <FormItem label="规格" name='specifications' component={SysField.SkuName} disabled={props.value} required />
      </Form>
    </div>
  );
};

export default SkuEdit;
