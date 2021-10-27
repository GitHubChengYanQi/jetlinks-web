/**
 * SPU分类编辑页
 *
 * @author song
 * @Date 2021-10-25 17:52:03
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {spuClassificationDetail, spuClassificationAdd, spuClassificationEdit} from '../spuClassificationUrl';
import * as SysField from '../spuClassificationField';

const {FormItem} = Form;

const ApiConfig = {
  view: spuClassificationDetail,
  add: spuClassificationAdd,
  save: spuClassificationEdit
};

const SpuClassificationEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="spuClassificationId"
    >
      <FormItem label="名称" name="name" component={SysField.Name} required/>
    </Form>
  );
};

export default SpuClassificationEdit;
