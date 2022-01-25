import React from 'react';
import {FormItem} from '@formily/antd';
import * as SysField from './SysField';
import {contactsList} from '@/pages/Crm/contacts/contactsUrl';
import {adressList} from '@/pages/Crm/adress/AdressUrl';
import {phoneList} from '@/pages/Crm/phone/phoneUrl';


const CustomerAll = ({customerId, customer, contacts, adress, phone,supply, width}) => {

  return (
    <>
      <FormItem
        label="客户"
        width={width || 200}
        value={customerId}
        name={customer || 'customerId'}
        supply={supply}
        component={customerId ? SysField.CustomerId : SysField.Customer}
        placeholder="请选择客户"
        required
      />
      <FormItem
        width={width || 200}
        label="联系人"
        api={contactsList}
        name={contacts || 'contactsId'}
        component={SysField.Module}
        module='contacts'
        title='联系人'
        placeholder="请选择联系人"
        required
      />
      <FormItem
        width={width || 200}
        label="电话"
        api={phoneList}
        name={phone || 'phoneId'}
        module='phone'
        title='电话'
        component={SysField.Module}
        placeholder="请选择电话"
        required
      />
      <FormItem
        width={width || 200}
        api={adressList}
        label="地址"
        title='地址'
        name={adress || 'adressId'}
        component={SysField.Module}
        module='address'
        placeholder="请选择地址"
        required
      />

    </>
  );
};

export default CustomerAll;
