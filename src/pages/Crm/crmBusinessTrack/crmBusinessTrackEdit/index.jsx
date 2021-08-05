/**
 * 商机跟踪表编辑页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {useRef} from 'react';
import {Card, Input} from 'antd';
import Form from '@/components/Form';
import {crmBusinessTrackDetail, crmBusinessTrackAdd, crmBusinessTrackEdit} from '../crmBusinessTrackUrl';
import * as SysField from '../crmBusinessTrackField';

const {FormItem} = Form;

const ApiConfig = {
  view: crmBusinessTrackDetail,
  add: crmBusinessTrackAdd,
  save: crmBusinessTrackEdit
};

const CrmBusinessTrackEdit = ({...props}) => {

  const {val} = props;

  console.log(val);

  const formRef = useRef();

  return (
    <Card title="添加跟踪" bordered={false}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="trackId"
      >
        <FormItem label="备注" name="note" component={SysField.Note}/>
        <FormItem label="跟踪类型" name="type" component={SysField.Type}  />
        <FormItem label="商机" name="businessId" component={SysField.BusinessId} val={val.businessId}  />
        <FormItem label="负责人" name="userId" component={SysField.UserId} val={val.person} />
      </Form>
    </Card>
  );
};

export default CrmBusinessTrackEdit;
