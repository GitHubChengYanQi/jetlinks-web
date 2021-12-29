/**
 * 盘点任务详情编辑页
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {inventoryDetailDetail, inventoryDetailAdd, inventoryDetailEdit} from '../inventoryDetailUrl';
import * as SysField from '../inventoryDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: inventoryDetailDetail,
  add: inventoryDetailAdd,
  save: inventoryDetailEdit
};

const InventoryDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="detailId"
    >
      <FormItem label="对应实物id" name="inkindId" component={SysField.InkindId} required/>
    </Form>
  );
};

export default InventoryDetailEdit;
