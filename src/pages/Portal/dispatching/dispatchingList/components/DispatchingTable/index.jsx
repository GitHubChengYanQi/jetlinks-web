import React from 'react';
import {Descriptions} from 'antd';

const DispatchingTable = (props) => {

  const {value} = props;

  return (
    <Descriptions layout="vertical" bordered>
      <Descriptions.Item label="姓名">{value.name || '未填写'}</Descriptions.Item>
      <Descriptions.Item label="手机号">{value.phone || '未填写'}</Descriptions.Item>
      <Descriptions.Item label="预计到达时间">{value.time || '未填写'}</Descriptions.Item>
      <Descriptions.Item label="负责区域">{value.address || '未填写'}</Descriptions.Item>
      <Descriptions.Item label="状态">{value.state || '未填写'}</Descriptions.Item>
      <Descriptions.Item label="备注">{value.note || '未填写'}</Descriptions.Item>
      <Descriptions.Item label="完成照片">{value.imgUrl || '未填写'}</Descriptions.Item>
      <Descriptions.Item label="评价">{value.evaluation || '未填写'}</Descriptions.Item>
    </Descriptions>
  );
};

export default DispatchingTable;
