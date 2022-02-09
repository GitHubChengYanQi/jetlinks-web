import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';
import {Owner} from '@/pages/Workflow/Nodes/MatchNode';


function ApproverNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function delNode() {
    onDeleteNode(props.pRef, props.objRef);
  }

  function onChange(val) {
    // 数据设置不用去重新渲染
    props.pRef.childNode.nodeName = val;
  }

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  // TODO: 这里读取props数据
  const TitleEl = <TitleElement
    delNode={delNode}
    // placeholder={props.nodeName || '过程'} nodeName={props.nodeName || '过程'}
    onTitleChange={onChange}
  />;

  return (<NodeWrap
    // titleStyle={{backgroundColor: '#fff',}}
    onContentClick={onContentClick}
    // title={TitleEl}
    objRef={props.objRef}>
    <div>
      {props.sku || '请选择物料'}
    </div>
    <Icon type="icon-arrow-right" />

  </NodeWrap>);
}

export default ApproverNode;
