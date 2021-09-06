/**
 * 公司角色表编辑页
 *
 * @author
 * @Date 2021-09-06 11:29:56
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {companyRoleDetail, companyRoleAdd, companyRoleEdit} from '../companyRoleUrl';
import * as SysField from '../companyRoleField';

const {FormItem} = Form;

const ApiConfig = {
  view: companyRoleDetail,
  add: companyRoleAdd,
  save: companyRoleEdit
};

const CompanyRoleEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="companyRoleId"
      res={(res)=>{
        props.position(res);
      }}
    >
      <FormItem label="职位" name="position" component={SysField.Position} required/>
    </Form>
  );
};

export default CompanyRoleEdit;
