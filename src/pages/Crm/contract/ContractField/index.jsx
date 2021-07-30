/**
 * 合同表字段配置页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useState} from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../ContractUrl';
import parse from 'html-react-parser';
import {DatePicker2} from '@alifd/next';

const w = 200;

export const Name = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const UserId = (props) =>{
  return (<Select style={{width:w}}  api={apiUrl.userIdSelect} {...props}/>);
};
export const Note = (props) =>{
  return (<Input  style={{width:w}} {...props}/>);
};
export const Time = (props) =>{
  return (<DatePicker2 showTime style={{width:w}}  {...props}/>);
};
// export const Content = (props) =>{
//
//   const [state,setState] = useState();
//
//   const handelChange = (e) => {
//     setState(e.target.value);
//   };
//
//
//
//   return(
//     <>
//       {
//         parse(props.value)
//       }
//
//     </>
//   );
// }

export const Content = (props) =>{

  const [state,setState] = useState();

  const handelChange = (e) => {
    setState(e.target.value);
  };



  return(
    <>
      {
        parse(props.value, {
          replace:domNode =>{
            if (domNode.name === 'strong' && domNode.attribs.class === 'inp' ){
              return <Input style={{width : '100px',margin : '0 10px'}}    onChange={(value)=>{
                handelChange(value);
              }} onBlur={()=>{
                // domNode.children[0].data=state;
                const val = props.value.replace(domNode.attribs.class,state);
                const value = val.replace( domNode.children[0].data,state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'number' ){
              return <InputNumber style={{margin : '0 10px'}}     onChange={(value)=>{
                setState(value);
              }} onBlur={()=>{
                // domNode.children[0].data=state;
                const val = props.value.replace(domNode.attribs.class,state);
                const value = val.replace( domNode.children[0].data,state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'date' ){
              return <DatePicker2 style={{margin : '0 10px'}}   onChange={(value)=>{
                setState(value);
              }} onBlur={()=>{
                // domNode.children[0].data=state;
                const val = props.value.replace(domNode.attribs.class,state);
                const value = val.replace( domNode.children[0].data,state);
                props.onChange(value);
              }} />;
            }
          }
        })
      }

    </>
  );
};
