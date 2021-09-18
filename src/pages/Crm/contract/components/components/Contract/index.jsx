import React from 'react';
import * as SysField from '@/pages/Crm/contract/ContractField';
import {Button} from 'antd';
import Form from '@/components/Form';
import {contractAdd, contractDetail, contractEdit} from '@/pages/Crm/contract/ContractUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: contractDetail,
  add: contractAdd,
  save: contractEdit
};

const Contract = (props) => {


  return (
    <div style={{padding:20}}>
      <Form
        NoButton={false}
        {...props}
        api={ApiConfig}
        fieldKey="contractId"
        success={(result) => {
          props.onSuccess();
        }}
      >
        <FormItem name="content" component={SysField.SeeContent} required />
        <Button onClick={()=>{
          props.onSuccess();
        }}>
          关闭
        </Button>
      </Form>
    </div>
  );
};

export default Contract;
