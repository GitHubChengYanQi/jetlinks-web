/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef, useState} from 'react';
import {Button, Input, InputNumber, Select as AntdSelect, Steps, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/contract/addContract/AddContractField';
import {contractAdd} from '@/pages/Crm/contract/addContract/AddContractUrl';
import FormIndex from '@/components/Form/FormIndex';
import {contractDetail, contractEdit} from '@/pages/Crm/contract/ContractUrl';


const {FormItem} = Form;
const {Column} = AntTable;
const ApiConfig = {
  view: contractDetail,
  add: contractAdd,
  save: contractEdit
};


const AddContractEdit = ({...props}) => {
  const {Step} = Steps;

  const [result, setResult] = useState(props.value);

  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '必填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="contractId"
              success={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="选择合同模板" name="content" component={SysField.Template} required/>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '选填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>

            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="contractId"
              success={(result) => {
                next();
              }}
            >
              <FormItem label="合同名称" name="name" component={SysField.Name} required/>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>

        </>
    },
    {
      title: '选填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>

            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="contractId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <FormItem name="content" component={props.value ? SysField.ContentUpdate : SysField.Content} required/>
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </FormIndex>
          </div>

        </>
    },
  ];


  const next = () => {
    setCurrent(current + 1);
  };


  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>


      <Steps current={current} style={{padding: '30px 150px '}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>

    </>
  );

};

export default AddContractEdit;
