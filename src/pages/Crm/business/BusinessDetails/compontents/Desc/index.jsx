import React from 'react';
import {Button, Descriptions} from 'antd';
import {useHistory} from 'ice';

const Desc = (props) => {

  const history = useHistory();

  const {data} = props;
  if (data) {
    return (
      <>
        <Descriptions title="基础数据">
          <Descriptions.Item label="客户名称">{data.customer ? <a onClick={()=>{
            history.push(`/CRM/customer/${data.customerId}`);
          }}>{data.customer.customerName}</a> : '未填写'  }</Descriptions.Item>
          <Descriptions.Item label="负责人">{data.user ?  data.user.name: '未填写'}</Descriptions.Item>
          <Descriptions.Item label="项目阶段">{data.stage ? data.stage : '未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return null;
  }

};

export default Desc;
