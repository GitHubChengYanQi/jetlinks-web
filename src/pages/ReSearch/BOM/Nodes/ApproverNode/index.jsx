import React, {useContext, useEffect} from 'react';
import {Space, Spin} from 'antd';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {request, useRequest} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import BackSkus from '@/pages/Erp/sku/components/BackSkus';


function ApproverNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  const {loading, data: skuData, run} = useRequest(skuDetail, {manual: true});

  useEffect(() => {
    if (props.processRoute && props.processRoute.skuId) {
      run({
        data: {
          skuId: props.processRoute.skuId
        }
      });
    }
  }, [props.processRoute]);

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

  const content = () => {

    if (!(props.setpSet || props.processRoute)) {
      return <>请配置</>;
    }

    switch (props.stepType) {
      case 'setp':
        return <Space direction="vertical">
          <strong>工序</strong>
          {
            props.setpSet.skuShow
              ?
              props.setpSet.skuShow.map((item, index) => {
                return <div key={index} style={{borderBottom: 'solid 1px #eee'}}>
                  <SkuResultSkuJsons skuResult={item.skuResult} />
                </div>;
              })
              :
              props.setpSet.setpSetDetails && props.setpSet.setpSetDetails.map((item, index) => {
                return <div key={index} style={{borderBottom: 'solid 1px #eee'}}>
                  <SkuResultSkuJsons skuResult={item.skuResult} />
                </div>;
              })

          }
        </Space>;
      case 'ship':
        return <Space direction="vertical">
          <strong>工艺</strong>
          {loading ? <Spin /> : <SkuResultSkuJsons skuResult={skuData} />}
        </Space>;
      default:
        return null;
    }
  };

  return (<NodeWrap
    titleStyle={{backgroundColor: props.objRef.type === '3' ? '#15bc83' : 'rgb(255, 148, 62)'}}
    onContentClick={onContentClick}
    title={TitleEl}
    objRef={props.objRef}>
    <div>
      {content()}
    </div>
    <Icon type="icon-arrow-right" />

  </NodeWrap>);
}

export default ApproverNode;
