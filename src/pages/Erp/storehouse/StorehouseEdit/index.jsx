/**
 * 地点表编辑页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {placeDetail, placeAdd, placeEdit, storehouseDetail, storehouseAdd, storehouseEdit} from '../StorehouseUrl';
import * as SysField from '../StorehouseField';
import {request} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import {createFormActions, FormEffectHooks, FormPath} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: storehouseDetail,
  add: storehouseAdd,
  save: storehouseEdit
};

const StorehouseEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="storehouseId"
        effect={() => {

          const {setFieldState} = createFormActions();

          FormEffectHooks.onFieldValueChange$('amap').subscribe(({value}) => {
            console.log(value);
            if (value) {
              setFieldState(
                'palce',
                state => {
                  state.value = value.address;
                }
              );
              setFieldState(
                'longitude',
                state => {
                  state.value = value.location[0];
                }
              );
              setFieldState(
                'latitude',
                (state) => {
                  state.value = value.location[1];
                }
              );
            }
          });

        }}
      >
        <FormItem label="仓库名称" name="name" component={SysField.Name} required />
        <FormItem label="仓库地点" name="amap" component={SysField.Map} required />
        <div style={{display:'none'}}>
          <FormItem name="palce" component={SysField.Palce} required />
          <FormItem label="经度" name="longitude" component={SysField.Longitude} required />
          <FormItem label="纬度" name="latitude" component={SysField.Latitude} required />
        </div>
        <FormItem label="仓库面积" name="measure" component={SysField.Measure} />
        <FormItem label="仓库容量" name="capacity" component={SysField.Capacity} />
      </Form>
    </div>
  );

};

export default StorehouseEdit;
