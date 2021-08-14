/**
 * 出库表编辑页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {outstockDetail, outstockAdd, outstockEdit} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import {useRequest} from '@/util/Request';
import {createFormActions, FormEffectHooks} from '@formily/antd';

const {FormItem} = Form;
const {onFieldValueChange$} = FormEffectHooks;

const ApiConfig = {
  view: outstockDetail,
  add: outstockAdd,
  save: outstockEdit
};

const OutstockEdit = ({...props}) => {

  const formRef = useRef();

  const {data, run} = useRequest({url: '/stock/list', method: 'POST'});
  const {data:itemData, run:itemRun} = useRequest({url: '/stock/list', method: 'POST'});

  const [storehouse,setStorehouse] = useState();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockId"
      effects={() => {
        const {setFieldState} = createFormActions();
        onFieldValueChange$('storehouseId').subscribe(({value}) => {
          setFieldState('itemId', state => {
            state.visible = value;
          });
        });
        onFieldValueChange$('itemId').subscribe(({value}) => {
          setFieldState('brandId', state => {
            state.visible = value;
          });
        });
      }}
    >
      <FormItem label="仓库名称" initialValue={false} name="storehouseId" component={SysField.StoreHouseSelect} storehouseid={async (value) => {
        setStorehouse(value);
        await run(
          {
            data: {
              storehouseId:value
            }
          }
        );
      }} required />
      <FormItem label="产品名称" initialValue={false} name="itemId" component={SysField.ItemIdSelect} storehouseid={data || null} itemid={async (value)=>{
        await itemRun(
          {
            data: {
              storehouseId:storehouse,
              itemId:value,
            }
          }
        );
      }} required />
      <FormItem label="出库品牌" initialValue={false} name="brandId" component={SysField.BrandId} storehouseid={itemData || null} required />
      <FormItem label="出库数量" name="number" component={SysField.Number} required />
      <FormItem label="出库价格" name="price" component={SysField.Price} required />
      <FormItem label="出库时间" name="deliveryTime" component={SysField.DeliveryTime} required />
    </Form>
  );
};

export default OutstockEdit;
