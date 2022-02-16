import React from 'react';


import StartNode from '../StartNode';
// eslint-disable-next-line import/no-cycle
import ConditionNode from '../ConditionNode';
import ApproverNode from '../ApproverNode';

const NodeMaps = {
  '0': StartNode,
  '1': ApproverNode,
  '4': ConditionNode
};

const MatchNode = ({config, pRef,...props}) => {
  const Node = NodeMaps[config.type] || null;
  return Node && <Node {...config} objRef={config} pRef={pRef} {...props} />;
};

export default MatchNode;
