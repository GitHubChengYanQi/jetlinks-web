import React, {useEffect, useState} from 'react';
import {Button, Card, Empty, notification, Space} from 'antd';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useRequest} from '@/util/Request';
import WorkFlow from '@/pages/Workflow/WorkFlow';
import {processDetail} from '@/pages/Workflow/Process/processUrl';

const WorkflowAdd = () => {

  const params = useParams();

  const [value, setValue] = useState(false);

  const {loading: processLoading, data, run: detailRun} = useRequest(processDetail, {
    manual: true,
  });


  const {loading, run: detail} = useRequest(
    {url: '/activitiSteps/detail', method: 'POST'},
    {
      manual: true,
      onSuccess: (res) => {
        setValue(res);
      }
    });

  useEffect(() => {
    if (params.cid) {
      detail({
        data: {
          processId: params.cid
        }
      });

      detailRun({
        data: {
          processId: params.cid
        }
      });
    }
  }, []);

  const history = useHistory();

  const {run} = useRequest(
    {url: '/activitiSteps/add', method: 'POST'},
    {
      manual: true, onSuccess: () => {
        history.push('/workflow');
      }
    });

  if (processLoading || loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data){
    return <Empty style={{padding: 64}} />;
  }



  return <>
    <div style={{padding: 16}}>
      <div style={{display: 'inline-block', width: '50%'}}>添加{data.processName}流程步骤</div>
      <div style={{display: 'inline-block', textAlign: 'right', width: '50%'}}>
        <Space>
          <Button type="primary" disabled={data && data.status !== 0} onClick={() => {
            if (!value) {
              return notification.warn({message: '请配置正确流程！'});
            }
            console.log(value);
            run({
              data: {
                ...value,
                processId: params.cid,
              }
            });
          }}>{data && data.status !== 0 ? '已发布' : '保存'}</Button>
          <Button onClick={() => {
            history.push('/workflow');
          }}>返回</Button>
        </Space>
      </div>
    </div>
    <Card style={{height: '90vh'}}>
      <WorkFlow value={value} type={data.type} module={data.module} onChange={(value) => {
        setValue(value);
      }} />
    </Card>
  </>;
};

export default WorkflowAdd;
