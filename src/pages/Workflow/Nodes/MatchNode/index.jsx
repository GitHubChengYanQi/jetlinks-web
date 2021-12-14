import React from 'react';
import {Typography} from 'antd';


import StartNode from '../StartNode';
import ApproverNode from '../ApproverNode';
import NotifierNode from '../NotifierNode';
import ConditionNode from '../ConditionNode';
// eslint-disable-next-line import/no-cycle

const NodeMaps = {
  0: StartNode,
  1: ApproverNode,
  2: NotifierNode,
  4: ConditionNode
};

export const Owner = (props) => {

  const action = (value) => {
    switch (value) {
      case 'quality_dispatch':
        return <>分派任务</>;
      case 'quality_perform':
        return <>执行任务</>;
      case 'quality_complete':
        return <>完成任务</>;
      default:
        break;
    }
  };

  const Rule = (rule) => {
    if (rule) {
      return <>
        {
          rule.map((items, index) => {
            if (items.type === 'AppointUsers') {
              return <div key={index}>
                {
                  items.appointUsers && items.appointUsers.length > 0 &&
                  <Typography.Paragraph ellipsis style={{marginBottom: 0}}>
                    <strong>人员:</strong>
                    {(items.appointUsers.map((item) => {
                      return item.title;
                    })).toString()}
                  </Typography.Paragraph>
                }
              </div>;
            } else if (items.type === 'DeptPositions') {
              return <div key={index}>
                {
                  items.deptPositions && items.deptPositions.length > 0 &&
                  <Typography.Paragraph ellipsis style={{marginBottom: 0}}>
                    <strong>部门:</strong>
                    {(items.deptPositions.map((item) => {
                      return `${item.title}(${item.positions && item.positions.map((items) => {
                        return items.label;
                      })})`;
                    })).toString()}
                  </Typography.Paragraph>
                }
              </div>;
            } else if (items.type === 'AllPeople') {
              return <strong key={index}>所有人</strong>;
            }else {
              return null;
            }
          })
        }
      </>;
    } else {
      return null;
    }
  };

  switch (props.stepType) {
    case 'start':
      return <>
        <strong>发起人</strong>
        <div>{Rule(props.auditRule && props.auditRule.rules)}</div>
      </>;
    case 'audit':
      return <>
        <strong>审批</strong>
        <div>{Rule(props.auditRule && props.auditRule.rules)}</div>
      </>;
    case 'send':
      return <>
        <strong>抄送</strong>
        <div>{Rule(props.auditRule && props.auditRule.rules)}</div>
      </>;
    case 'quality':
      return <>
        <strong>{action(props.auditRule && props.auditRule.type)}</strong>
        <div>{Rule(props.auditRule && props.auditRule.rules)}</div>
      </>;
    default:
      break;
  }
};

const MatchNode = ({config, pRef}) => {
  const Node = NodeMaps[config.type] || null;
  return Node && <Node {...config} objRef={config} pRef={pRef} />;
};

export default MatchNode;
