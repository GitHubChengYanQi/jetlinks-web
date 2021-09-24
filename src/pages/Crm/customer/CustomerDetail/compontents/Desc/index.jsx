import React from 'react';
import {Descriptions} from 'antd';
import InputEdit from '@/pages/Crm/customer/components/Edit/InputEdit';
import {useRequest} from '@/util/Request';
import {customerEdit} from '@/pages/Crm/customer/CustomerUrl';
import SelectEdit from '@/pages/Crm/customer/components/Edit/SelectEdit';

const Desc = (props) => {

  const {data} = props;

  const {run} = useRequest(customerEdit, {manual: true});


  if (data){

    return (
      <>
        <Descriptions title="基础数据">
          <Descriptions.Item label="法定代表人" ><InputEdit value={data.legal} onChange={async (value)=>{
            await run({
              data:{
                ...data,
                legal:value
              }
            });
          }} /></Descriptions.Item>
          <Descriptions.Item label="客户级别"><SelectEdit value={data.customerLevelId} val={data.crmCustomerLevelResult && data.crmCustomerLevelResult.level} onChange={async (value)=>{
            await run({
              data:{
                ...data,
                customerLevelId:value
              }
            });
          }} /></Descriptions.Item>
          <Descriptions.Item label="客户状态">{data.status  ? data.status :'未填写'}</Descriptions.Item>
          <Descriptions.Item label="负责人">{data.userResult  ? data.userResult.name :'未填写'}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return null;
  }

};

export default Desc;
