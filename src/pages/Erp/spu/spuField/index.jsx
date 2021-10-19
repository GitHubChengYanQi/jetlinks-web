/**
 * 字段配置页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React from 'react';
import {Input,InputNumber,TimePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../spuUrl';
import DatePicker from '@/components/DatePicker';
import {categoryList, categoryTree} from '../spuUrl';
import Attribute from '@/pages/Erp/spu/components/Attribute';

export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const ShelfLife = (props) =>{
  return (<><InputNumber min={0}  {...props}/>&nbsp;&nbsp;天</>);
};
export const Inventory = (props) =>{
  return (<><InputNumber min={0} {...props}/>&nbsp;&nbsp;个/件</>);
};
export const ProductionTime = (props) =>{
  return (<DatePicker   {...props} />);
};
export const Important = (props) =>{
  return (<><InputNumber min={0}  man={100} {...props}/>&nbsp;&nbsp;0~100</>);
};
export const Weight = (props) =>{
  return (<><InputNumber min={0} {...props}/>&nbsp;&nbsp;kg</>);
};
export const MaterialId = (props) =>{
  return (<Select api={apiUrl.materialIdSelect} {...props}/>);
};
export const Cost = (props) =>{
  return (<><InputNumber min={0} {...props}/>&nbsp;&nbsp;元</>);
};
export const Vulnerability = (props) =>{
  return (<AntdSelect showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} options={[{value:0,label:'易损'},{value:1,label:'不易损'}]} {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};
export const ClassId = (props) =>{
  return (<Input {...props}/>);
};
export const UnitId = (props) =>{
  return (<Input {...props}/>);
};
export const CategoryId = (props) =>{
  return (<Cascader api={categoryTree} {...props}/>);
};
export const Type = (props) =>{
  return (
    <Radio.Group {...props} >
      <Radio value={0}>自制件</Radio>
      <Radio value={1}>委派件</Radio>
      <Radio value={2}>外购件</Radio>
    </Radio.Group>
  );
};
export const AttributeId = (props) =>{
  return (<Input {...props}/>);
};

export const Values = (props) => {
  const {items,...other} = props;

  return (
    <Radio.Group {...other} defaultValue={items.length && items[0].attributeValuesId}>
      {items && items.map((items,index)=>{
        return  <Radio key={index} value={items.attributeValuesId}>{items.attributeValues}</Radio>;
      })}
    </Radio.Group>
  );
};


export const Atts = (props) => {

  const {attribute,...other} = props;

  return (
    <>
      <Attribute attribute={attribute} {...other} />
    </>
  );
};
