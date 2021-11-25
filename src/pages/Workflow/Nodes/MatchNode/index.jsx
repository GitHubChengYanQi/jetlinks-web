import React from 'react';
import StartNode from '../StartNode';
import ApproverNode from '../ApproverNode';
import NotifierNode from '../NotifierNode';
// eslint-disable-next-line import/no-cycle
import ConditionNode from '../ConditionNode';
import {Space, Typography} from 'antd';

const NodeMaps = {
  0: StartNode,
  1: ApproverNode,
  2: NotifierNode,
  4: ConditionNode
};

export const Owner = (props) => {

  const Rule = (rule) => {
    if (rule) {
      return <>
        {
          rule.users &&
          <Typography.Paragraph ellipsis style={{marginBottom:0}}>
            <strong>人员:</strong>
            {(rule.users.map((item, index) => {
              return item.title;
            })).toString()}
          </Typography.Paragraph>
        }

        {
          rule.depts && <Typography.Paragraph ellipsis style={{marginBottom:0}}>
            <strong>部门:</strong>
            {(rule.depts.map((item, index) => {
              return item.title;
            })).toString()}
          </Typography.Paragraph>
        }

        {
          rule.supervisor && <div>
            <strong>直接主管</strong>
          </div>
        }
      </>;
    } else {
      return null;
    }
  };

  switch (props.stepType) {
    case 'audit':
      return <>
        <strong>审批</strong>
        <div>{Rule(props.auditRule && props.auditRule.startUsers)}</div>
      </>;
    case 'quality':
      return <>
        <strong>质检动作</strong>
        <div>{props.auditType ===  'performTask' ? '执行任务' : '完成任务'}</div>
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
