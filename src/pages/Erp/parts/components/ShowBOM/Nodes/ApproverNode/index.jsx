import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';
import {Space} from 'antd';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';


function ApproverNode(props) {

  // const {onDeleteNode, onSelectNode} = useContext(WFC);

  function delNode() {
    // onDeleteNode(props.pRef, props.objRef);
  }

  function onChange(val) {
    // 数据设置不用去重新渲染
    props.pRef.childNode.nodeName = val;
  }

  function onContentClick() {
    // onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  // TODO: 这里读取props数据
  const TitleEl = <TitleElement
    // delNode={props.type === '3' ? props.delBranch : delNode}
    placeholder=""
    nodeName="组成物料"
    onTitleChange={onChange}
  />;

  return (<NodeWrap
    titleStyle={{backgroundColor: 'rgb(209 209 208)'}}
    onContentClick={onContentClick}
    title={TitleEl}
    objRef={props.objRef}>
    <Space direction='vertical'>
      <SkuResultSkuJsons skuResult={props.sku.skuResult} />
      <div>数量：{props.sku.number}</div>
      <div>备注：{props.sku.note || '无'}</div>
    </Space>
    {/*<Icon type="icon-arrow-right" />*/}

  </NodeWrap>);
}

export default ApproverNode;
