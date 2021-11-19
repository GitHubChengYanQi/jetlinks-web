import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';


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

  const type = (value) => {
    switch (value.type) {
      case 'audit':
        return <>
          <div>审批</div>
          <div>类型：{value.auditType === 'person' ? '指定人' : (value.auditType === 'supervisor' ? '主管' : '自主选择')}</div>
          <div>规则：{value.rule}</div>
        </>;
      default:
        break;
    }
  };

  // TODO: 这里读取props数据
  const TitleEl = <TitleElement
    delNode={delNode} placeholder={props.nodeName} nodeName={props.nodeName}
    onTitleChange={onChange} />;

  return (<NodeWrap
    titleStyle={{backgroundColor: 'rgb(255, 148, 62)'}} onContentClick={onContentClick} title={TitleEl}
    objRef={props.objRef}>
    <div className="text">
      {props.owner ?
        type(props.owner)
        : '请选择'}
    </div>
    <Icon type="icon-arrow-right" />

  </NodeWrap>);
}

export default ApproverNode;
