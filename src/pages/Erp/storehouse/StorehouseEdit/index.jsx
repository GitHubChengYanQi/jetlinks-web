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
      title: '仓库必填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <Form
              NoButton={false}
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="storehouseId"
              onSuccess={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="仓库名称" name="name" component={SysField.Name} required/>
              <FormItem label="仓库地点" name="palce" component={SysField.Palce} required/>
              <FormItem label="经度" name="longitude" component={SysField.Longitude} required/>
              <FormItem label="纬度" name="latitude" component={SysField.Latitude} required/>
              <div style={{textAlign:'center'}}>
                <Button type="primary" htmlType="submit">
                  下一步
                </Button>
              </div>
            </Form>
          </div>
        </>
    },
    {
      title: '选填项',
      content:
        <>

          <div style={{margin: '50px 150px'}}>
            <Form
              NoButton={false}
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
              <div style={{textAlign:'center'}}>
                <Button style={{marginRight:20}} type="primary" htmlType="submit">
                  保存
                </Button>
                <Button onClick={()=> prev()}>
                  返回
                </Button>
              </div>
            </Form>
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

export default StorehouseEdit;
