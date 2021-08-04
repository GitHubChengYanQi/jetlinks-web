/**
 * 商机表编辑页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import FormIndex from '@/components/Form/FormIndex';
import {
  businessDetail,
  businessAdd,
  businessEdit,
  NameListSelect,
  MainCableListSelect6
} from '../BusinessUrl';
import * as SysField from '../BusinessField';


const {FormItem} = Form;

const ApiConfig = {
  view: businessDetail,
  add: businessAdd,
  save: businessEdit
};

const BusinessEdit = ({...props}) => {


  const {Step} = Steps;

  const [result, setResult] = useState(props.value);

  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '商机名称',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="businessId"
              success={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="商机名称" name="businessName" component={SysField.BusinessNameListSelect} required/>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '商机详细信息',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="businessId"
              success={(result) => {
                next();
              }}
            >
              <FormItem label="负责人" name="person" component={SysField.PersonListSelect} />
              <FormItem label="客户名称" name="customerName" component={SysField.CustomerNameListSelect} />
              <FormItem label="产品名称" name="name" component={SysField.NameListSelect} />
              <FormItem label="机会来源" name="originId" component={SysField.OrgNameListSelect} />
              <FormItem label="销售流程" name="originId" component={SysField.SalesIdListSelect} />
              <FormItem label="立项日期" name="time" component={SysField.TimeListSelect2} />
              <FormItem label="商机金额" name="opportunityAmount" component={SysField.OpportunityAmountListSelect3} />
              <FormItem label="销售流程" name="salesId" component={SysField.SalesIdListSelect} />
              <FormItem label="产品合计" name="totalProducts" component={SysField.TotalProductsListSelect4} />
              <FormItem label="整单折扣" name="orderDiscount" component={SysField.OrderDiscountListSelect5} />
              <FormItem label="主线索" name="mainCable" component={SysField.MainCableListSelect6} />
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>

        </>
    },
    {
      title: '系统信息',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="businessId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <FormItem label="创建人" name="createUser" component={SysField.CreateUserListSelect7} />
              <FormItem label="最后修改人" name="updateUser" component={SysField.UpdateUserListSelect8} />
              <FormItem label="创建时间" name="createTime" component={SysField.CreateTimeListSelect9} />
              <FormItem label="最后修改时间" name="updateTime" component={SysField.UpdateTimeListSelect10} />
              <FormItem label="负责人主属部门" name="deptId" component={SysField.DeptIdListSelect11} />
              <Button type="primary" htmlType="submit">
                next
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
              fieldKey="businessId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <FormItem label="商机状态" name="state" component={SysField.StateListSelect12} />
              <FormItem label="商机阶段" name="stage" component={SysField.StageListSelect13} />
              <FormItem label="结单日期" name="statementTime" component={SysField.StatementTimeListSelect14} />
              <FormItem label="赢率" name="salesProcessId" component={SysField.SalesProcessIdListSelect15} />
              <FormItem label="阶段变更时间" name="changeTime" component={SysField.ChangeTimeListSelect17} />
              <FormItem label="输单原因" name="reason" component={SysField.ReasonListSelect18} />
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

export default BusinessEdit;
