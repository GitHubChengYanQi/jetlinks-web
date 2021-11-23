import React, {useState} from 'react';
import WorkFlow from '@/pages/Workflow/WorkFlow';
import {Button, Card, Col, Row} from 'antd';
import {useRequest} from '@/util/Request';

const WorkflowAdd = () => {

  const [value,setValue] = useState(false);

  const {run} = useRequest({url:'/activitiSteps/add',method:'POST'},{manual:true});


  return <>
    <Row style={{padding: 16}} gutter={24}>
      <Col span={23}>添加流程步骤</Col>
      <Col span={1}> <Button type="primary" onClick={()=>{
        console.log(value);
        run({
          data:{
            ...value
          }
        });
      }}>保存</Button></Col>
    </Row>
    <Card style={{height: '90vh'}}>
      <WorkFlow value={value} onChange={(value) => {
        setValue(value);
      }} />
    </Card>
  </>;
};

export default WorkflowAdd;
