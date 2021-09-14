
import React from 'react';
import Card from '@ant-design/pro-card/es/components/Card';
import Meta from 'antd/es/card/Meta';

const BusinessTableIndex = ((props) => {
  const {onChange, data} = props;

  return (
    <>
      <p >项目流程：</p>
      {data && data.length > 0 ? data.map((item, index) => {
        return (
          <div key={index} style={{width: 200, marginLeft: 50, marginBottom: 20}}>
            <Card
              hoverable
              bordered
              style={{backgroundColor: 'beige' }}
              // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              onClick={()=>{
                onChange(item);
              }}
            >
              <Meta title= {item.name} description="This is the description"  />
            </Card>
          </div>
        );
      }) : null }
    </>
  );
});


export default BusinessTableIndex;
