/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef, useState} from 'react';
import {Button, Input, InputNumber, Select as AntdSelect, Steps, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/contract/ContractField';
import FormIndex from '@/components/Form/FormIndex';
import {contractAdd, contractDetail, contractEdit} from '@/pages/Crm/contract/ContractUrl';


const {FormItem} = Form;
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
              <FormItem label="选择合同模板" name="content" component={SysField.Template} required />
              <FormItem label="合同名称" name="name" component={SysField.Name} required />
              <FormItem label="甲方" name="partyA" component={SysField.Customer} placeholder="请选择甲方客户" required />
              <FormItem label="乙方" name="partyB" component={SysField.Customer} placeholder="请选择乙方方客户" required />
              <FormItem label='创建时间' name='time' component={SysField.Time} required />
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
              {/*<FormItem name="content" component={props.value ? SysField.ContentUpdate : SysField.Content} required />*/}
              <FormItem name="content" component={SysField.Content} required />
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
