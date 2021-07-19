/**
 * 来源表编辑页
 *
 * @author 
 * @Date 2021-07-19 17:59:08
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {sourceDetail, sourceAdd, sourceEdit} from '../sourceUrl';
import * as SysField from '../sourceField';

const {FormItem} = Form;

const ApiConfig = {
  view: sourceDetail,
  add: sourceAdd,
  save: sourceEdit
};

const SourceEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="sourceId"
    >
      <FormItem label="来源名称" name="name" component={SysField.Name} required/>
    </Form>
  );
};

export default SourceEdit;
