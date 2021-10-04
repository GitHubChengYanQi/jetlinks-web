/**
 * 产品表字段配置页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {useEffect} from 'react';
import {Input, InputNumber, Select as AntSelect, Select as AntdSelect, Tag} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../ItemsUrl';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import {brandList, brandListSelect} from '@/pages/Erp/brand/BrandUrl';


const w = 200;

export const Name = (props) =>{
  return (<Input style={{ width: w }} {...props}/>);
};
export const Type = (props) =>{
  return (<Input style={{ width: w }} {...props}/>);
};
export const ShelfLife = (props) =>{
  return (<><InputNumber min={0}  {...props}/>&nbsp;&nbsp;天</>);
};
export const Inventory = (props) =>{
  return (<><InputNumber min={0} {...props}/>&nbsp;&nbsp;个/件</>);
};
export const ProductionTime = (props) =>{
  return (<DatePicker  style={{ width: w }}  {...props} />);
};
export const Important = (props) =>{
  return (<><InputNumber min={0}  man={100} {...props}/>&nbsp;&nbsp;0~100</>);
};
export const Weight = (props) =>{
  return (<><InputNumber min={0} {...props}/>&nbsp;&nbsp;kg</>);
};
export const MaterialId = (props) =>{
  return (<Select style={{ width: w }} api={apiUrl.materialIdSelect} {...props}/>);
};
export const Cost = (props) =>{
  return (<><InputNumber min={0} {...props}/>&nbsp;&nbsp;元</>);
};
export const Vulnerability = (props) =>{
  return (<AntdSelect   style={{ width: w }} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} options={[{value:0,label:'易损'},{value:1,label:'不易损'}]} {...props}/>);
};
// export const BrandId = (props) =>{
//   return (<Select   api={apiUrl.brandIdSelect} {...props}/>);
// };


export const BrandId = (props) => {

  const {value,displays} = props;


  const brandBindResults = [];

  if (value && value.length > 0){
    if (typeof value[0] === 'object'){
      value.forEach((items)=>{
        brandBindResults.push(items && `${items.brandId}`);
      });
    }else {
      value.forEach((items)=>{
        brandBindResults.push(items);
      });
    }
  }

  useEffect(()=>{
    if (brandBindResults.length > 0){
      props.onChange(brandBindResults);
    }
  },[]);


  const {data} = useRequest(brandListSelect);

  const options = data || [];

  const tagRender = (props) => {
    const {label, value, closable, onClose} = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="green"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{marginRight: 3}}
      >
        {label}
      </Tag>
    );
  };


  return (
    <AntSelect
      mode="multiple"
      showArrow
      value={brandBindResults}
      tagRender={tagRender}
      style={{width: '100%',display:displays || null}}
      options={options}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};
