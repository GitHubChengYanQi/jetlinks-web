import React, {useState} from 'react';
import {message, Button, Card, Input} from 'antd';
import {useRequest} from '@/util/Request';
import {customerAdd} from '@/pages/Crm/customer/CustomerUrl';

const FastCreateCustomer = ({close,add}) => {

  const {run} = useRequest(customerAdd,{manual:true});

  const [value,setValue] = useState();
  console.log(value);

  return (
    <>
      <Card tabList={[{tab:'输入客户名称',key:0}]} bordered={false}>
        <Input onChange={(value)=>{
          setValue(value.target.value);
        }}/>
        <Button type='link' onClick={async ()=>{
          if (value){
            const data = await run(
              {
                data:{
                  customerName:value
                }
              }
            );
            typeof add === 'function' && add(data);
          }else {
            message.info('请输入客户名称！');
          }
        }}>保存</Button>
        <Button type='link' onClick={()=>{
          typeof close === 'function' && close();
        }}>取消</Button>
      </Card>
    </>
  );
};

export default FastCreateCustomer;
