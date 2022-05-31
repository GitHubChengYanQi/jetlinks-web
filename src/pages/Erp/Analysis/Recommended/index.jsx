import React, {useEffect, useState} from 'react';
import {Divider, List, Space} from 'antd';
import Empty from '@/components/Empty';
import Note from '@/components/Note';
import CssPennants from '@/pages/Erp/Analysis/CssPennants';

const Recommended = ({data}) => {


  const [content, setContent] = useState([]);

  const listItem = (item, index) => {
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
      key={index}
      id="listItem"
    >
      <List.Item.Meta
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        avatar={<div style={{width: 30, textAlign: 'center'}}>
          {startColor ?
            <CssPennants value={index + 1} width={30} startColor={startColor} endColor={endColor} /> : index + 1}
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
  };


  useEffect(() => {
    if (Array.isArray(data)) {
      const newData = data.filter((item, index) => index < 3);
      setContent([...newData.map((item, index) => listItem(item, index))]);
    }
  }, []);

  if (!Array.isArray(data)) {
    return <Empty description="请选择物料进行分析" />;
  }

  return <div>
    <List
      itemLayout="horizontal"
    >
      {content}
    </List>
    {(data.length > 3 && data.length !== content.length) && <Divider
      style={{cursor: 'pointer'}}
      onClick={() => {
        const newData = data.filter((item, index) => (index >= content.length) && (index < (content.length + 10)));
        setContent([...content, ...newData.map((item, index) => listItem(item, content.length + index))]);
      }}>
      <a>查看更多组合</a>
    </Divider>}
  </div>;
};

export default Recommended;
