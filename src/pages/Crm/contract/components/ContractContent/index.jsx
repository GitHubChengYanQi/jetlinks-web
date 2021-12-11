import React, {useImperativeHandle, useRef} from 'react';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/contract/ContractField';
import {contractAdd, contractDetail, contractEdit} from '@/pages/Crm/contract/ContractUrl';

const ApiConfig = {
  view: contractDetail,
  add: contractAdd,
  save: contractEdit
};

const {FormItem} = Form;

const ContractContent = ({value,...props},ref) => {

  const formRef = useRef();

  useImperativeHandle(ref,()=>({
    formRef,
  }));

  return <>
    <Form
      {...props}
      value={value ? value.contractId : false}
      ref={formRef}
      api={ApiConfig}
      NoButton={false}
      fieldKey="contractId"
      onSuccess={() => {
        props.onSuccess();
      }}
    >
      <FormItem name="content" component={SysField.Content} result={value} required />
      {/*<Card title="添加产品明细" bordered={false}>*/}
      {/*  <TableDetail contractId={result && result.contractId} onSuccess={()=>{}}/>*/}
      {/*</Card>*/}
    </Form>
  </>;
};

export default React.forwardRef(ContractContent);
