import React, {useEffect, useRef} from 'react';
import {Button, Select as AntSelect, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import Modal from '@/components/Modal';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';
import PhoneEdit from '@/pages/Crm/phone/phoneEdit';
import AdressEdit from '@/pages/Crm/adress/AdressEdit';
import {useRequest} from '@/util/Request';

export const Customer = (props) => {

  const {customers, width, refresh, style, onChange, ...other} = props;

  return (<>
    <SelectCustomer width={width} {...other} onChange={(value) => {
      onChange(value);
    }} />
  </>);
};

export const Module = (props) => {

  const ref = useRef(null);
  const submitRef = useRef(null);

  const {width, customerId, contactsId, title, api, module, ...other} = props;

  const {data, run, refresh} = useRequest(
    api,
    {
      manual: true,
    }
  );

  const defaultValue = async () => {
    const res = await run({
      data: {customerId, contactsId},
    });
    if (res && res.length > 0)
      switch (module) {
        case 'contacts':
          other.onChange(res[0].contactsId);
          break;
        case 'address':
          other.onChange(res[0].adressId);
          break;
        case 'phone':
          other.onChange(res[0].phoneId);
          break;
        default:
          return null;
      }
  };

  useEffect(() => {
    if (customerId || contactsId) {
      defaultValue();
    }
  }, [customerId, contactsId]);

  const options = data ? data.map((item) => {
    switch (module) {
      case 'contacts':
        return {
          label: item.contactsName,
          value: item.contactsId
        };
      case 'address':
        return {
          label: item.location,
          value: item.adressId
        };
      case 'phone':
        return {
          label: item.phoneNumber,
          value: item.phoneId
        };
      default:
        return null;
    }
  }) : [];


  const type = () => {
    switch (module) {
      case 'contacts':
        return <ContactsEdit
          ref={submitRef}
          customerId={customerId}
          onSuccess={(value) => {
            other.onChange(value);
            refresh();
            ref.current.close();
          }}
        />;
      case 'address':
        return <AdressEdit
          value={false}
          customer={customerId}
          onSuccess={(value) => {
            other.onChange(value);
            refresh();
            ref.current.close();
          }}
        />;
      case 'phone':
        return <PhoneEdit
          value={false}
          contactsId={contactsId}
          onSuccess={(value) => {
            other.onChange(value);
            refresh();
            ref.current.close();
          }}
        />;
      default:
        return null;
    }
  };

  return (<Space>
    <AntSelect
      allowClear
      showSearch
      onClear={() => {
        other.onChange(null);
      }}
      style={{width}}
      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      options={options}
      {...other}
    />
    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />
    <Modal
      width={1000}
      title={title}
      ref={ref}
      footer={module === 'contacts' &&
      <>
        <Button type="primary" onClick={() => {
          submitRef.current.formRef.current.submit();
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
      {type()}
    </Modal>
  </Space>);
};
