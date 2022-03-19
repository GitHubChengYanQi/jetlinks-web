/**
 * 公司角色表编辑页
 *
 * @author
 * @Date 2021-09-06 11:29:56
 */

import React, {useRef} from 'react';
import {createFormActions} from '@formily/antd';
import Form from '@/components/Form';
import {companyRoleDetail, companyRoleAdd, companyRoleEdit} from '../companyRoleUrl';
import * as SysField from '../companyRoleField';

const {FormItem} = Form;

const ApiConfig = {
  view: companyRoleDetail,
  add: companyRoleAdd,
  save: companyRoleEdit
};

const formActionsPublic = createFormActions();

const CompanyRoleEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      formActions={formActionsPublic}
      ref={formRef}
      api={ApiConfig}
      fieldKey="companyRoleId"
      onSuccess={(res)=>{
        if (props.position){
          props.position(res);
        }
        props.onSuccess();
      }}
    >
      <FormItem label="职位" name="position" component={SysField.Position} required/>
    </Form>
  );
};

export default CompanyRoleEdit;
