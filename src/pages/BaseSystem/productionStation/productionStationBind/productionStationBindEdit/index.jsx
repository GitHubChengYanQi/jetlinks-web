/**
 * 工位绑定表编辑页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 10:03:24
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {productionStationBindDetail, productionStationBindAdd, productionStationBindEdit} from '../productionStationBindUrl';
import * as SysField from '../productionStationBindField';

const {FormItem} = Form;

const ApiConfig = {
  view: productionStationBindDetail,
  add: productionStationBindAdd,
  save: productionStationBindEdit
};

const ProductionStationBindEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="productionStationBindId"
    >
      <FormItem label="工位id" name="productionStationId" component={SysField.ProductionStationId} required/>
      <FormItem label="负责人" name="userId" component={SysField.UserId} required/>
    </Form>
  );
};

export default ProductionStationBindEdit;
