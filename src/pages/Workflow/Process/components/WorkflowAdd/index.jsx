import React, {useEffect, useState} from 'react';
import WorkFlow from '@/pages/Workflow/WorkFlow';
import {Affix, Button, Card, Col, Row, Space} from 'antd';
import {useRequest} from '@/util/Request';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {processDetail} from '@/pages/Workflow/Process/processUrl';

const WorkflowAdd = () => {

  const params = useParams();

  const [value, setValue] = useState(false);

  const {loading:processLoading,data} = useRequest(processDetail,{
    defaultParams:{
      data:{
        processId: params.cid
      }
    }
  });

  const {loading,run:detail} = useRequest(
    {url:'/activitiSteps/detail',method:'POST'},
    {
      manual:true,
      onSuccess:(res)=>{
        setValue(res);
      }
    });

  useEffect(()=>{
    if (params.cid){
      detail({
        data:{
          processId: params.cid
        }
      });
    }
  },[]);

  const history = useHistory();

  const {run} = useRequest(
    {url: '/activitiSteps/add', method: 'POST'},
    {manual: true});

  if (processLoading || loading){
    return (<ProSkeleton type="descriptions" />);
  }


  return <>
    <div style={{padding: 16}}>
      <div style={{display: 'inline-block', width: '50%'}}>添加流程步骤</div>
      <div style={{display: 'inline-block', textAlign: 'right', width: '50%'}}>
        <Space>
          <Button type="primary" disabled={data && data.status !== 0} onClick={() => {
            run({
              data:{
                ...value,
                processId:params.cid,
              }
            });
            history.goBack();
          }}>{data && data.status !== 0 ? '已发布' : '保存'}</Button>
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
