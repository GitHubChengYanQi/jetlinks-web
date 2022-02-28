import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/ReSearch/BOM/OperatorContext';
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
      <div>
        <SkuResultSkuJsons skuResult={props.startSku && props.startSku.skuResult} />
      </div>
      {/*<Icon type="icon-arrow-right" />*/}
    </NodeWrap>);
}

export default StartNode;
