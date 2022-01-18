import React, {useState} from 'react';
import {Button, Space} from 'antd';
import {Module} from '@/pages/Crm/contract/components/CustomerAll/SysField';
import {contactsList} from '@/pages/Crm/contacts/contactsUrl';
import {phoneList} from '@/pages/Crm/phone/phoneUrl';
import {adressList} from '@/pages/Crm/adress/AdressUrl';

const Customer = ({value = {},onSuccess=()=>{}}) => {

  const {customerId,key,...other} = value;
  console.log(value);

  const [contactsId,setContactsId] = useState(other.contactsId);
  const [phoneId,setPhoneId] = useState(other.phoneId);
  const [addressId,setAddressId] = useState(other.addressId);

  return <div style={{padding: 16}}>
    <Space direction="vertical">
      <Module
        value={contactsId}
        onChange={(value) => {
          setContactsId(value);
        }}
        width={200}
        customerId={customerId}
        placeholder='选择联系人'
        title="联系人"
        api={contactsList}
        module="contacts"
      />
      <Module
        value={phoneId}
        placeholder='选择电话'
        onChange={(value) => {
          setPhoneId(value);
        }}
        width={200}
        contactsId={contactsId}
        title="电话"
        api={phoneList}
        module="phone"
      />
      <Module
        placeholder='选择地址'
        value={addressId}
        onChange={(value) => {
          setAddressId(value);
        }}
        width={200}
        customerId={customerId}
        title="地址"
        api={adressList}
        module="address"
      />
      <Button style={{width:'100%'}} type='link' onClick={()=>{
        onSuccess({
          key,
          contactsId,
          phoneId,
          addressId
        });
      }}>保存</Button>
    </Space>
  </div>;
};

export default Customer;
