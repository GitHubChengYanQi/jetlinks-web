import * as SysField from '../../InstockField';
import React from 'react';
import Form from '@/components/Form';

const {FormItem} = Form;

const SpuList = ({spuLabel,style, skuLabel, spuName, skusName}) => {

  return (
    <>
      <div style={style || {display:'inline-block'}}>
        <FormItem
          labelCol={4}
          label={spuLabel}
          name={spuName}
          component={SysField.SpuId}
          required
        />
      </div>
      <div style={style || {display:'inline-block'}}>
        <FormItem
          labelCol={4}
          label={skuLabel}
          name={skusName}
          component={SysField.Remake}
          required
        />
      </div>
    </>
  );
};

export default SpuList;
