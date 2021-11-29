import React from 'react';
import StartNode from '../StartNode';
import ApproverNode from '../ApproverNode';
import NotifierNode from '../NotifierNode';
// eslint-disable-next-line import/no-cycle
import ConditionNode from '../ConditionNode';
import {Typography} from 'antd';

const NodeMaps = {
  0: StartNode,
  1: ApproverNode,
  2: NotifierNode,
  4: ConditionNode
};

export const Owner = (props) => {

  const action = (value) => {
    switch (value) {
      case 'quality_task_dispatch':
        return <>分派任务</>;
      case 'quality_task_perform':
        return <>执行任务</>;
      case 'quality_task_complete':
        return <>完成任务</>;
      default:
        break;
    }
  };

  const Rule = (rule) => {
    if (rule) {
      return <>
        {
          rule.users && rule.users.length > 0 &&
          <Typography.Paragraph ellipsis style={{marginBottom: 0}}>
            <strong>人员:</strong>
            {(rule.users.map((item) => {
              return item.title;
            })).toString()}
          </Typography.Paragraph>
        }

        {
          rule.depts && rule.depts.length > 0 && <Typography.Paragraph ellipsis style={{marginBottom: 0}}>
            <strong>部门:</strong>
            {(rule.depts.map((item) => {
              return `${item.title}(${item.positions && item.positions.map((items)=>{
                return items.label;
              })})`;
            })).toString()}
          </Typography.Paragraph>
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
        <div>{Rule(props.auditRule && props.auditRule.qualityRules)}</div>
      </>;
    case 'audit':
      return <>
        <strong>审批</strong>
        <div>{Rule(props.auditRule && props.auditRule.qualityRules)}</div>
      </>;
    case 'send':
      return <>
        <strong>抄送</strong>
        <div>{Rule(props.auditRule && props.auditRule.qualityRules)}</div>
      </>;
    case 'quality':
      return <>
        <strong>{action(props.auditType)}</strong>
        <div>{Rule(props.auditRule && props.auditRule.qualityRules)}</div>
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
