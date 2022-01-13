import React, {useState} from 'react';
import {message, Button, Card, Input, Modal, Divider} from 'antd';
import {useRequest} from '@/util/Request';
import {customerAdd} from '@/pages/Crm/customer/CustomerUrl';
import {CloseOutlined} from '@ant-design/icons';
import style from './index.module.less';

const FastCreateCustomer = ({close,supply, add}) => {

  const {run} = useRequest(customerAdd, {
    manual: true,
    onError:(error)=>{
      message.error(error.message);
    }
  });

  const [value, setValue] = useState();

  return (
    <>
      <Card
        className={style.card}
        bodyStyle={{padding: '10px 0'}}
        extra={<Button type="link" style={{padding: 0, float: 'right'}} onClick={() => {
          typeof close === 'function' && close();
        }}>
          <CloseOutlined />
        </Button>}
        title={
          <div>{supply ? '快速创建供应商' : '快速创建客户'}</div>
        }
        headStyle={{textAlign: 'center',padding:0,minHeight:40}} bordered={false}>
        <Input placeholder={supply ? '输入供应商名称' : '输入客户名称'} onChange={(value) => {
          setValue(value.target.value);
        }} />
        <Divider style={{margin: '10px 0'}} />
        <div style={{textAlign: 'center'}}>
          <Button type="primary" style={{width:'100%'}} onClick={async () => {
            if (value) {
              const data = await run(
                {
                  data: {
                    customerName: value,
                    supply,
                  }
                }
              );
              typeof add === 'function' && add(data.customerId);
            } else {
              message.warn(supply ? '请输入供应商名称' : '请输入客户名称！');
            }
          }}>{supply ? '创建新供应商' : '创建新客户'}</Button>
        </div>
      </Card>
    </>
  );
};

export default FastCreateCustomer;
