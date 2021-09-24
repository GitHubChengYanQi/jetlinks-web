import React from 'react';
import {Descriptions} from 'antd';

const Description = (props) => {

  const {data} = props;



  if (data) {
    return (
      <>
        <Descriptions column={2} bordered labelStyle={{width: 120}}>
          <Descriptions.Item label="项目编号">{data.businessId ?  data.businessId : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="销售流程">{data.sales ? data.sales.name: '未填写'}</Descriptions.Item>
          <Descriptions.Item label="客户">{data.customer ? data.customer.customerName: '未填写'}</Descriptions.Item>
          <Descriptions.Item label="项目名称">{data.businessName ?  data.businessName: '未填写'}</Descriptions.Item>
          {/*<Descriptions.Item label="负责人">{data.user ?  data.user.name: '未填写'}</Descriptions.Item>*/}
          <Descriptions.Item label="赢率">{data.process ? `${data.process.percentage}%` : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="立项日期">{data.time  ? data.time: '未填写'}</Descriptions.Item>
          {/*<Descriptions.Item label="项目阶段">{data.stage  ?  data.stage: '未填写'}</Descriptions.Item>*/}
          <Descriptions.Item label="商机来源">{data.origin  ? data.origin.originName: '未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }


};
export default Description;
