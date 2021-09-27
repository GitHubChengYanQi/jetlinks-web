import React from 'react';
import {Descriptions} from 'antd';
import {useHistory} from 'ice';
import UserEdit from '@/pages/Crm/customer/components/Edit/UserEdit';
import {useRequest} from '@/util/Request';
import {businessEdit} from '@/pages/Crm/business/BusinessUrl';

const Desc = (props) => {

  const history = useHistory();

  const {run} = useRequest(businessEdit,{manual:true});

  const {data} = props;
  if (data) {
    return (
      <>
        <Descriptions title="基础数据">
          <Descriptions.Item label="客户名称">{data.customer ? <a onClick={() => {
            history.push(`/CRM/customer/${data.customerId}`);
          }}>{data.customer.customerName}</a> : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="负责人"><UserEdit value={data.user && data.user.name} onChange={async (value) => {
            await run({
              data: {
                ...data,
                userId:value
              }
            });
          }} userId={data.userId} /></Descriptions.Item>
        </Descriptions>
      </>
    );
  } else {
    return null;
  }

};

export default Desc;
