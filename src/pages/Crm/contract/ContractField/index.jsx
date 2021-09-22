/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, InputNumber, Select as AntSelect} from 'antd';
import parse from 'html-react-parser';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/contract/ContractUrl';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import ChooseCustomer from '@/pages/Crm/contract/components/Choose';
import DatePicker from '@/components/DatePicker';
import ItemsList from '@/pages/Erp/items/ItemsList';
import ErpPackageList from '@/pages/Erp/package/packageList';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import TableDetail from '@/pages/Crm/contract/ContractEdit/components/TableDetail';
import {PlusOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';

export const CustomerId = (props) => {
  return (<Select disabled api={apiUrl.CustomerNameListSelect} {...props} />);
};

export const Customer = (props) => {

  const {customers, onChange} = props;

  return (<>
    <SelectCustomer {...props} onChange={(value) => {
      onChange(value && value.customerId);
      customers(value && value.customerId);
    }} />
  </>);
};

export const Contacts = (props) => {

  const ref = useRef(null);

  const {customers,customerIds, contact, onChange} = props;
  
  const data = customers ? customers.map((value, index) => {
    return {
      label: value.contactsName,
      value: value.contactsId,
    };
  }) : [];


  useEffect(() => {
    props.onChange(data.length > 0 && data[0].value);
    contact ? contact(data.length > 0 && data[0].value) : null;
  }, [customers || null]);


  return (<>
    <AntSelect style={{display:'inline-block',width:200}} options={data}  {...props} onChange={(value) => {
      onChange(value);
      contact ? contact(value) : null;
    }} />
    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />
    <Modal component={ContactsEdit} customerId={customerIds || null} ref={ref} />
  </>);
};
export const Phone = (props) => {
  const {contacts} = props;

  const ref = useRef(null);

  const data = contacts ? contacts.map((value) => {
    return {
      label: value.phoneNumber,
      value: value.phoneId,
    };
  }) : [];

  useEffect(() => {
    props.onChange(data.length > 0 && data[0].value);
  }, [contacts || null]);

  return (<>
    <AntSelect style={{display:'inline-block',width:200}} options={data} {...props} />
    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />
  </>);
};
export const Adress = (props) => {
  const {customers} = props;

  const ref = useRef(null);

  const data = customers ? customers.map((value) => {
    return {
      label: value.location,
      value: value.adressId,
    };
  }) : [];
  useEffect(() => {
    props.onChange(data.length > 0 && data[0].value);
  }, [customers || null]);
  return (<>
    <AntSelect style={{display:'inline-block',width:200}} options={data} {...props} />
    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />
  </>);
};


export const Name = (props) => {
  return (<Input  {...props} />);
};


export const Note = (props) => {
  return (<Input  {...props} />);
};

export const Time = (props) => {
  return (<DatePicker  {...props} />);
};
export const Audit = (props) => {
  props.onChange(props.value || 0);
  return (<AntSelect
    disabled
    defaultValue={[0]}
    allowClear
    options={[{label: '不合格', value: 0}, {label: '合格', value: 1}]}    {...props} />);
};

export const CustomerNameListSelect = (props) => {
  return (<Select api={apiUrl.CustomerNameListSelect} {...props} />);
};

export const Template = (props) => {

  return (<>
    <Select api={apiUrl.templateSelect} {...props} />
  </>);
};

export const ContentUpdate = (props) => {


  return (
    <>
      {
        parse(props.value)
      }
    </>
  );
};


export const Content = (props) => {


  const {result} = props;


  const [state, setState] = useState('文本框');


  return (
    <>
      {
        parse(props.value, {
          replace: domNode => {
            if (domNode.name === 'strong' && domNode.attribs.class === 'inp') {
              return <Input style={{width: '100px', margin: '0 10px'}} onChange={(value) => {
                setState(value.target.value);
              }} onBlur={() => {
                // domNode.children[0].data=state;
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'number') {
              return <InputNumber min={0} style={{margin: '0 10px'}} onChange={(value) => {
                setState(value);
              }} onBlur={() => {
                // domNode.children[0].data=state;
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'date') {
              return <DatePicker style={{margin: '0 10px'}} onChange={(value,date) => {
                const values = props.value.replace(domNode.children[0].data, date);
                props.onChange(values);
              }}  />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'but') {
              return (<>
                <ChooseCustomer Table={CustomerTable} domNode={domNode} record={(record) => {
                  const value = props.value.replace(domNode.children[0].data, record.customerName);
                  props.onChange(value);
                }} {...props} />
              </>);
            }


            if (domNode.name === 'strong' && domNode.attribs.class === 'items' && domNode.children[0].data === '选择产品') {
              return (<>
                <ChooseCustomer Table={ItemsList} domNode={domNode} record={(record) => {
                  const value = props.value.replace(domNode.children[0].data, record.name);
                  props.onChange(value);
                }} {...props} />
              </>);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertPackage' && domNode.children[0].data === '选择套餐') {
              return (<>
                <ChooseCustomer Table={ErpPackageList} domNode={domNode} record={(rec) => {
                  const value = props.value.replace(domNode.children[0].data, rec.productName);
                  props.onChange(value);
                }} {...props} />
              </>);
            }


            if (domNode.name === 'strong' && domNode.attribs.class === 'insertAcontacts' && domNode.children[0].data === '选择甲方联系人') {
              const value = props.value.replace(domNode.children[0].data, result.partyAContacts ? result.partyAContacts.contactsName : ' ');
              props.onChange(value);
              return (
                <>
                  {
                    result.partyAContacts ? result.partyAContacts.contactsName : ' '
                  }
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBcontacts' && domNode.children[0].data === '选择乙方联系人') {
              const value = props.value.replace(domNode.children[0].data, result.partyBContacts ? result.partyBContacts.contactsName : ' ');
              props.onChange(value);
              return (
                <>
                  {result.partyBContacts ? result.partyBContacts.contactsName : ' '}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertAAdress' && domNode.children[0].data === '选择甲方地址') {
              const value = props.value.replace(domNode.children[0].data, result.partyAAdress ? result.partyAAdress.location : ' ');
              props.onChange(value);
              return (
                <>
                  {
                    result.partyAAdress ? result.partyAAdress.location : ' '
                  }
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBAdress' && domNode.children[0].data === '选择乙方地址') {
              const value = props.value.replace(domNode.children[0].data, result.partyBAdress ? result.partyBAdress.location : ' ');
              props.onChange(value);
              return (
                <>
                  {result.partyBAdress ? result.partyBAdress.location : ' '}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertAPhone' && domNode.children[0].data === '选择甲方电话') {
              const value = props.value.replace(domNode.children[0].data, result.phoneA ? result.phoneA.phoneNumber : ' ');
              props.onChange(value);
              return (
                <>
                  {result.phoneA ? result.phoneA.phoneNumber : ' '}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBPhone' && domNode.children[0].data === '选择乙方电话') {
              const value = props.value.replace(domNode.children[0].data, result.phoneB ? result.phoneB.phoneNumber : ' ');
              props.onChange(value);
              return (
                <>
                  {result.phoneB ? result.phoneB.phoneNumber : ' '}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertACustomer' && domNode.children[0].data === '选择甲方客户') {
              const value = props.value.replace(domNode.children[0].data, result.partA ? result.partA.customerName : ' ');
              props.onChange(value);
              return (
                <>
                  {
                    result.partA ? result.partA.customerName : ' '
                  }
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBCustomer' && domNode.children[0].data === '选择乙方客户') {
              const value = props.value.replace(domNode.children[0].data, result.partB ? result.partB.customerName : ' ');
              props.onChange(value);
              return (
                <>
                  {
                    result.partB ? result.partB.customerName : ' '
                  }
                </>
              );
            }
          }
        })
      }
    </>
  );
};

export const SeeContent = (props) => {
  return (
    parse(props.value)
  );
};




