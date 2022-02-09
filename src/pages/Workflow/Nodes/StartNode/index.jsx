import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/Workflow/OperatorContext';
import {Owner} from '@/pages/Workflow/Nodes/MatchNode';


function StartNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      onContentClick={()=>{onContentClick();}}
      title={<span>{props.nodeName || '发起人'}</span>}>
      <div>
        {props.stepType ? Owner(props) : '请选择发起人'}
      </div>
      <Icon type="icon-arrow-right" />
    </NodeWrap>);
}

export default StartNode;
