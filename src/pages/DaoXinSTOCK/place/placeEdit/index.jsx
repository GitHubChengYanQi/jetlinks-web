/**
 * 地点表编辑页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {placeDetail, placeAdd, placeEdit} from '../placeUrl';
import * as SysField from '../placeField';
import {Capacity} from '../placeField';

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
      fieldKey="palceId"
    >
      <FormItem label="仓库名称" name="name" component={SysField.Name} required/>
      <FormItem label="仓库地点" name="position" component={SysField.Position} required/>
      <FormItem label="仓库位置" name="palce" component={SysField.Palce} required/>
      <FormItem label="仓库面积" name="measure" component={SysField.Measure} required/>
      <FormItem label="仓库容量" name="capacity" component={SysField.Capacity} required/>
    </Form>
  );
};

export default PlaceEdit;
