/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useState} from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import {DatePicker2} from '@alifd/next';
import parse from 'html-react-parser';







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
                const value = props.value.replace( domNode.children[0].data,state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'number' ){
              return <InputNumber style={{margin : '0 10px'}}     onChange={(value)=>{
                setState(value);
              }} onBlur={()=>{
                // domNode.children[0].data=state;
                const value = props.value.replace( domNode.children[0].data,state);
                props.onChange(value);
              }} />;
            }
            if (domNode.name === 'strong' && domNode.attribs.class === 'date' ){
              return <DatePicker2 style={{margin : '0 10px'}}   onChange={(value)=>{
                setState(value);
              }} onBlur={()=>{
                // domNode.children[0].data=state;
                const value = props.value.replace( domNode.children[0].data,state);
                props.onChange(value);
              }} />;
            }
          }
        })
      }

    </>
  );
};

