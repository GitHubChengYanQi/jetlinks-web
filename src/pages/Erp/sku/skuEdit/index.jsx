/**
 * sku表编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {skuDetail, skuAdd, skuEdit} from '../skuUrl';
import * as SysField from '../skuField';
import {createFormActions, FormEffectHooks} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: skuDetail,
  add: skuAdd,
  save: skuEdit
};


const SkuEdit = ({...props}) => {

  const formRef = useRef();

  const [spu, setSpu] = useState();
  const [sku, setSku] = useState();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="skuId"
        onSubmit={(value) => {
          return {...value, type: 0};
        }}
        effect={() => {

          const {setFieldState} = createFormActions();

          FormEffectHooks.onFieldValueChange$('spuClassificationId').subscribe(({value}) => {
            setFieldState(
              'spu',
              state => {
                state.props.classId = value;
              }
            );
          });

        }}
      >
        <FormItem label="分类" name="spuClassificationId" component={SysField.SpuClass} required />
        <FormItem label="物料名称" name="spu" component={SysField.SpuId} model={(value) => {
          setSpu(value);
        }} required />
        <FormItem
          label="型号"
          name="skuName"
          skuname={spu && sku && `${spu}/${sku}`}
          component={SysField.SkuName}
          model={(value) => {
            setSku(value);
          }} required />
        <FormItem label="编码" name="coding" component={SysField.Coding} required />
        {!props.value && <FormItem label="规格" name="specifications" component={SysField.SkuName}  />}
        <FormItem label="备注" name="remarks" component={SysField.Note} />
      </Form>
    </div>
  );
};

export default SkuEdit;
