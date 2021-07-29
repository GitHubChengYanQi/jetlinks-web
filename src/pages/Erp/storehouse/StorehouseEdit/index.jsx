/**
 * 地点表编辑页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {placeDetail, placeAdd, placeEdit, storehouseDetail, storehouseAdd, storehouseEdit} from '../StorehouseUrl';
import * as SysField from '../StorehouseField';
import {Capacity, Palce} from '../StorehouseField';
import FormIndex from '@/components/Form/FormIndex';

const {FormItem} = Form;

const ApiConfig = {
  view: storehouseDetail,
  add: storehouseAdd,
  save: storehouseEdit
};

const StorehouseEdit = ({...props}) => {
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
              fieldKey="storehouseId"
              success={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="仓库名称" name="name" component={SysField.Name} required/>
              <FormItem label="仓库地点" name="palce" component={SysField.Palce} required/>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '必填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="storehouseId"
              success={(result) => {
                next();
              }}
            >
              <FormItem label="经度" name="longitude" component={SysField.Longitude} required/>
              <FormItem label="纬度" name="latitude" component={SysField.Latitude} required/>
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
              fieldKey="storehouseId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <FormItem label="仓库面积" name="measure" component={SysField.Measure} />
              <FormItem label="仓库容量" name="capacity" component={SysField.Capacity} />
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

export default StorehouseEdit;
