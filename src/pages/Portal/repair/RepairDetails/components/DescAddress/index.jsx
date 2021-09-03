import React from 'react';
import {Descriptions} from 'antd';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';

const DescAddress = (props) => {
  const {data} = props;

  if (data) {
    return (
      <>
        <Descriptions>
          <Descriptions.Item label="公司名称">{data.customerResult ? data.customerResult.customerName : '未填写'  }</Descriptions.Item>
          <Descriptions.Item label="省市区">{data.regionResult ?  `${data.regionResult[0].province}/${data.regionResult[0].city}/${data.regionResult[0].area}` : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="详细地址">{data.address ? data.address : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="报修人">{data.people ? data.people : '未填写'  }</Descriptions.Item>
          <Descriptions.Item label="报修人手机号">{data.telephone ? data.telephone : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="报修人职务">{data.position ? data.position : '未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return <>暂无信息</>;
  }

};

export default DescAddress;
