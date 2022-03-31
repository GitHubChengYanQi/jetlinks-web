import React from 'react';
import {Button, Card, List, Space, Typography} from 'antd';
import Empty from '@/components/Empty';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Note from '@/components/Note';
import Overflow from "@/components/Overflow";
import Label from "@/components/Label";
import styles from "@/pages/Test/MaterialAnalysis/index.module.less";
import CssPennants from "@/pages/Test/MaterialAnalysis/components/CssPennants";

const Recommended = ({data}) => {

  if (!Array.isArray(data)) {
    return <Empty description='请选择物料进行分析'/>;
  }

  return <>

    <Overflow defaultHeight={275} title={<a>查看更多组合</a>}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => {
          let color = '';
          switch (index) {
            case 0:
              color = '#feb042';
              break;
            case 1:
              color = '#dfdcd8';
              break;
            case 2:
              color = '#fb6c1f';
              break;
            default:
              color = `#${(Math.random() * (1 < 24)).toString(16)}`;
              break;
          }
          return <List.Item extra={<Button type='link'><Typography.Link underline>按此顺序生产</Typography.Link></Button>}>
            <List.Item.Meta
              avatar={<CssPennants value={index + 1} width={30} color={color}/>}
              title={`共可生产 ${item.num || 0} 件`}
              description={
                <div style={{overflow: 'hidden'}}>
                  <Space>
                    {item.result && item.result.map((item, index) => {
                      return <div style={{display: 'flex', maxWidth: 170}} key={index}>
                        <Label>{index + 1}.</Label>
                        <Note key={index}>
                          <SkuResultSkuJsons skuResult={item}/>
                        </Note>
                        <div style={{width:40,color:'green'}}>
                          × {item.produceMix}
                        </div>
                      </div>;
                    })}
                  </Space>
                </div>

              }
            />
          </List.Item>
        }}
      />
    </Overflow>

  </>;
};

export default Recommended;
