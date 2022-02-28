import React, {useContext} from 'react';
import {Space} from 'antd';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';


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
    delNode={props.type === '3' ? props.delBranch : delNode}
    placeholder="生产过程"
    nodeName="生产过程"
    onTitleChange={onChange}
  />;

  const content = (data) => {
    if (!data) {
      return '请配置';
    }
    let type = '';
    switch (data.type) {
      case 'setp':
        type = '工序';
        break;
      case 'ship':
        type = '工艺';
        break;
      default:
        break;
    }
    return <Space direction="vertical">
      <strong>{type}</strong>
      {
        data.skuShow
          ?
          data.skuShow && data.skuShow.map((item, index) => {
            return <div key={index} style={{borderBottom: 'solid 1px #eee'}}>
              <SkuResultSkuJsons skuResult={item} />
            </div>;
          })
          :
          data.setpSetDetails && data.setpSetDetails.map((item, index) => {
            return <div key={index} style={{borderBottom: 'solid 1px #eee'}}>
              <SkuResultSkuJsons skuResult={item.skuResult} />
            </div>;
          })

      }
    </Space>;
  };

  return (<NodeWrap
    titleStyle={{backgroundColor: props.objRef.type === '3' ? '#15bc83' : 'rgb(255, 148, 62)'}}
    onContentClick={onContentClick}
    title={TitleEl}
    objRef={props.objRef}>
    <div>
      {content(props.setpSet)}
    </div>
    <Icon type="icon-arrow-right" />

  </NodeWrap>);
}

export default ApproverNode;
