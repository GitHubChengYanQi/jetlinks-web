import React from 'react';
import Meta from 'antd/es/card/Meta';
import {Card} from 'antd';

const gridStyle = {
  width: '100%',
  textAlign: 'center',
  cursor:'pointer'
};

const BusinessTableIndex = ((props) => {
  const {onChange, data} = props;

  return (
    <Card>
      {
        data && data.length > 0 ? data.map((item, index) => {
          return (
            <Card.Grid
              style={gridStyle}
              key={index}
              hoverable
              // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              onClick={() => {
                onChange(item);
              }}
            >
              <Meta title={item.name} description={item.note} />
            </Card.Grid>
          );
        }) : null
      }
    </Card>
  );
});


export default BusinessTableIndex;
