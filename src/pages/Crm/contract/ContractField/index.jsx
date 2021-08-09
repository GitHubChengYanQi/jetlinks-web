/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useRef, useState} from 'react';
import {Input, InputNumber,Select as AntSelect} from 'antd';
import {DatePicker2} from '@alifd/next';
import parse from 'html-react-parser';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/contract/ContractUrl';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/template/TemplateEdit/components/Customer';
import DatePicker from '@/components/DatePicker';
const { Search } = Input;

const w = 200;



export const Customer = (props) =>{
  const {onChange,placeholder,val} = props;
  const [value,setValue] = useState(val);
  const ref = useRef(null);
  return (<>
    <Search style={{width:200}} placeholder={placeholder}  {...props} value={value} onSearch={()=>{
      ref.current.open(false);
    }} enterButton />
    <Drawer width={1500} title="选择" component={Index} onSuccess={() => {
      ref.current.close();
    }} ref={ref} check={(customer)=>{setValue(customer.customerName);onChange(customer.customerId);ref.current.close();}}/>
  </>);
};


export const Name = (props) => {
  return (<Input  style={{width:200}}  {...props} />);
};

export const UserId = (props) => {
  return (<Select  api={apiUrl.userIdSelect} {...props} />);
};

export const Note = (props) => {
  return (<Input  {...props} />);
};

export const Time = (props) => {
  return (<DatePicker showTime {...props} />);
};
export const Audit = (props) => {
  return (<AntSelect style={{width:200}} options={[{label:'不合格',value:0},{label:'合格',value:1}]} showTime   {...props} />);
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


  const ref = useRef(null);

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
            if (domNode.name === 'strong' && domNode.attribs.class === 'but') {
              return (<>
                <Search style={{width:200,margin:'0 10px'}} value={domNode.children[0].data} onSearch={()=>{
                  ref.current.open(false);
                }} enterButton />
                <Drawer width={1500} title="选择" component={Index} onSuccess={() => {
                  ref.current.close();
                }} ref={ref} check={(record)=>{
                  props.onChange(props.value.replace(domNode.children[0].data,record.customerName));ref.current.close();}}
                />
              </>);
            }
          }
        })
      }
    </>
  );
};

