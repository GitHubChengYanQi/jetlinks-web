import React, {useState} from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Modal, notification, Popover, Steps} from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';
import Message from '@/components/Message';

const {Step} = Steps;

const StepList = (props) => {

  const {value, onChange: pOnChange} = props;


  const openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: type === 'success' ? '变更成功！' : '变更失败！',
      description: `变更进度为${content !== undefined ? content : ''}`,
    });
  };


  const {error, run} = useRequest({
    url: '/repair/editdy',
    method: 'POST',
  }, {
    manual: true,
    onError: (error) => {
      Message.error(error.message);
    }
  });


  const edit = async (num) => {
    await run(
      {
        data: {
          repairId: value.repairId || null,
          progress: num
        }
      }
    );
  };


  function confirm(name, values) {
    Modal.confirm({
      title: 'Confirm',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: `是否推进到${name}`,
      okText: '确认',
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await edit(values);
        await openNotificationWithIcon('success', name);
        typeof pOnChange === 'function' && pOnChange();
      }
    });
  }

  function confirmOk(name, percent) {
    Modal.confirm({
      title: 'Confirm',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: `是否变更到${name}`,
      okText: '确认',
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await edit(null, name);
        typeof pOnChange === 'function' && pOnChange();
        openNotificationWithIcon('success', name);
      }
    });
  }


  if (value) {
    return (
      <Steps
        type="navigation"
        current={value.progress}
      >
        <Step
          title="待派工"
        />
        <Step
          title="接单中"
        />
        <Step
          title="实施中"
        />
        <Step
          title="完成"
        />
        <Step
          title="评价"
        />
      </Steps>
    );
  } else {
    return null;
  }


};

export default StepList;
