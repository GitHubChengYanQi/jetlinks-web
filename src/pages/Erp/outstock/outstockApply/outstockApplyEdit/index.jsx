/**
 * 出库申请编辑页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {outstockApplyDetail, outstockApplyAdd, outstockApplyEdit} from '../outstockApplyUrl';
import * as SysField from '../outstockApplyField';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockApplyDetail,
  add: outstockApplyAdd,
  save: outstockApplyEdit
};

const OutstockApplyEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockApplyId"
    >
      <FormItem label="产品" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="品牌" name="brandId" component={SysField.BrandId} required/>
      <FormItem label="数量" name="number" component={SysField.Number} required/>
    </Form>
  );
};

export default OutstockApplyEdit;
