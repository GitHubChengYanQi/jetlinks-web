/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useRef, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import {DatePicker2} from '@alifd/next';
import parse from 'html-react-parser';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/contract/ContractUrl';
import Drawer from '@/components/Drawer';
import Stocks from '@/pages/Crm/track/TrackEdit/components/Stocks';
import TemplateList from '@/pages/Crm/addContract/AddContractEdit/Template';
import Index from '@/pages/Crm/template/TemplateEdit/components/Customer';

const w = 200;


export const Customer = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input style={{width:w}}  {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索客户
    </Button>
    <Drawer width={1500} title="选择" component={Index} onSuccess={() => {
      ref.current.close();
    }} ref={ref} check={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};

export const Name = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};
export const UserId = (props) => {
  return (<Select style={{width: w}} api={apiUrl.userIdSelect} {...props} />);
};
export const Note = (props) => {
  return (<Input style={{width: w}} {...props} />);
};
export const Time = (props) => {
  return (<DatePicker2 showTime style={{width: w}}  {...props} />);
};

// export const Template = (props) => {
//   const {onChange} = props;
//   const ref = useRef(null);
//   const tableRef = useRef(null);
//   return (<>
//     <Input style={{width: w}} {...props} />
//     <Button className="placeName" onClick={() => {
//       ref.current.open(false);
//     }}>
//       搜索模板
//     </Button>
//     <Drawer width={800} title="选择" component={TemplateList} onSuccess={() => {
//       tableRef.current.refresh();
//       ref.current.close();
//     }} ref={ref} check={(id) => {
//       onChange(id);
//       ref.current.close();
//     }} />
//   </>);
// };
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

  const [state, setState] = useState();


  const ref = useRef(null);

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
                <Input style={{width:w}}  value={domNode.children[0].data}/>
                <Button className='placeName' onClick={()=>{
                  ref.current.open(false);}}>
                  搜索客户
                </Button>
                <Drawer width={1500} title="选择" component={Index} onSuccess={() => {
                  ref.current.close();
                }} ref={ref} check={(record)=>{
                  props.onChange(props.value.replace(domNode.children[0].data,record));ref.current.close();}}
                />
              </>);
            }
          }
        })
      }
    </>
  );
};

