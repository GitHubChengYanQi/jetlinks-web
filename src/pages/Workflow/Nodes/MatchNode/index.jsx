import React from 'react';
import StartNode from '../StartNode';
import ApproverNode from '../ApproverNode';
import NotifierNode from '../NotifierNode';
// eslint-disable-next-line import/no-cycle
import ConditionNode from '../ConditionNode';

const NodeMaps = {
  0: StartNode,
  1: ApproverNode,
  2: NotifierNode,
  4: ConditionNode
};

export const Owner = (props) => {
  switch (props.stepType) {
    case 'audit':
      return <>
        <strong>审批人</strong>
        <div>{props.auditType === '指定人' ? props.rule && props.rule.label : '主管'}</div>
      </>;
    case 'quality':
      return <>
        <strong>质检动作</strong>
        <div>{props.auditType}</div>
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
