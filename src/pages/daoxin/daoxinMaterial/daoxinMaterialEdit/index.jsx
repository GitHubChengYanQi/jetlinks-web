/**
 * 材质编辑页
 *
 * @author 
 * @Date 2021-07-14 11:47:53
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {daoxinMaterialDetail, daoxinMaterialAdd, daoxinMaterialEdit} from '../daoxinMaterialUrl';
import * as SysField from '../daoxinMaterialField';

const {FormItem} = Form;

const ApiConfig = {
  view: daoxinMaterialDetail,
  add: daoxinMaterialAdd,
  save: daoxinMaterialEdit
};

const DaoxinMaterialEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="materialId"
    >
      <FormItem label="材质名字" name="name" component={SysField.Name} required/>
    </Form>
  );
};

export default DaoxinMaterialEdit;
