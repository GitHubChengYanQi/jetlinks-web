import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {Col, Row} from 'antd';
import CustomerSelect from '@/pages/Crm/customer/CustomerEdit/components/CustomerSelect';
import AddCustomer from '@/pages/Crm/customer/components/AddCustomer';


const SelectAddCustomer = (props) => {

  const {value,onChange} = props;


  const [visible, setVisible] = useState(false);

  const [val, setVal] = useState();

  const [blur, setBlur] = useState();

  const {run} = useRequest({url: '/customer/detail', method: 'POST'}, {manual: true});

  useEffect(() => {
    if (value) {
      run({
        data: {
          customerId: value
        }
      }).then((res) => {
        setVal(res && res.customerName);
      });
    }
  }, []);


  return (
    <>
      <Row gutter={24}>
        <Col span={15}>
          <CustomerSelect
            value={val || null}
            method={false}
            onSuccess={async (value) => {
              const customer = await run({
                data: {
                  customerId: value
                }
              });
              onChange(value);
              // setVal(customer && customer.customerName);
              setBlur(true);
            }}
            onChange={(value) => {
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
          <AddCustomer {...props} visi={visible} setVal={(value) => {
            setVal(value);
          }} />
        </Col>
      </Row>


    </>
  );
};
export default SelectAddCustomer;
