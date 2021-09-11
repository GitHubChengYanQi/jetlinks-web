
import React, {useImperativeHandle, useState} from 'react';
import {Divider} from '@alifd/next';
import {Col, Modal, Row, Steps} from 'antd';
import ProCard from '@ant-design/pro-card';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';

const BusinessSteps = ((props, ref) => {
  console.log(2222222222222222222222222, props);
  const {Step} = Steps;
  const {onClose, useData} = props;
  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const open = () => {
    setIsModalVisible(true);
  };

  const close = () => {
    setIsModalVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));


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
          <Col span={6}>
            <ProCard title='流程' style={{marginTop: 8}} >
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
          <Divider direction='ver' style={{height: 600}}/>
          <Col span={17}>
            <ProCard title='添加商机' style={{marginTop:8}} >
              <div style={{overflow: 'auto'}}>
                <BusinessEdit
                  onSuccess={() => {
                    ref.current.close();
                  }}
                  onClose={() => {
                    ref.current.close();
                  }}
                  value={false}/>
              </div>
            </ProCard>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default React.forwardRef(BusinessSteps);
