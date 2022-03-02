import React from 'react';
import {Space} from 'antd';
import NodeWrap from '../NodeWrap';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';


function StartNode(props) {

  // const {onSelectNode} = useContext(WFC);

  function onContentClick() {
    // onSelectNode(props.pRef, props.objRef);
  }

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      onContentClick={() => {
        onContentClick();
      }}
      title={<span>{props.nodeName || '发起人'}</span>}>
      <Space direction='vertical'>
        <SkuResultSkuJsons skuResult={props.startSku && props.startSku.skuResult} />
        <div>
          描述：{props.startSku && props.startSku.config || '无'}
        </div>
      </Space>
      {/*<Icon type="icon-arrow-right" />*/}
    </NodeWrap>);
}

export default StartNode;
