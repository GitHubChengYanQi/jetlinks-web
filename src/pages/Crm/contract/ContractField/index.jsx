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
  const {customerId,onChange} = props;
  return (<>
    <Select api={apiUrl.CustomerNameListSelect} {...props} onChange={(value)=>{onChange(value);customerId(value);}}/>
  </>);
};

export const Contacts = (props) => {
  const {customerId} = props;
  const data = customerId ? customerId.map((value)=>{
    return {
      label:value.contactsName,
      value:value.contactsId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width:200}} options={data} {...props}/>
  </>);
};
export const Adress = (props) => {
  const {customerId} = props;
  const data = customerId ? customerId.map((value)=>{
    return {
      label:value.location,
      value:value.adressId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width:200}} options={data} {...props}/>
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
  return (<AntSelect disabled defaultValue={[0]} allowClear style={{width: 200}}
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


  const handelChange = (e) => {
    setState(e.target.value);
  };


  return (
    <>
      {
        parse(props.value, {
          replace: domNode => {
            if (domNode.name === 'strong' && domNode.attribs.class === 'inp') {
              return <Input style={{width: '100px', margin: '0 10px'}} onChange={(value) => {
                handelChange(value);
              }} onBlur={() => {
                // domNode.children[0].data=state;
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'number') {
              return <InputNumber style={{margin: '0 10px'}} onChange={(value) => {
                setState(value);
              }} onBlur={() => {
                // domNode.children[0].data=state;
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'date') {
              return <DatePicker2 style={{margin: '0 10px'}} onChange={(value) => {
                setState(value);
              }} onBlur={() => {
                const value = props.value.replace(domNode.children[0].data, state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'but') {
              return (<>
                <ChooseCustomer Table={CustomerTable} domNode={domNode} record={(record) => {
                  const value = props.value.replace(domNode.children[0].data, record.customerName);
                  props.onChange(value);
                }} {...props} />
              </>);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'items') {
              return (<>
                <ChooseCustomer Table={ItemsList} domNode={domNode} record={(record) => {
                  const value = props.value.replace(domNode.children[0].data, record.name);
                  props.onChange(value);
                }} {...props} />
              </>);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'package') {
              return (<>
                <ChooseCustomer Table={ErpPackageList} domNode={domNode} record={(record) => {
                  const value = props.value.replace(domNode.children[0].data, record.productName);
                  props.onChange(value);
                }} {...props} />
              </>);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertAcontacts') {
              const value = props.value.replace(domNode.children[0].data, result.partyAContactsId);
              props.onChange(value);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBcontacts') {
              return (
                <>
                  {result.partyBContactsId}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertAAdress') {
              return (
                <>
                  {result.partyAAdressId}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBAdress') {
              return (
                <>
                  {result.partyBAdressId}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertAPhone') {
              return (
                <>
                  {result.partyAPhone}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBPhone') {
              return (
                <>
                  {result.partyBPhone}
                </>
              );
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertACustomer') {
              const value = props.value.replace(domNode.children[0].data, result.partAName);
              props.onChange(value);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'insertBCustomer') {
              const value = props.value.replace(domNode.children[0].data, result.partBName);
              props.onChange(value);
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




