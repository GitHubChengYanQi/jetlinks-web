import React from 'react';
import {Button, Descriptions, Tag} from 'antd';
import {useHistory} from 'ice';

const Desc = (props) => {

  const {data} = props;

  const history = useHistory();

  if (data) {

    return (
      <>
        <Descriptions title="基础数据">
          <Descriptions.Item label="竞争商机">{data.crmBusinessList.length>0 ? data.crmBusinessList.map((items,index)=>{
            return (
              <Tag color='blue' key={index}>
                <a type='link' onClick={()=>{
                  history.push(`/CRM/business/${items.businessId}`);
                }}>{items.businessName}</a>
              </Tag>
            );
          }) : '无竞争商机'}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{data.phone ? data.phone : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{data.email ? data.email : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="地区">{
            data.regionResult ? `${data.regionResult.countries
            }-${data.regionResult.province
            }-${data.regionResult.city
            }-${data.regionResult.area}` : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="竞争级别">{data.level ? data.level : '未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  } else {
    return null;
  }

};

export default Desc;
