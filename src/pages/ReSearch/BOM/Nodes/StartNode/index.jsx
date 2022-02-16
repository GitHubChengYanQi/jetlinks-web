import React from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';


function StartNode(props) {
  function onContentClick() {
    props.onContentClick && props.onContentClick();
  }

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      onContentClick={() => {
        onContentClick();
      }}
      title={<span>{props.nodeName || '发起人'}</span>}>
      <div>
        {props.data && props.data.name || '请选择'}
      </div>
      <Icon type="icon-arrow-right" />
    </NodeWrap>);
}

export default StartNode;
