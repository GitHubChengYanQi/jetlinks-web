/**
 * 商机表编辑页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Button, Steps, Modal} from 'antd';
import Form from '@/components/Form';
import FormIndex from '@/components/Form/FormIndex';
import {
  businessDetail,
  businessAdd,
  businessEdit, SalesIdListSelect,
} from '../BusinessUrl';
import * as SysField from '../BusinessField';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import {useRequest} from '@/util/Request';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import Modal2 from '@/components/Modal';
import TemplateEdit from '@/pages/Crm/template/TemplateEdit';

const {FormItem} = Form;

const ApiConfig = {
  view: businessDetail,
  add: businessAdd,
  save: businessEdit
};

const BusinessEdit = (props) => {

  const {onClose} = props;
  const [result, setResult] = useState(props.value);
  const ref = useRef(null);
  const formRef = useRef(null);

  return (
    <FormIndex
      {...props}
      value={result}
      ref={formRef}
      api={ApiConfig}
      fieldKey="businessId"
      success={(result) => {
        if (!props.value) {
          setResult(result.data);
          props.onChange(result);
        }else{
          props.onChange(result);
        }
      }}

    >
      <FormItem
        label="商机名称"
        name="businessName"
        rules={[{required: true, message: '请输入商机名称!'}]}
        component={SysField.BusinessNameListSelect}
        required />
      <FormItem
        label="负责人"
        name="person"
        rules={[{required: true, message: '请输入负责人!'}]}
        component={SysField.PersonListSelect}
        required />
      <FormItem
        label="客户名称"
        name="customerId"
        component={SysField.CustomerNameListSelect}
        rules={[{required: true, message: '请输入已存在的客户!'}]}
      />
      <FormItem
        label="销售流程" name="salesId"
        rules={[{required: true, message: '请输入销售流程!'}]}
        component={SysField.SalesIdListSelect} value={props.stage !== null ? props.stage : 1} />
      <FormItem
        label="商机阶段" name="stage"
        rules={[{required: true, message: '请输入商机阶段!'}]}
        component={SysField.StageListSelect13}  required />
      <FormItem label="立项日期" name="time" component={SysField.TimeListSelect2} />
      <div style={{textAlign: 'Right', marginRight: 90}}>
        <Button type="primary" htmlType="submit" onSubmit={()=>{}}  >
          完成创建
        </Button>
      </div>
    </FormIndex>
  );
};

export default BusinessEdit;
