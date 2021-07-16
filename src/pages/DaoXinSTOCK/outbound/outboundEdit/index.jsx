/**
 * 出库表编辑页
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {outboundDetail, outboundAdd, outboundEdit} from '../outboundUrl';
import * as SysField from '../outboundField';

const {FormItem} = Form;

const ApiConfig = {
  view: outboundDetail,
  add: outboundAdd,
  save: outboundEdit
};

const OutboundEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outboundId"
    >
      <FormItem label="仓库id" name="stockId" component={SysField.StockId} required/>
      <FormItem label="出库物品" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="出库数量" name="number" component={SysField.Number} required/>
      <FormItem label="出库时间" name="outtime" component={SysField.Outtime} required/>
      <FormItem label="出库地点" name="placeId" component={SysField.PlaceId} required/>
    </Form>
  );
};

export default OutboundEdit;
