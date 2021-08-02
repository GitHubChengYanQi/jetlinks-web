import React from 'react';
import { Descriptions } from 'antd';

const Description = (props) => {

  const {data} = props;

  return (
    <>
      <Descriptions column={2} bordered labelStyle={{width:120}} >
        <Descriptions.Item label="客户名称">{data.customerLevelId === "" ? '未填写' :  data.customerName}</Descriptions.Item>
        <Descriptions.Item label="客户编号">{data.customerId === "" ? '未填写' :  data.customerId}</Descriptions.Item>
        <Descriptions.Item label="客户级别">{data.customerLevelId === "" ? '未填写' :  data.customerLevelId}</Descriptions.Item>
        <Descriptions.Item label="法定代表人">{data.legal === "" ? '未填写' :  data.legal}</Descriptions.Item>
        <Descriptions.Item label="负责人">{data.userId === "" ? '未填写' :  data.userId}</Descriptions.Item>
        <Descriptions.Item label="客户状态">{data.status === "" ? '未填写' :  data.status}</Descriptions.Item>
        <Descriptions.Item label="统一社会信用代码">{data.utscc === "" ? '未填写' :  data.utscc}</Descriptions.Item>
        <Descriptions.Item label="公司类型">{data.companyType === "" ? '未填写' :  data.companyType}</Descriptions.Item>
        <Descriptions.Item label="成立时间">{data.setup === "" ? '未填写' :  data.setup}</Descriptions.Item>
        <Descriptions.Item label="营业期限">{data.businessTerm === "" ? '未填写' :  data.businessTerm}</Descriptions.Item>
        <Descriptions.Item label="注册地址">{data.signIn === "" ? '未填写' :  data.signIn}</Descriptions.Item>
        <Descriptions.Item label="简介">{data.introduction === "" ? '未填写' :  data.introduction}</Descriptions.Item>
        <Descriptions.Item label="备注">{data.note === "" ? '未填写' :  data.note}</Descriptions.Item>
        <Descriptions.Item label="客户来源">{data.oname === "" ? '未填写' :  data.oname}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{data.emall === "" ? '未填写' :  data.emall}</Descriptions.Item>
        <Descriptions.Item label="网址">{data.url === "" ? '未填写' :  data.url}</Descriptions.Item>
        <Descriptions.Item label="一级行业">{data.industryOne === "" ? '未填写' :  data.industryOne}</Descriptions.Item>
        <Descriptions.Item label="二级行业">{data.industryTwo === "" ? '未填写' :  data.industryTwo}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default Description;
