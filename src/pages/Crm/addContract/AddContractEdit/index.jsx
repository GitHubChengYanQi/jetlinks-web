/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef, useState} from 'react';
import {Button, Input, InputNumber, Select as AntdSelect, Steps, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {templateAdd, templateDetail, templateEdit, templateList} from '@/pages/Crm/template/TemplateUrl';
import * as SysField from '@/pages/Crm/addContract/AddContractField';
import {contractAdd} from '@/pages/Crm/addContract/AddContractUrl';
import styles from './index.model.scss';
import FormIndex from '@/components/Form/FormIndex';
import {Template} from '@/pages/Crm/addContract/AddContractField';
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
  console.log(result);

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
              <FormItem label="合同名称" name="name" component={SysField.Name} required/>
              <FormItem label="负责人" name="userId" component={SysField.UserId} required/>
              <FormItem label="备注" name="note" component={SysField.Note} required/>
              <FormItem label="创建时间" name="time" component={SysField.Time} required/>
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
              <FormItem label="选择合同模板" name="content" component={SysField.Template} />
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


      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>

    </>
  );

};

export default AddContractEdit;
