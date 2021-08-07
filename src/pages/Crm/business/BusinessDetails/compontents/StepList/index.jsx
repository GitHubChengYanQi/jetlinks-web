import React from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Modal, notification, Popover, Steps} from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';

const {Step} = Steps;

const StepList = (props) => {

  const {value, onChange: pOnChange} = props;


  const openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: type === 'success' ? '变更成功！' : '变更失败！',
      description: `变更流程为${content !== undefined ? content : ''}`,
    });
  };


  const {data} = useRequest({
    url: '/crmBusinessSalesProcess/list',
    method: 'POST', data: {salesId: value.salesId}
  });

  const {run} = useRequest({
    url: '/crmBusiness/edit',
    method: 'POST',
    onError(error) {
      openNotificationWithIcon('error');
    }
  }, {
    manual: true
  });


  const edit = async (salesProcessId, name) => {
    await run(
      {
        data: {
          processId: salesProcessId || null,
          businessId: value.businessId,
          state: name || null,
        }
      }
    );
  };


  function confirm(name, values) {
    Modal.confirm({
      title: 'Confirm',
      centered:true,
      icon: <ExclamationCircleOutlined />,
      content: `是否变更到${name}`,
      okText: '确认',
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await edit(values.salesProcessId);
        await openNotificationWithIcon('success', values.name);
        typeof pOnChange === 'function' && pOnChange();
      }
    });
  }

  function confirmOk(name, percent) {
    Modal.confirm({
      title: 'Confirm',
      centered:true,
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


  const step = data ? data.map((values, index) => {
    return (
      <>
        <Step disabled={value.state} key={index} title={values.name} description={`盈率：${values.percentage}%`}
              onClick={async () => {
                value.state ? null : confirm(values.name, values);
              }}
        />
      </>
    );

  }) : null;

  if (step) {
    return (
      <Steps
        type="navigation"
        current={value.state ? step.length : value.process.sort}
      >
        {step}


        <>
          <Step title={value.state ? value.state :
            <>
              <Popover placement="bottom" content={
               ( <div>
                 <a className={styles.state} onClick={async () => {
                   confirmOk('赢单', 100);
                 }}>赢单 100%</a>
                 <a className={styles.state} onClick={async () => {
                   confirmOk('输单', 0);
                 }}>输单 0%</a>
               </div>)
              } trigger="hover">
                完成
              </Popover>
            </>}

          />
        </>
      </Steps>
    );
  } else {
    return null;
  }


};

export default StepList;
