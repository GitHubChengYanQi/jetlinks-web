
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Divider} from '@alifd/next';
import {Col, Modal, Row, Steps} from 'antd';
import ProCard from '@ant-design/pro-card';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';

const BusinessSteps = ((props) => {

  const {Step} = Steps;
  const {onClose, useData, stage} = props;
  const [current, setCurrent] = useState(0);
  const step = useData ? useData.map((values, index) => {
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
    <>
      <div style={{maxHeight:'100vh'}}>
        <Row gutter={24}>
          <Col span={8}>
            <ProCard style={{marginTop: 8}} >
              {step ?
                <Steps
                  direction="vertical"
                  onChange={onChange}
                  current={current}
                >
                  {step}
                </Steps> : '暂无流程'}
            </ProCard>
          </Col>
          <Divider direction='ver' style={{height: 500
          }}/>
          <Col span={15}>
            <ProCard style={{marginTop:8}} >
              <div style={{overflow: 'auto'}}>
                <BusinessEdit
                  onClose={()=>{
                    typeof onClose==='function' && onClose();
                  }}
                  onChange={(result)=>{
                    props.onChange(result);
                  }}
                  stage={stage}
                  value={false}
                />
              </div>
            </ProCard>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default React.forwardRef(BusinessSteps);
