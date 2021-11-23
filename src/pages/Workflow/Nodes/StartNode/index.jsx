import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/Workflow/OperatorContext';


function getOwner(flowPermission) {
  // console.log('flowPermission:',flowPermission);
  if (flowPermission){
    return <>{flowPermission}</>;
  }else {
    return null;
  }

}



function StartNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  return (<NodeWrap type={0} objRef={props.objRef} onContentClick={onContentClick} title={<span>{props.nodeName}</span>}>
    <div className="text">
      {getOwner(props.flowPermission) || '所有人'}
    </div>
    <Icon type="icon-arrow-right" />
  </NodeWrap>);
}
export default StartNode;
