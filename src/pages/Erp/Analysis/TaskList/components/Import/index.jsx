import React, {useImperativeHandle, useRef} from 'react';
import {Alert, Button, Space, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import Empty from '@/components/Empty';
import Modal from '@/components/Modal';
import TaskProgress from '@/pages/Erp/Analysis/TaskList/components/TaskProgress';

const Import = ({children, setTaskId, ...props}, ref) => {

  const modalRef = useRef();

  const {loading, data, run, cancel} = useRequest({
    url: '/asynTask/detail',
    method: 'POST'
  }, {
    manual: true,
    pollingInterval: 5000,
    onSuccess: (res) => {
      if (res.allCount === res.count) {
        cancel();
      }
    }
  });

  const load = data && (data.allCount === data.count);

  const open = (taskId) => {
    run({data: {taskId}});
    setTaskId(taskId);
    modalRef.current.open(false);
  };

  useImperativeHandle(ref, () => ({
    open,
  }));

  const content = () => {
    if (!data) {
      return <Empty />;
    }
    if (!load) {
      return <TaskProgress data={data} title="导入中" />;
    } else {
      return children;
    }
  };

  return <>
    <Modal
      ref={modalRef}
      headTitle={
        load ? <Space>
          <div>
            导入成功 <Button type="link" style={{padding: 0}}>{data && data.successNum || 0}</Button> 条
          </div>
          /
          <div>
            导入失败 <Button type="link" style={{padding: 0}} danger>{data && data.errorNum || 0}</Button> 条
          </div>
        </Space> : '物料导入'
      }
      width="auto"
    >
      {
        !data && loading
          ?
          <Spin spinning>
            <Alert
              style={{padding: 24, margin: 24, width: 500}}
              message="正在导入，请稍后..."
            />
          </Spin>
          :
          content()
      }

    </Modal>
  </>;
};

export default React.forwardRef(Import);
