import React, {useImperativeHandle, useRef, useState} from 'react';
import {Divider} from '@alifd/next';
import {Col, Row, Steps} from 'antd';
import ProCard from '@ant-design/pro-card';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';

const BusinessSteps = ((props, ref) => {

  const {Step} = Steps;
  const {onClose, useData, businessId, customerId, userId} = props;
  const [current, setCurrent] = useState(0);
  const formRef = useRef(null);

  useImperativeHandle(ref, () => ({
    formRef,
  }));

  const step = useData ? useData.process.map((values, index) => {
    return (
      <Step
        key={index}
        status="process"
        title={values.name}
        description={values.note}
      />
    );

  }) : null;

  const onChange = current => {
    setCurrent(current);
  };

  return (
    <div style={{margin:'0 12px',height:'100%'}}>
      <Row gutter={24} style={{height:'100%'}}>
        <Col span={8}>
          <div style={{overflow: 'auto'}}>
            <ProCard>
              {step ?
                <Steps
                  direction="vertical"
                  onChange={onChange}
                  current={current}
                >{step}
                </Steps> : '暂无流程'}
            </ProCard>
          </div>
        </Col>

        <Col span={16}>
          <ProCard>
            <div style={{overflow: 'auto'}}>
              <BusinessEdit
                ref={formRef}
                customerId={customerId}
                userId={userId}
                onClose={() => {
                  typeof onClose === 'function' && onClose();
                }}
                onChange={(result) => {
                  props.onChange(result);
                }}
                stage={useData ? useData.salesId : null}
                value={businessId || false}
              />
            </div>
          </ProCard>
        </Col>
      </Row>
    </div>
  );
});

export default React.forwardRef(BusinessSteps);
