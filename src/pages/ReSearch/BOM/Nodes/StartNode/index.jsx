import React, {useContext, useEffect} from 'react';
import {Space, Spin} from 'antd';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/ReSearch/BOM/OperatorContext';
import {useRequest} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import BackSkus from '@/pages/Erp/sku/components/BackSkus';


function StartNode(props) {

  const {onSelectNode} = useContext(WFC);

  const skuId = props.objRef && props.objRef.processParam && props.objRef.processParam.skuId;

  const {loading, data, run} = useRequest(skuDetail, {
    manual: true,
  });

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
  }

  useEffect(() => {
    if (skuId) {
      run({
        data: {
          skuId
        }
      });
    }
  }, [skuId]);

  console.log(data);

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      onContentClick={() => {
        if (!props.objRef.disabled) {
          onContentClick();
        }
      }}
      title={<span>{props.nodeName || '适用物料'}</span>}>
      {loading ?
        <Spin />
        :
        <div>
          {data ?
            <Space direction="vertical">
              <div>编码：{data.standard}</div>
              <div>名称：{data.spuResult.name}</div>
              <div>
                型号 / 规格：
                <div>{data.skuName} / {data.specifications || '无'}</div>
              </div>
            </Space>
            :
            '请选择适用物料'
          }
        </div>}
      <Icon type="icon-arrow-right" />
    </NodeWrap>);
}

export default StartNode;
