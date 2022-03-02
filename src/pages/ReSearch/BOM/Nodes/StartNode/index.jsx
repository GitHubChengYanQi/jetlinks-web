import React, {useContext, useEffect, useState} from 'react';
import {Space} from 'antd';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/ReSearch/BOM/OperatorContext';
import {useRequest} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import BackSkus from '@/pages/Erp/sku/components/BackSkus';


function StartNode(props) {

  const {onSelectNode} = useContext(WFC);

  const skuId = props.objRef && props.objRef.processRoute && props.objRef.processRoute.skuId;

  const {data, run} = useRequest(skuDetail, {
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

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      onContentClick={() => {
        onContentClick();
      }}
      title={<span>{props.nodeName || '发起人'}</span>}>
      <div>
        {data ?
          <Space direction="vertical">
            <BackSkus record={data} />
            <div>
              描述:
              {data.list
              &&
              data.list.length > 0
              &&
              data.list[0].attributeValues
                ?
                <em>({data.list.map((items) => {
                  return `${items.itemAttributeResult.attribute} ： ${items.attributeValues}`;
                }).toString()})</em>
                :
                '无'}
            </div>
          </Space>
          :
          '请选择生产物料'
        }
      </div>
      <Icon type="icon-arrow-right" />
    </NodeWrap>);
}

export default StartNode;
