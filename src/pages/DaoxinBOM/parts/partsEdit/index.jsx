/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {partsDetail, partsAdd, partsEdit} from '../partsUrl';
import * as SysField from '../partsField';

const {FormItem} = Form;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};

const PartsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="partsId"
    >
      <FormItem label="物品id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="品牌id" name="brandId" component={SysField.BrandId} required/>
      <FormItem label="零件数量" name="number" component={SysField.Number} required/>
    </Form>
  );
};

export default PartsEdit;
