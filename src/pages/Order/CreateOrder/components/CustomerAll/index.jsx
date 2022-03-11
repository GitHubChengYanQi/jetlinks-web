import React, {useEffect, useRef, useState} from 'react';
import {Button, message, Spin} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Select from '@/components/Select';
import Modal from '@/components/Modal';
import AdressEdit from '@/pages/Crm/adress/AdressEdit';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';
import PhoneEdit from '@/pages/Crm/phone/phoneEdit';
import {useRequest} from '@/util/Request';
import {bankListSelect} from '@/pages/Purshase/bank/bankUrl';
import BankEdit from '@/pages/Purshase/bank/bankEdit';
import InvoiceEdit from '@/pages/Crm/invoice/invoiceEdit';

export const Customer = (props) => {
  return (<SelectCustomer width="100%" supply={null} noAdd {...props} />);
};

export const Adress = (props) => {

  const {customerId, options, defaultValue, ...other} = props;

  const [option, setOption] = useState([]);

  useEffect(() => {
    setOption(options || []);
    props.onChange(defaultValue || null);
  }, [customerId]);

  const ref = useRef();

  const submitRef = useRef();

  return <>
    <Select options={option || []} {...other} />

    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />

    <Modal
      width={500}
      headTitle="添加地址"
      ref={ref}
      footer={<>
        <Button type="primary" onClick={() => {
          submitRef.current.submit();
        }}>
          保存
        </Button>
        <Button onClick={() => {
          ref.current.close();
        }}>
          取消
        </Button>
      </>}
    >
      <AdressEdit
        ref={submitRef}
        onSuccess={(res) => {
          ref.current.close();
          const array = option.filter(() => true);
          array.push({
            label: res.detailLocation || res.location,
            value: res.adressId,
          });
          setOption(array);
          props.onChange(res.adressId);
        }}
        value={false}
        customer={customerId}
        NoButton={false}
      />
    </Modal>
  </>;
};

export const Contacts = (props) => {

  const {customerId, options, defaultValue, ...other} = props;

  const [option, setOption] = useState([]);

  useEffect(() => {
    setOption(options || []);
    props.onChange(defaultValue || null);
  }, [customerId]);

  const ref = useRef();

  const submitRef = useRef();

  return <>
    <Select options={option || []} {...other} />

    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />

    <Modal
      width={500}
      headTitle="添加联系人"
      ref={ref}
      footer={<>
        <Button type="primary" onClick={() => {
          submitRef.current.submit();
        }}>
          保存
        </Button>
        <Button onClick={() => {
          ref.current.close();
        }}>
          取消
        </Button>
      </>}
    >
      <ContactsEdit
        ref={submitRef}
        onSuccess={(res) => {
          ref.current.close();
          const array = option.filter(() => true);
          array.push({
            label: res.contactsName,
            value: res.contactsId,
          });
          setOption(array);
          props.onChange(res.contactsId);
        }}
        value={false}
        customerId={customerId}
      />
    </Modal>
  </>;
};

export const Phone = (props) => {

  const {contactsId, options, defaultValue, ...other} = props;

  const [option, setOption] = useState([]);

  useEffect(() => {
    setOption(options || []);
    props.onChange(defaultValue || null);
  }, [contactsId]);

  const ref = useRef();

  const submitRef = useRef();

  return <>
    <Select options={option || []} {...other} />

    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      if (contactsId) {
        ref.current.open(false);
      } else {
        message.warn('请先选择联系人！');
      }

    }} />

    <Modal
      width={500}
      headTitle="添加联系人电话"
      ref={ref}
      footer={<>
        <Button type="primary" onClick={() => {
          submitRef.current.submit();
        }}>
          保存
        </Button>
        <Button onClick={() => {
          ref.current.close();
        }}>
          取消
        </Button>
      </>}
    >
      <PhoneEdit
        NoButton={false}
        ref={submitRef}
        onSuccess={(res) => {
          ref.current.close();
          const array = option.filter(() => true);
          array.push({
            label: `${res.phoneNumber.toString().substring(0, 3)}****${res.phoneNumber.toString().substring(7)}`,
            value: res.phoneId,
          });
          setOption(array);
          props.onChange(res.phoneId);
        }}
        value={false}
        contactsId={contactsId}
      />
    </Modal>
  </>;
};

export const BankAccount = (props) => {

  const {customerId, bankId, options, defaultValue, ...other} = props;
  console.log(defaultValue,options);

  const [option, setOption] = useState([]);

  useEffect(() => {
    if (customerId && options) {
      let array = options;
      if (bankId) {
        array = options.filter((item) => {
          return item.id === bankId;
        });
      }
      props.onChange(defaultValue || null);
      setOption(array || []);
    }else {
      setOption([]);
      props.onChange(null);
    }
  }, [customerId, bankId]);

  const ref = useRef();

  const submitRef = useRef();

  return <>
    <Select options={option || []} {...other} />

    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      if (customerId) {
        ref.current.open(false);
      } else {
        message.warn('请先选择客户！');
      }

    }} />

    <Modal
      width={500}
      headTitle="添加银行账户"
      ref={ref}
      footer={<>
        <Button type="primary" onClick={() => {
          submitRef.current.submit();
        }}>
          保存
        </Button>
        <Button onClick={() => {
          ref.current.close();
        }}>
          取消
        </Button>
      </>}
    >

      <InvoiceEdit
        ref={submitRef}
        bankId={bankId}
        value={false}
        NoButton={false}
        customerId={customerId}
        onSuccess={(res) => {
          ref.current.close();
          if (res.data) {
            const array = option.filter(() => true);
            array.push({
              label: res.data.bankAccount,
              value: res.data.invoiceId,
            });
            setOption(array);
            props.onChange(res.data.invoiceId);
          }

        }} />

    </Modal>
  </>;
};

export const Bank = (props) => {

  const {customerId, defaultValue, ...other} = props;

  useEffect(() => {
    props.onChange(defaultValue || null);
  }, [customerId]);

  const {loading, data, refresh} = useRequest(bankListSelect);

  const ref = useRef();

  const submitRef = useRef();

  return loading ? <Spin /> : <>
    <Select options={data || []} {...other} />

    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />

    <Modal
      width={500}
      headTitle="银行"
      ref={ref}
      footer={<>
        <Button type="primary" onClick={() => {
          submitRef.current.submit();
        }}>
          保存
        </Button>
        <Button onClick={() => {
          ref.current.close();
        }}>
          取消
        </Button>
      </>}
    >
      <BankEdit ref={submitRef} value={false} NoButton={false} onSuccess={(res) => {
        refresh();
        if (res && res.data) {
          props.onChange(res.data.bankId);
        }
      }} />
    </Modal>
  </>;
};

