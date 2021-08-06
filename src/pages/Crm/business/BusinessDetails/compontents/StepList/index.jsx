import React, {useState} from 'react';
import {Modal, notification, Popconfirm, Popover, Select, Steps} from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const {Step} = Steps;

const StepList = (props) => {

  const {value, onChange: pOnChange} = props;


  const openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: type === 'success' ? '变更成功！' : '变更失败！',
      description: `变更流程为${content !== undefined ? content : ''}`,
    });
  };


  const [current, setCurrent] = useState(value.process ? value.process.sort : 0);


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



  const {run: runs} = useRequest({
    url: '/crmBusinessSalesProcess/edit',
    method: 'POST',
    onError() {
      openNotificationWithIcon('error');
    }
  }, {
    manual: true
  });

  const edit = async (salesProcessId) => {
    await run(
      {
        data: {
          processId: salesProcessId,
          businessId: value.businessId
        }
      }
    );
  };



  const runEdit = async (salesProcess,names,percent) => {
    await runs(
      {
        data: {
          salesProcessId: salesProcess,
          name: names,
          percentage:percent,
        }
      }
    );
  };

  function confirm(name,values) {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `是否变更到${name}`,
      okText: '确认',
      style:{margin:'auto'},
      cancelText: '取消',
      onOk:async () => {
        await edit(values.salesProcessId);
        await openNotificationWithIcon('success', values.name);
        typeof pOnChange === 'function' && pOnChange();
      }
    });
  }

  function confirmOk(name,values,value,percent) {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `是否变更到${name}`,
      okText: '确认',
      style:{margin:'auto'},
      cancelText: '取消',
      onOk:async () => {
        await runEdit(values.salesProcessId,value,percent);
        await edit(values.salesProcessId);
        typeof pOnChange === 'function' && pOnChange();
        openNotificationWithIcon('success', value);
      }
    });
  }


  const step = data ? data.map((values, index) => {
    if (index === data.length - 1) {
      return (
        <>
          <Step key={index} title={
            <>
              <Popover placement="bottom" content={
                <div>
                  <a className={styles.state} onClick={async () => {
                    confirmOk(values.name,values,'赢单',100);
                  }}>赢单 100%</a>
                  <a className={styles.state} onClick={async () => {
                    confirmOk(values.name,values,'输单',0);
                  }}>输单 0%</a>
                </div>
              } trigger="hover">
                {values.name}
              </Popover>
            </>}

          />
        </>
      );
    } else {
      return (
        <>
          <Step key={index} title={values.name} description={`盈率：${values.percentage}%`}
                onClick={async () => {
                  confirm(values.name,values);
                }}
          />
        </>
      );
    }
  }) : null;



  return (
    <Steps
      type="navigation"
      current={current}
    >
      {step}

    </Steps>
  );

};

export default StepList;
