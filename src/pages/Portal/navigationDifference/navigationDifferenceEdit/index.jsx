/**
 * 导航分类编辑页
 *
 * @author 
 * @Date 2021-08-18 10:38:50
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {navigationDifferenceDetail, navigationDifferenceAdd, navigationDifferenceEdit} from '../navigationDifferenceUrl';
import * as SysField from '../navigationDifferenceField';

const {FormItem} = Form;

const ApiConfig = {
  view: navigationDifferenceDetail,
  add: navigationDifferenceAdd,
  save: navigationDifferenceEdit
};

const NavigationDifferenceEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="classificationId"
    >
      <FormItem label="分类id" name="difference" component={SysField.Difference} required/>
    </Form>
  );
};

export default NavigationDifferenceEdit;
