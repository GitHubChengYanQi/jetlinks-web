import React from 'react';
import {Descriptions} from 'antd';

const Description = (props) => {

  const {data} = props;
  if (data){
    return (
      <>
        <Descriptions column={2} bordered labelStyle={{width: 120}}>
          <Descriptions.Item label="竞争对手公司名称">{data.name ? data.name : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{data.phone ? data.phone : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{data.email ? data.email : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="地区">{
            data.regionResult ? `${data.regionResult.countries
            }-${data.regionResult.province
            }-${data.regionResult.city
            }-${data.regionResult.area}` : '未填写'}</Descriptions.Item>
          <Descriptions.Item  label="竞争级别">{data.level ? data.level : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="员工规模">{data.staffSize ? data.staffSize : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="公司所有制">{data.ownership ? data.ownership : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="年销售">{data.annualSales ? data.annualSales : '未填写'}</Descriptions.Item>
          <Descriptions.Item span={2} label="网址">{data.url ? data.url : '未填写'}</Descriptions.Item>
          <Descriptions.Item span={2} label="公司简介">{data.companyProfile ? data.companyProfile : '未填写'}</Descriptions.Item>
          <Descriptions.Item span={2} label="对手优势">{data.rivalAdvantage ? data.rivalAdvantage : '未填写'}</Descriptions.Item>
          <Descriptions.Item span={2} label="对手劣势">{data.opponentsWeaknesses ? data.opponentsWeaknesses : '未填写'}</Descriptions.Item>
          <Descriptions.Item span={2} label="采取对策">{data.takeCountermeasures ? data.takeCountermeasures : '未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return null;
  }

};
export default Description;
