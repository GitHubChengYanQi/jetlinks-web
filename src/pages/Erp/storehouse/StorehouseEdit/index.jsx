/**
 * 地点表编辑页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import { storehouseDetail, storehouseAdd, storehouseEdit} from '../StorehouseUrl';
import * as SysField from '../StorehouseField';

const {FormItem} = Form;

const ApiConfig = {
  view: storehouseDetail,
  add: storehouseAdd,
  save: storehouseEdit
};

const StorehouseEdit = ({...props}) => {

  const {value,...other} = props;

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...other}
        value={value && value.storehouseId}
        ref={formRef}
        api={ApiConfig}
        defaultValue={{
          amap:{
            address: value.palce,
          },
        }}
        fieldKey="storehouseId"
        onSubmit={(value)=>{
          return {
            ...value,
            palce:value.amap.address,
            longitude:value.amap.location && value.amap.location[0],
            latitude:value.amap.location && value.amap.location[1]
          };
        }}
      >
        <FormItem label="仓库码" name="coding"  component={SysField.Coding} rules={[{required:true,pattern: '^[A-Z\\d\\+\\-\\*\\/\\(\\)\\%（）]+$',message:'只能输入大写字母或数字！'}]}/>
        <FormItem label="仓库名称" name="name" component={SysField.Name} required />
        <FormItem label="仓库地点" name="amap" component={SysField.Map} />
        <div style={{display:'none'}}>
          <FormItem name="palce" component={SysField.Palce} />
          <FormItem label="经度" name="longitude" component={SysField.Longitude} />
          <FormItem label="纬度" name="latitude" component={SysField.Latitude} />
        </div>
        <FormItem label="仓库面积" name="measure" component={SysField.Measure} />
        <FormItem label="仓库高度" name="capacity" component={SysField.Capacity} />
      </Form>
    </div>
  );

};

export default StorehouseEdit;
