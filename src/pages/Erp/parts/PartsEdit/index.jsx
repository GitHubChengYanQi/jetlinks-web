/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {partsDetail, partsAdd, partsEdit} from '../PartsUrl';
import * as SysField from '../PartsField';
import FormIndex from '@/components/Form/FormIndex';
import {Button, Steps} from 'antd';

const {FormItem} = Form;

const {Step} = Steps;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};

const PartsEdit = ({...props}) => {

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
              fieldKey="partsId"
              success={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="产品编号" name="itemId" component={SysField.Item} required/>
              <FormItem label="品牌编号" name="brandId" component={SysField.BrandId} required/>
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
              fieldKey="partsId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <FormItem label="零件" name="items" component={SysField.Item} />
              <FormItem label="零件数量" name="number" component={SysField.Number} />
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

export default PartsEdit;
