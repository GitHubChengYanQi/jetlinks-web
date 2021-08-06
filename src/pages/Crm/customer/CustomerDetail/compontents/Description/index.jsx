import React from 'react';
import {Descriptions} from 'antd';

const Description = (props) => {

  const {data} = props;
  if (data){

    return (
      <>
        <Descriptions column={2} bordered labelStyle={{width: 120}}>
          <Descriptions.Item label="客户名称">{data.customerLevelId ? data.customerName : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="客户编号">{data.customerId ? data.customerId : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="客户级别">{data.lname ? data.lname : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="法定代表人">{data.legal ? data.legal : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="负责人">{data.userId ? data.userId : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="客户状态">{data.status ? data.status : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">{data.utscc ? data.utscc : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="公司类型">{data.companyType ? data.companyType : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="成立时间">{data.setup ? data.setup : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="营业期限">{data.businessTerm ? data.businessTerm : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="注册地址">{data.signIn ? data.signIn : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="简介">{data.introduction ? data.introduction : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="备注">{data.note ? data.note : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="客户来源">{data.oname ? data.oname : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{data.emall ? data.emall : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="网址">{data.url ? data.url : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="一级行业">{data.industryName ? data.industryName : '未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return null;
  }

};
export default Description;
