/**
 * 售后动态表编辑页
 *
 * @author 
 * @Date 2021-08-24 08:51:32
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {repairDynamicDetail, repairDynamicAdd, repairDynamicEdit} from '../repairDynamicUrl';
import * as SysField from '../repairDynamicField';

const {FormItem} = Form;

const ApiConfig = {
  view: repairDynamicDetail,
  add: repairDynamicAdd,
  save: repairDynamicEdit
};

const RepairDynamicEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="dynamicId"
    >
      <FormItem label="出厂编号id" name="stockItemId" component={SysField.StockItemId} required/>
      <FormItem label="内容" name="content" component={SysField.Content} required/>
    </Form>
  );
};

export default RepairDynamicEdit;
