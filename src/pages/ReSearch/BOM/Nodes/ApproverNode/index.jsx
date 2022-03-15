import React, {useContext, useEffect} from 'react';
import {Space, Spin} from 'antd';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import TitleElement from '../TitleElement';
import WFC from '../../OperatorContext';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {useRequest} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';


function ApproverNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  const {loading, data: skuData, run} = useRequest(skuDetail, {manual: true});

  useEffect(() => {
    if (props.processParam && props.processParam.skuId) {
      run({
        data: {
          skuId: props.processParam.skuId
        }
      });
    }
  }, [props.processParam]);

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

  const nodeName = () => {
    switch (props.stepType) {
      case 'setp':
        return '工序';
      case 'ship':
        return '工艺路线';
      default:
        return null;
    }
  };

  // TODO: 这里读取props数据
  const TitleEl = <TitleElement
    delNode={props.type === '3' ? props.delBranch : delNode}
    placeholder={nodeName() || (props.type === '3' ? '并行工序' : '串行工序')}
    nodeName={nodeName() || (props.type === '3' ? '并行工序' : '串行工序')}
    onTitleChange={onChange}
  />;

  const content = () => {

    if (!(props.setpSet || props.processParam)) {
      return <>请配置</>;
    }

    switch (props.stepType) {
      case 'setp':
        return <Space direction="vertical">
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
          {loading ? <Spin /> : <SkuResultSkuJsons skuResult={skuData} />}
        </Space>;
      default:
        return null;
    }
  };

  return (<NodeWrap
    titleStyle={{backgroundColor: props.objRef && props.objRef.type === '3' ? '#15bc83' : 'rgb(255, 148, 62)'}}
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
