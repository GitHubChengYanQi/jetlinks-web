
import React from 'react';
import Card from '@ant-design/pro-card/es/components/Card';
import Meta from 'antd/es/card/Meta';

const BusinessTableIndex = ((props) => {
  const {onChange, data} = props;

  return (
    <>
      <p >商机流程：</p>
      {data && data.length > 0 ? data.map((item, index) => {
        return (
          <div key={index} style={{ marginLeft: 20, marginBottom: 20}}>
            <Card
              hoverable
              style={{ width: 200,backgroundColor: 'azure' }}
              // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              onClick={()=>{
                onChange(item);
              }}
            >
              <Meta title= {item.name}  />
            </Card>
          </div>
        );
      }) : null }
    </>
  );
});


export default BusinessTableIndex;
