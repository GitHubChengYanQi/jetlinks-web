/**
 * 竞争对手管理编辑页
 *
 * @author
 * @Date 2021-09-06 13:44:14
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {competitorDetail, competitorAdd, competitorEdit} from '../competitorUrl';
import * as SysField from '../competitorField';

const {FormItem} = Form;

const ApiConfig = {
  view: competitorDetail,
  add: competitorAdd,
  save: competitorEdit
};

const CompetitorEdit = ({...props}) => {

  const {businessId} = props;

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="competitorId"
    >
      <FormItem label="竞争对手企业名称" name="name" component={SysField.Name} required/>
      <FormItem label="竞争对手企业性质" name="nature" component={SysField.Nature} required/>
      <FormItem label="商机" disabled={businessId} name="businessId" component={SysField.BusinessId} businessId={businessId || null} required/>
    </Form>
  );
};

export default CompetitorEdit;
