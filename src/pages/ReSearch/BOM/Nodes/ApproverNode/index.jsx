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

  // TODO: 这里读取props数据
  const TitleEl = <TitleElement
    delNode={delNode}
    placeholder='生产过程'
    nodeName='生产过程'
    onTitleChange={onChange}
  />;

  return (<NodeWrap
    titleStyle={{backgroundColor: props.objRef.type === '3' ? '#15bc83' :'rgb(255, 148, 62)'}}
    onContentClick={onContentClick}
    title={TitleEl}
    objRef={props.objRef}>
    <div>
      {props.sku || '请配置'}
    </div>
    <Icon type="icon-arrow-right" />

  </NodeWrap>);
}

export default ApproverNode;
