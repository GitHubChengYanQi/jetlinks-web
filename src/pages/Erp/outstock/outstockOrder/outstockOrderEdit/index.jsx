/**
 * 出库单编辑页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {outstockOrderDetail, outstockOrderAdd, outstockOrderEdit} from '../outstockOrderUrl';
import * as SysField from '../outstockOrderField';
import OutstockList from '@/pages/Erp/outstock/OutstockList';
import FormIndex from '@/components/Form/FormIndex';

const {FormItem} = Form;
const {Step} = Steps;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outstockOrderEdit
};

const OutstockOrderEdit = ({...props}) => {

  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(props.value);
  const formRef = useRef();

  const steps = [
    {
      title: '出库单',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="outstockOrderId"
              success={(result) => {
                if (!props.value) {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="仓库" name="storehouseId" component={SysField.Storhouse} required />
              <FormItem label="计划出库时间" name="time" component={SysField.Time} required />
              <div style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">
                  下一步
                </Button>
              </div>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '出库单',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <OutstockList outstockOrderId={result.outstockOrderId} sourhouse={result.storehouseId}  />
            <div style={{textAlign: 'center'}}>
              <Button style={{marginRight: 20}} type="primary" onClick={() => {
                props.onSuccess();
              }
              }>
                保存
              </Button>
              <Button style={{marginRight: 20}} type="primary" onClick={() => {
                prev();
              }
              }>
                返回
              </Button>
            </div>
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

export default OutstockOrderEdit;
