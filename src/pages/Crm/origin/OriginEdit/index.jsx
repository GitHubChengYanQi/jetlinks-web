/**
 * 来源表编辑页
 *
 * @author
 * @Date 2021-07-19 17:59:08
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {sourceDetail, sourceAdd, sourceEdit, originDetail, originAdd, originEdit} from '../OriginUrl';
import * as SysField from '../OriginField';

const {FormItem} = Form;

const ApiConfig = {
  view: originDetail,
  add: originAdd,
  save: originEdit
};

const OriginEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="originId"
    >
      <FormItem label="来源名称" name="name" component={SysField.Name} required/>
    </Form>
  );
};

export default OriginEdit;
