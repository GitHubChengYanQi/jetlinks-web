import React, {useState} from 'react';
import WorkFlow from '@/pages/Workflow/WorkFlow';
import {Affix, Button, Card, Col, Row, Space} from 'antd';
import {useRequest} from '@/util/Request';
import {useHistory} from 'ice';

const WorkflowAdd = () => {

  const [value, setValue] = useState(false);

  const history = useHistory();

  const {run} = useRequest(
    {url: '/activitiSteps/add', method: 'POST'},
    {manual: true});


  return <>
    <div style={{padding: 16}}>
      <div style={{display: 'inline-block', width: '50%'}}>添加流程步骤</div>
      <div style={{display: 'inline-block', textAlign: 'right', width: '50%'}}>
        <Space>
          <Button type="primary" onClick={() => {
            console.log(value);
            run({
              data:{
                ...value
              }
            });
            // history.goBack();
          }}>保存</Button>
          <Button onClick={() => {
            history.goBack();
          }}>返回</Button>
        </Space>
      </div>
    </div>
    <Card style={{height: '90vh'}}>
      <WorkFlow value={value} onChange={(value) => {
        setValue(value);
      }} />
    </Card>
  </>;
};

export default WorkflowAdd;
