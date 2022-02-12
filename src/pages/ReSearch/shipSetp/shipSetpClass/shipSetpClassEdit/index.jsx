/**
 * 工序分类表编辑页
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {shipSetpClassDetail, shipSetpClassAdd, shipSetpClassEdit} from '../shipSetpClassUrl';
import * as SysField from '../shipSetpClassField';

const {FormItem} = Form;

const ApiConfig = {
  view: shipSetpClassDetail,
  add: shipSetpClassAdd,
  save: shipSetpClassEdit
};

const ShipSetpClassEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="shipSetpClassId"
    >
      <FormItem label="工序分类名称" name="shipSetpClassName" component={SysField.ShipSetpClassName} required/>
    </Form>
  );
};

export default ShipSetpClassEdit;
