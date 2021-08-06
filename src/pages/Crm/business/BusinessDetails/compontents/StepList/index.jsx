import React, {useState} from 'react';
import {Modal, notification, Popconfirm, Popover, Select, Steps} from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';
import {ExclamationCircleOutlined} from '@ant-design/icons';

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
          state: name || '结束',
        }
      }
    );
  };


  function confirm(name, values) {
    Modal.confirm({
      title: 'Confirm',
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
      icon: <ExclamationCircleOutlined />,
      content: `是否变更到${name}`,
      okText: '确认',
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        await edit(null,name);
        typeof pOnChange === 'function' && pOnChange();
        openNotificationWithIcon('success', name);
      }
    });
  }


  const step = data ? data.map((values, index) => {
    return (
      <>
        <Step key={index} title={values.name} description={`盈率：${values.percentage}%`}
              onClick={async () => {
                confirm(values.name, values);
              }}
        />
      </>
    );

  }) : null;

  if (step){
    return (
      <Steps
        type="navigation"
        current={ value.state==='赢单' || value.state==='输单' ? step.length  :  value.process.sort }
      >
        {step}


        <>
          <Step title={
            <>
              <Popover placement="bottom" content={
                <div>
                  <a className={styles.state} onClick={async () => {
                    confirmOk('赢单', 100);
                  }}>赢单 100%</a>
                  <a className={styles.state} onClick={async () => {
                    confirmOk('输单', 0);
                  }}>输单 0%</a>
                </div>
              } trigger="hover">
                {value.state}
              </Popover>
            </>}

          />
        </>
      </Steps>
    );
  }else {
    return null;
  }




};

export default StepList;
