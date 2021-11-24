import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/Workflow/OperatorContext';


function getOwner(props) {

  if (props.rule) {
    return <>
      {
        props.rule.users &&
        <div>
          <strong>人员:</strong>
          {props.rule.users.map((item, index) => {
            if (item.key !== 0) {
              return <span key={index}>{item.title}，</span>;
            } else {
              return null;
            }
          })}
        </div>
      }

      {
        props.rule.depts && <div>
          <strong>部门:</strong>
          {props.rule.depts.map((item, index) => {
            if (item.key !== 0) {
              return <span key={index}>{item.title}，</span>;
            } else {
              return null;
            }
          })}
        </div>
      }
    </>;
  } else {
    return null;
  }
}


function StartNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  return (
    <NodeWrap type={0} objRef={props.objRef} onContentClick={onContentClick} title={<span>{props.nodeName}</span>}>
      <div className="text">
        {props.stepType ? getOwner(props) : '请选择发起人'}
      </div>
      <Icon type="icon-arrow-right" />
    </NodeWrap>);
}

export default StartNode;
