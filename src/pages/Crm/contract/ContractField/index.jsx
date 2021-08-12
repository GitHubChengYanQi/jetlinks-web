/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useEffect, useState} from 'react';
import {Input, InputNumber, Select as AntSelect} from 'antd';
import {DatePicker2} from '@alifd/next';
import parse from 'html-react-parser';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/contract/ContractUrl';
import DatePicker from '@/components/DatePicker';
import ErpPackageList from '@/pages/Erp/erpPackage/erpPackageList';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import ItemsList from '@/pages/Erp/items/ItemsList';
import ChooseCustomer from '@/pages/Crm/contract/components/Choose';

export const Customer = (props) => {
  const {customerId, onChange} = props;
  return (<>
    <Select api={apiUrl.CustomerNameListSelect} {...props} onChange={(value) => {
      onChange(value);
      customerId(value);
    }} />
  </>);
};

export const Contacts = (props) => {
  const {customerId, contactsId, onChange} = props;

  useEffect(()=>{
    onChange(null);
    },[customerId]);

  const data = customerId ? customerId.map((value) => {
    return {
      label: value.contactsName,
      value: value.contactsId,
    };
  }) : null;



  return (<>
    <AntSelect style={{width: 200}} options={data} {...props} onChange={(value) => {
      onChange(value);
      contactsId(value);
    }} />
  </>);
};
export const Phone = (props) => {
  const {contactsId} = props;
  useEffect(()=>{
    props.onChange(null);
  },[contactsId]);
  const data = contactsId ? contactsId.map((value) => {
    return {
      label: value.phoneNumber,
      value: value.phoneId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} {...props} />
  </>);
};
export const Adress = (props) => {
  const {customerId} = props;
  useEffect(()=>{
    props.onChange(null);
  },[customerId]);
  const data = customerId ? customerId.map((value) => {
    return {
      label: value.location,
      value: value.adressId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} {...props} />
  </>);
};


export const Name = (props) => {
  return (<Input style={{width: 200}}  {...props} />);
};


export const Note = (props) => {
  return (<Input  {...props} />);
};

export const Time = (props) => {
  return (<DatePicker showtime {...props} />);
};
export const Audit = (props) => {
  props.onChange(props.value || 0);
  return (<AntSelect disabled defaultValue={[0]} allowClear style={{width: 200}} options={[{label: '不合格', value: 0}, {label: '合格', value: 1}]}    {...props} />);
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


  const handelChange = (e) => {
    setState(e.target.value);
  };


  return (
    <>
      {
        parse(props.value, {
          replace: domNode => {
            if (domNode.name === 'strong' && domNode.attribs.class === 'inp' && domNode.children[0].data === '文本框') {
              return <Input style={{width: '100px', margin: '0 10px'}} onChange={(value) => {
                handelChange(value);
              }} onBlur={() => {
                // domNode.children[0].data=state;
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'number' && domNode.children[0].data === '数字框') {
              return <InputNumber style={{margin: '0 10px'}} onChange={(value) => {
                setState(value);
              }} onBlur={() => {
                // domNode.children[0].data=state;
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'date' && domNode.children[0].data === '时间框') {
              return <DatePicker2 style={{margin: '0 10px'}} onChange={(value) => {
                setState(value);
              }} onBlur={() => {
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'but' && domNode.children[0].data === '选择客户') {
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
            if (domNode.name === 'strong' && domNode.attribs.class === 'package' && domNode.children[0].data === '选择套餐') {
              return (<>
                <ChooseCustomer Table={ErpPackageList} domNode={domNode} record={(rec) => {
                  const value = props.value.replace(domNode.children[0].data, rec.productName);
                  props.onChange(value);
                }} {...props} />
              </>);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertAcontacts' && domNode.children[0].data === '选择甲方联系人') {
              const value = props.value.replace(domNode.children[0].data, result.partyAContacts ? result.partyAContacts.contactsName : ' ');
              console.log(domNode.children[0].data);
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
              const value = props.value.replace(domNode.children[0].data,  result.partyBContacts ? result.partyBContacts.contactsName : ' ');
              props.onChange(value);
              return (
                <>
                  { result.partyBContacts ? result.partyBContacts.contactsName : ' '}
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
              const value = props.value.replace(domNode.children[0].data,  result.phoneA ? result.phoneA.phoneNumber : ' ');
              props.onChange(value);
              return (
                <>
                  { result.phoneA ? result.phoneA.phoneNumber : ' '}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBPhone' && domNode.children[0].data === '选择乙方电话') {
              const value = props.value.replace(domNode.children[0].data,  result.phoneB ? result.phoneB.phoneNumber : ' ');
              props.onChange(value);
              return (
                <>
                  { result.phoneB ? result.phoneB.phoneNumber : ' '}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertACustomer' && domNode.children[0].data === '选择甲方客户') {
              console.log(domNode.children[0].data);
              const value = props.value.replace(domNode.children[0].data,  result.partA ? result.partA.customerName : ' ');
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
              const value = props.value.replace(domNode.children[0].data,  result.partB ? result.partB.customerName : ' ');
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




