import React, {useEffect, useState} from 'react';
import {Button, List, Space, Typography} from 'antd';
import Empty from '@/components/Empty';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Note from '@/components/Note';
import Overflow from '@/components/Overflow';
import CssPennants from '@/pages/Erp/Analysis/CssPennants';

const Recommended = ({data}) => {

  const [overFlowheight, setoverFlowHeight] = useState(300);

  useEffect(() => {
    setoverFlowHeight((window.document.getElementById('listItem').clientHeight * 3) + 48);
  }, [data]);

  if (!Array.isArray(data)) {
    return <Empty description='请选择物料进行分析'/>;
  }

  const list = () => {
    return <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => {
        let startColor = '';
        let endColor = '';
        switch (index) {
          case 0:
            startColor = '#d18e32';
            endColor = '#f1dc83';
            break;
          case 1:
            startColor = '#8e9190';
            endColor = '#d1d4d3';
            break;
          case 2:
            startColor = '#b45a41';
            endColor = '#ffc194';
            break;
          default:
            break;
        }
        return <List.Item
          id='listItem'
          // extra={<Button type='link'><Typography.Link underline>按此顺序生产</Typography.Link></Button>}
        >
          <List.Item.Meta
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            avatar={<div style={{width: 30, textAlign: 'center'}}>
              {startColor ?
                <CssPennants value={index + 1} width={30} startColor={startColor} endColor={endColor}/> : index + 1}
            </div>}
            title={`共可生产 ${item.num || 0} 件`}
            description={
              <div style={{overflow: 'hidden'}}>
                <Space wrap>
                  {item.result && item.result.map((item, index) => {
                    return <div style={{display: 'flex'}} key={index}>
                      <div style={{margin: '0 4px', color: '#000'}}>
                        {index + 1}.
                      </div>
                      <div style={{margin: '0 4px'}}>
                        <Note key={index} width={170}>
                          {item.spuName} / {item.skuName} {item.specifications ? ` / ${item.specifications}` : ''}
                        </Note>
                      </div>
                      <div style={{color: 'green', margin: '0 4px'}}>
                        × {item.produceMix}
                      </div>
                    </div>;
                  })}
                </Space>
              </div>

            }
          />
        </List.Item>;
      }}
    />;
  };

  return <>

    {data.length > 3 ?
      <Overflow defaultHeight={overFlowheight} title={<a>查看更多组合</a>}>
        {list()}
      </Overflow>
      :
      list()
    }

  </>;
};

export default Recommended;
