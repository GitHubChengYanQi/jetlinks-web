/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useRef, useState} from 'react';
import {Input, InputNumber, Select as AntSelect} from 'antd';
import {DatePicker2} from '@alifd/next';
import parse from 'html-react-parser';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/contract/ContractUrl';
import Drawer from '@/components/Drawer';
import DatePicker from '@/components/DatePicker';
import ErpPackageList from '@/pages/Erp/erpPackage/erpPackageList';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import ItemsList from '@/pages/Erp/items/ItemsList';
import ChooseCustomer from '@/pages/Crm/contract/components/Choose';

const {Search} = Input;


export const Customer = (props) => {
  const {onChange, placeholder, val} = props;
  const [value, setValue] = useState(val);
  const ref = useRef(null);
  return (<>
    <Search style={{width: 200}} placeholder={placeholder}  {...props} value={value} onSearch={() => {
      ref.current.open(false);
    }} enterButton />
    <Drawer width={1700} title="选择" component={CustomerTable} onSuccess={() => {
      ref.current.close();
    }} ref={ref} choose={(customer) => {
      setValue(customer.customerName);
      onChange(customer.customerId);
      ref.current.close();
    }} />
  </>);
};


export const Name = (props) => {
  return (<Input style={{width: 200}}  {...props} />);
};


export const Note = (props) => {
  return (<Input  {...props} />);
};

export const Time = (props) => {
  return (<DatePicker showTime {...props} />);
};
export const Audit = (props) => {
  return (<AntSelect allowClear style={{width: 200}} options={[{label: '不合格', value: 0}, {label: '合格', value: 1}]} showTime   {...props} />);
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
                <ChooseCustomer Table={CustomerTable} domNode={domNode} record={(record)=>{
                  const value = props.value.replace(domNode.children[0].data, record.customerName);
                  props.onChange(value);
                }} {...props} />
              </>);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'items') {
              return (<>
                <ChooseCustomer Table={ItemsList} domNode={domNode} record={(record)=>{
                  const value = props.value.replace(domNode.children[0].data, record.name);
                  props.onChange(value);
                }} {...props} />
              </>);
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'package') {
              return (<>
                <ChooseCustomer Table={ErpPackageList} domNode={domNode} record={(record)=>{
                  const value = props.value.replace(domNode.children[0].data, record.productName);
                  props.onChange(value);
                }} {...props} />
              </>);
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




