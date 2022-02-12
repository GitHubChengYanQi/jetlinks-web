import React from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';


function StartNode(props) {

  // const {onDeleteNode, onSelectNode} = useContext(WFC);

  function onContentClick() {
    // onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      // onContentClick={()=>{onContentClick();}}
      title={<span>{props.nodeName || '发起人'}</span>}>
      <div>
        {props.stratSku || '设计主体'}
      </div>
      {/* <Icon type="icon-arrow-right" /> */}
    </NodeWrap>);
}

export default StartNode;
