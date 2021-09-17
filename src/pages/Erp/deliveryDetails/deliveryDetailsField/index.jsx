/**
 * 字段配置页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {useEffect} from 'react';
import {
  Input,
  Select as AntSelect
} from 'antd';
import Select from '@/components/Select';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import * as apiUrl from '../deliveryDetailsUrl';


export const Customer = (props) => {
  const {customerid, onChange} = props;
  return (<>
    <SelectCustomer {...props} onChange={(value) => {
      onChange(value);
      customerid(value);
    }} />
  </>);
};

export const Contacts = (props) => {
  const {customerid, contactsid, onChange,state} = props;

  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [customerid || null]);
  }

  const data = customerid ? customerid.map((value, index) => {
    return {
      label: value.contactsName,
      value: value.contactsId,
    };
  }) : null;


  return (<>
    <AntSelect style={{width: 200}} options={data}  {...props} onChange={(value) => {
      onChange(value);
      contactsid ? contactsid(value) : null;
    }} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} />
  </>);
};
export const Phone = (props) => {
  const {contactsid,state} = props;
  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [contactsid || null]);
  }
  const data = contactsid ? contactsid.map((value) => {
    return {
      label: value.phoneNumber,
      value: value.phoneId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} {...props} />
  </>);
};
export const Adress = (props) => {
  const {customerid,state} = props;
  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [customerid || null]);
  }
  const data = customerid ? customerid.map((value) => {
    return {
      label: value.location,
      value: value.adressId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} {...props} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} />
  </>);
};


export const ItemId = (props) =>{
  return (<Select api={apiUrl.items} {...props}/>);
};
export const CustomerId = (props) =>{
  return (<Select api={apiUrl.customer} {...props}/>);
};
export const AdressId = (props) =>{
  return (<Select api={apiUrl.adress} {...props}/>);
};
export const ContactsId = (props) =>{
  return (<Select api={apiUrl.contacts} {...props}/>);
};
export const PhoneId = (props) =>{
  return (<Select api={apiUrl.phone} {...props}/>);
};
export const DeliveryId = (props) =>{
  return (<Input {...props}/>);
};
export const Ids = (props) =>{
  return (<Input {...props}/>);
};
