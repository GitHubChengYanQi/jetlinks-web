/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef, useState} from 'react';
import {Button, Card, Col, Input, InputNumber, Row, Select as AntdSelect, Steps, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/contract/ContractField';
import {contractAdd, contractDetail, contractEdit} from '@/pages/Crm/contract/ContractUrl';
import {useRequest} from '@/util/Request';
import {createFormActions, FormEffectHooks} from '@formily/antd';
import TableDetail from '@/pages/Crm/contract/ContractEdit/components/TableDetail';
import ProCard from '@ant-design/pro-card';
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';


const {onFieldValueChange$} = FormEffectHooks;

const company = '1416605276529807486';


const {FormItem} = Form;

const ApiConfig = {
  view: contractDetail,
  add: contractAdd,
  save: contractEdit
};


const AddContractEdit = ({...props}) => {

  const {Step} = Steps;

  const {value, customerId, ...other} = props;



  const [result, setResult] = useState(value);

  const content = () => {
    return (
      <div style={{padding: 20, maxWidth: 1200}}>
        <Form
          {...props}
          value={result ? result.contractId : false}
          ref={formRef}
          api={ApiConfig}
          NoButton={false}
          fieldKey="contractId"
          onSuccess={(result) => {
            props.onSuccess();
          }}
        >
          <FormItem name="content" component={SysField.Content} result={result} required />
        </Form>
        <Card title="添加产品明细" bordered={false}>
          <TableDetail value={result ? result.contractId : false} />
        </Card>
        <Button type="primary" style={{width: '100%'}} onClick={() => {
          formRef.current.submit();
        }}>
          完成
        </Button>
      </div>
    );
  };


  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();


  if (props.value) {
    return content();
  }


  const steps = [
    {
      title: '必填项',
      content:
        <>
          <div style={{margin: '0 150px'}}>
            <Form
              NoButton={false}
              value={result ? result.contractId : false}
              {...other}
              ref={formRef}
              api={ApiConfig}
              fieldKey="contractId"
              onSuccess={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <ProCard headerBordered className="h2Card" title="基础信息">
                <FormItem labelCol={5} label="选择合同模板" name="templateId" component={SysField.Template} required />
                <FormItem labelCol={5} label="合同名称" name="name" component={SysField.Name} required />
                <div style={{height: 0}}>
                  <FormItem hidden name="audit" component={SysField.Audit} required />
                </div>
              </ProCard>

              <Row gutter={24}>
                <Col span={12}>
                  <ProCard headerBordered className="h2Card" title="甲方信息">
                    <CustomerAll customer='partyA' adress='partyAAdressId' contacts='partyAContactsId' phone='partyAPhone' customerId={customerId} />
                  </ProCard>
                </Col>
                <Col span={12}>
                  <ProCard className="h2Card" headerBordered title="乙方信息">
                    <CustomerAll customer='partyB' adress='partyBAdressId' contacts='partyBContactsId' phone='partyBPhone' customerId={company} />
                  </ProCard>
                </Col>
              </Row>

              <Button style={{float: 'right', margin: 24}} type="primary" htmlType="submit">
                下一步
              </Button>
            </Form>
          </div>
        </>
    },
    {
      title: '选填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            {content()}
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
    <div style={{minWidth: 1200}}>
      <Steps current={current} style={{padding: '30px 150px '}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>

    </div>
  );

};

export default AddContractEdit;
