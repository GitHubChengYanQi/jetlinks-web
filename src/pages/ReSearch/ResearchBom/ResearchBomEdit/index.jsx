import React, {useRef} from 'react';
import Form from '@/components/Form';
import * as SysField from '../ResearchField';
import {partsAdd, partsDetail, partsEdit} from '@/pages/Erp/parts/PartsUrl';
import {Input} from 'antd';

const {FormItem} = Form;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};


const ResearchBomEdit = (props) => {

  const formRef = useRef();


  return (
    <>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        labelCol={10}
        fieldKey="repairId"
      >
        <FormItem label="清单名称" name="partName" component={SysField.PartName} required />
        <FormItem label="设计主体" name="skuId" component={SysField.SkuId} required />
        <FormItem label="版本号" name="name" component={SysField.Name} required />
      </Form>
    </>
  );
};

export default ResearchBomEdit;
