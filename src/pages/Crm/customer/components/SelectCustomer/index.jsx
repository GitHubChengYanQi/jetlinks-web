import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {Col, Row} from 'antd';
import CustomerSelect from '@/pages/Crm/customer/CustomerEdit/components/CustomerSelect';
import AddCustomerButton from '@/pages/Crm/customer/components/AddCustomerButton';


const SelectCustomer = (props) => {

  const {value,onChange} = props;


  const [visible, setVisible] = useState(false);

  const [blur, setBlur] = useState();

  const {run} = useRequest({url: '/customer/detail', method: 'POST'}, {manual: true});

  useEffect(() => {
    if (value) {
      run({
        data: {
          customerId: value
        }
      }).then((res) => {
        onChange(res);
      });
    }
  }, []);


  return (
    <>
      <Row gutter={24}>
        <Col span={15}>
          <CustomerSelect
            value={value && value.customerName}
            method={false}
            onSuccess={async (value) => {
              const customer = await run({
                data: {
                  customerId: value
                }
              });
              onChange(customer);
              setBlur(true);
            }}
            onChange={(value) => {
              onChange(value);
              setVisible(value);
              setBlur(false);
            }}
            onblur={()=>{
              if (!blur){
                onChange(null);
              }
            }}
          />
        </Col>
        <Col span={9}>
          <AddCustomerButton {...props} visi={visible} onChange={(value) => {
            onChange(value);
          }} />
        </Col>
      </Row>


    </>
  );
};
export default SelectCustomer;
