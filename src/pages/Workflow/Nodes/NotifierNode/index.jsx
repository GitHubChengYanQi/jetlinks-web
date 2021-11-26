import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';
import {Owner} from '@/pages/Workflow/Nodes/MatchNode';

function NotifierNode(props) {
  console.log(props);
  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function delNode() {
    onDeleteNode(props.pRef, props.objRef);
  }

  function onChange(val) {
    props.pRef.childNode.nodeName = val;
  }

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  const TitleEl = <TitleElement
    delNode={delNode} placeholder={props.nodeName} nodeName={props.nodeName}
    onTitleChange={onChange} />;
  return (<NodeWrap
    titleStyle={{backgroundColor: 'rgb(50, 150, 250)'}}
    onContentClick={onContentClick}
    // title={TitleEl}
    objRef={props.objRef}>
    <div className="text">
      {props.stepType ?
        Owner(props)
        :
        '请选择抄送人'}
    </div>
    <Icon type="icon-arrow-right" />
  </NodeWrap>);
}

export default NotifierNode;
