/**
 * 工位表编辑页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 10:03:24
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {productionStationDetail, productionStationAdd, productionStationEdit} from '../productionStationUrl';
import * as SysField from '../productionStationField';

const {FormItem} = Form;

const ApiConfig = {
  view: productionStationDetail,
  add: productionStationAdd,
  save: productionStationEdit
};

const ProductionStationEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="productionStationId"
    >
      <FormItem label="工位名称" name="name" component={SysField.Name} required/>
      <FormItem label="负责人" name="userIds" component={SysField.UserIds} required/>
    </Form>
  );
};

export default ProductionStationEdit;
