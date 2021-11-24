import React, {useEffect, useState} from 'react';
import WorkFlow from '@/pages/Workflow/WorkFlow';
import {Affix, Button, Card, Col, Row, Space} from 'antd';
import {useRequest} from '@/util/Request';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';

const WorkflowAdd = () => {

  const params = useParams();

  const {loading,run:detail} = useRequest({url:'/activitiSteps/detail',method:'POST'},{manual:true});

  useEffect(()=>{
    if (params.cid){
      // detail({
      //   data:{
      //     processId: params.cid
      //   }
      // });
    }
  },[]);

  const [value, setValue] = useState(false);

  const history = useHistory();

  const {run} = useRequest(
    {url: '/activitiSteps/add', method: 'POST'},
    {manual: true});

  if (loading){
    return (<ProSkeleton type="descriptions" />);
  }


  return <>
    <div style={{padding: 16}}>
      <div style={{display: 'inline-block', width: '50%'}}>添加流程步骤</div>
      <div style={{display: 'inline-block', textAlign: 'right', width: '50%'}}>
        <Space>
          <Button type="primary" onClick={() => {
            console.log(value);
            run({
              data:{
                ...value,
                processId:params.cid,
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
