
import React, {useImperativeHandle, useState} from 'react';
import {Divider, Step} from '@alifd/next';
import {Col, Modal, Row, Steps} from 'antd';
import Title from '@/components/Title';
import ProCard from '@ant-design/pro-card';

const BusinessSteps = ((props, ref) => {

  const {Step} = Steps;
  console.log(666666666666, props);
  const {onClose, useData} = props;
  // const useData = props.value.process;
  // let current = 0;
  const [current, setCurrent] = useState(0);
  const [description, setDescription] = useState(useData !==undefined ? useData[0].note : null);
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
      <Modal title="商机流程" visible={isModalVisible} onCancel={()=>{
        typeof onClose==='function' && onClose();
      }}>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <ProCard title='流程' style={{marginTop: 8}} >
                {step ?
                  <Steps
                    direction="vertical"
                    onChange={onChange}
                    current={current}
                  >
                    {step}
                  </Steps> : null}
              </ProCard>
            </Col>
            <Divider direction='ver' style={{height: 400}}/>
            <Col span={11}>
              <ProCard title='描述' style={{marginTop: 8}} >
                <div style={{overflow: 'auto'}}>{description || null}</div>
              </ProCard>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
});

export default React.forwardRef(BusinessSteps);
