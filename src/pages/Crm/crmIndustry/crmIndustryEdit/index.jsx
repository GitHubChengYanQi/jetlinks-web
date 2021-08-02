/**
 * 行业表编辑页
 *
 * @author
 * @Date 2021-08-02 08:25:03
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {crmIndustryDetail, crmIndustryAdd, crmIndustryEdit} from '../crmIndustryUrl';
import * as SysField from '../crmIndustryField';

const {FormItem} = Form;

const ApiConfig = {
  view: crmIndustryDetail,
  add: crmIndustryAdd,
  save: crmIndustryEdit
};

const CrmIndustryEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="industryId"
    >
      <FormItem label="行业名称" name="industryName" component={SysField.IndustryName} required/>
      <FormItem label="上级" name="parentId" component={SysField.ParentId} />
    </Form>
  );
};

export default CrmIndustryEdit;
