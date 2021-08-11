/**
 * 单位表编辑页
 *
 * @author cheng
 * @Date 2021-08-11 15:37:57
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {unitDetail, unitAdd, unitEdit} from '../unitUrl';
import * as SysField from '../unitField';

const {FormItem} = Form;

const ApiConfig = {
  view: unitDetail,
  add: unitAdd,
  save: unitEdit
};

const UnitEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="unitId"
    >
      <FormItem label="单位名称" name="unitName" component={SysField.UnitName} required/>
    </Form>
  );
};

export default UnitEdit;
