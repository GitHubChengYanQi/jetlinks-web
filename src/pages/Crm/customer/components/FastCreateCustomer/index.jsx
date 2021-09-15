import React, {useState} from 'react';
import {message, Button, Card, Input, Modal, Divider} from 'antd';
import {useRequest} from '@/util/Request';
import {customerAdd} from '@/pages/Crm/customer/CustomerUrl';
import {CloseOutlined} from '@ant-design/icons';
import style from './index.module.less';

const FastCreateCustomer = ({close, add}) => {

  const {run} = useRequest(customerAdd, {manual: true});

  const [value, setValue] = useState();

  return (
    <>
      <Card
        bodyStyle={{padding: '20px 0'}}
        extra={  <Button type="link" style={{padding: 0, float: 'right', lineHeight: '100%'}} onClick={() => {
          typeof close === 'function' && close();
        }}>
          <CloseOutlined />
        </Button>}
        title={
          <div>快速创建客户
          </div>
        }
        headStyle={{textAlign: 'center'}} bordered={false}>
        <Input placeholder="输入客户名称" onChange={(value) => {
          setValue(value.target.value);
        }} />
        <Divider style={{margin: '20px 0'}} />
        <div style={{textAlign: 'center'}}>
          <Button type="primary" onClick={async () => {
            if (value) {
              const data = await run(
                {
                  data: {
                    customerName: value
                  }
                }
              );
              typeof add === 'function' && add(data);
            } else {
              message.info('请输入客户名称！');
            }
          }}>创建新客户</Button>
        </div>
      </Card>
    </>
  );
};

export default FastCreateCustomer;
