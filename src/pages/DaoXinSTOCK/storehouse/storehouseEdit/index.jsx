/**
 * 地点表编辑页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {placeDetail, placeAdd, placeEdit} from '../storehouseUrl';
import * as SysField from '../storehouseField';
import {Capacity, Palce} from '../storehouseField';

const {FormItem} = Form;

const ApiConfig = {
  view: placeDetail,
  add: placeAdd,
  save: placeEdit
};

const PlaceEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="storehouseId"
    >
      <FormItem label="仓库名称" name="name" component={SysField.Name} required/>
      <FormItem label="仓库地点" name="palce" component={SysField.Palce} required/>
      <FormItem label="经度" name="longitude" component={SysField.Longitude} required/>
      <FormItem label="纬度" name="latitude" component={SysField.Latitude} required/>
      <FormItem label="仓库面积" name="measure" component={SysField.Measure} required/>
      <FormItem label="仓库容量" name="capacity" component={SysField.Capacity} required/>
    </Form>
  );
};

export default PlaceEdit;
