/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {Button, Steps} from 'antd';
import {partsDetail, partsAdd, partsEdit} from '../../../PartsUrl';
import * as SysField from '../../../PartsField';

const {FormItem} = Form;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};

const Parts = ({spuId,...props}) => {

  const formRef = useRef(null);

  return (
    <>
      <div style={{margin: '50px 150px'}}>
        <Form
          {...props}
          ref={formRef}
          api={ApiConfig}
          fieldKey="partsId"
        >
          <FormItem label="清单名称" name="partName" component={SysField.PartName} />
          <FormItem hidden  name="spuId" value={spuId} component={SysField.Spu} required/>
        </Form>
      </div>
    </>
  );
};

export default Parts;
