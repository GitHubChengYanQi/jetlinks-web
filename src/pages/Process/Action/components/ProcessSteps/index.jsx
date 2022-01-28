import React from 'react';
import {Avatar, Space, Steps} from 'antd';
import {AuditOutlined, SendOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';

const ProcessSteps = ({
  data,
}) => {

  const processType = (value) => {
    switch (value) {
      case 'quality_dispatch':
        return <>指派任务</>;
      case 'quality_perform':
        return <>执行任务</>;
      case 'quality_complete':
        return <>完成任务</>;
      case 'purchase_complete':
        return <>采购完成</>;
      default:
        break;
    }
  };

  const rules = (rule) => {
    const users = [];
    if (rule && rule.rules) {
      rule.rules.map((items) => {
        switch (items.type) {
          case 'AppointUsers':
            items.appointUsers && items.appointUsers.map((itemuser) => {
              return users.push(itemuser.title);
            });
            break;
          case 'DeptPositions':
            items.deptPositions && items.deptPositions.map((itemdept) => {
              return users.push(`${itemdept.title}(${itemdept.positions && itemdept.positions.map((items) => {
                return items.label;
              })})`);
            });
            break;
          case 'AllPeople':
            users.push('所有人');
            break;
          default:
            break;
        }
        return null;
      });
      return <Space direction="vertical" wrap>
        {
          users.map((items, index) => {
            return <Space align="center" key={index}>
              <Avatar
                style={{fontSize: 16}}
                size={24}
                shape="square"
                key={index}
              >{items.substring(0, 1)}</Avatar>
              {items}
            </Space>;
          })
        }
      </Space>;
    } else
      return null;
  };

  const status = (step, stepStatus) => {
    const fontSize = 32;
    switch (step.auditType) {
      case 'start':
        return <Icon type="icon-caigou_faqiren" style={{fontSize}} />;
      case 'send':
        return <SendOutlined style={{fontSize}} />;
      case 'route':
        return <AuditOutlined style={{fontSize}} />;
      case 'process':
        switch (step.auditRule.type) {
          case 'audit':
            switch (step.logResult.status) {
              case -1:
                switch (stepStatus) {
                  case 'process':
                    return <Icon type="icon-shenhe1" style={{fontSize}} />;
                  case 'wait':
                    return <Icon type="icon-caigou_weishenpi1" style={{fontSize}} />;
                  default:
                    return 'null';
                }
              case 0:
                return <Icon type="icon-caigou_shenpibutongguo1" style={{fontSize}} />;
              case 1:
                return <Icon type="icon-caigou_shenpitongguo1" style={{fontSize}} />;
              default:
                return 'null';
            }
          default:
            return <Icon type="icon-caigou_dongzuo" style={{fontSize}} />;
        }
      default:
        return 'null';
    }
  };


  const steps = (step, next) => {
    let stepStatus;
    switch (step.logResult && step.logResult.status) {
      case -1:
        if (next)
          stepStatus = 'process';
        else
          stepStatus = 'wait';
        break;
      case 0:
        stepStatus = 'error';
        break;
      case 1:
        stepStatus = 'process';
        break;
      default:
        stepStatus = 'wait';
        break;
    }
    switch (step.auditType) {
      case 'start':
        return <>
          <Steps.Step
            style={{minHeight:80}}
            status={stepStatus}
            description={<Space align="center">
              <Avatar
                style={{fontSize: 16}}
                size={24}
                shape="square"
              >{data.createName.substring(0, 1)}</Avatar>
              {data.createName}
            </Space>}
            icon={status(step)} />
          {steps(step.childNode, step.logResult && step.logResult.status === 1)}
        </>;
      case 'route':
        return <>
          <Steps.Step
            style={{minHeight:80}}
            status={stepStatus}
            description={
              <div style={{overflowX: 'auto'}}>
                <Space align="start">
                  {step.conditionNodeList.map((items, index) => {
                    return allStep(items.childNode, next, index);
                  })}
                </Space>
              </div>
            }
            icon={status(step)} />
          {steps(step.childNode, step.logResult && step.logResult.status === 1)}
        </>;
      case 'send':
      case 'process':
        return <>
          <Steps.Step
            style={{minHeight:80}}
            status={stepStatus}
            title={processType(step.auditRule.type)}
            description={rules(step.auditRule)}
            icon={status(step, stepStatus)} />
          {steps(step.childNode, step.logResult && step.logResult.status === 1)}
        </>;
      default:
        break;
    }
  };


  const allStep = (audit, next, index) => {
    return <div key={index} style={{minWidth:200}}>
      <Steps direction="vertical">
        {steps(audit, next)}
      </Steps>
    </div>;
  };


  return <>
    {allStep(data.stepsResult, true, 0)}
  </>;
};

export default ProcessSteps;
