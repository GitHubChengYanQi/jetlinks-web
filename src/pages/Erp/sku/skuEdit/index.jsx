/**
 * sku表编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import Form from '@/components/Form';
import {skuDetail, skuAdd, skuEdit} from '../skuUrl';
import * as SysField from '../skuField';
import {createFormActions, FormEffectHooks} from '@formily/antd';
import {notification} from 'antd';

const {FormItem} = Form;

const ApiConfig = {
  view: skuDetail,
  add: skuAdd,
  save: skuEdit
};

const SkuEdit = ({...props}, ref) => {

  const {value} = props;

  const formRef = useRef();

  const [spu, setSpu] = useState();
  const [sku, setSku] = useState();

  const [next, setNext] = useState();

  const openNotificationWithIcon = type => {
    notification[type]({
      message: type === 'success' ? '保存成功！' : '保存失败!',
    });
  };

  useImperativeHandle(ref, () => ({
    nextAdd
  }));

  const nextAdd = async (next) => {
    await setNext(next);
    await formRef.current.submit();
  };

  return (
    <div style={{padding: 16}}>
      <Form
        value={value.skuId || false}
        ref={formRef}
        defaultValue={{
          'spuClassificationId': value.spuResult && value.spuResult.spuClassificationId,
          'spu': value.spuResult,
          'skuName': value.skuName,
          'standard': value.standard,
          'specifications': value.specifications,
          'remarks': value.remarks
        }}
        api={ApiConfig}
        NoButton={false}
        fieldKey="skuId"
        onError={()=>{
          openNotificationWithIcon('error');
        }}
        onSuccess={() => {
          openNotificationWithIcon('success');
          if (!next) {
            props.onSuccess();
          } else {
            formRef.current.reset();
            setSpu(null);
            setSku(null);
          }
        }}
        onSubmit={(value) => {
          return {...value, type: 0,isHidden:true};
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
        <FormItem
          label="分类"
          name="spuClassificationId"
          skuId={value.skuId}
          component={SysField.SpuClass}
          required />
        <FormItem
          label="物料名称"
          skuId={value.skuId}
          name="spu"
          component={SysField.SpuId}
          model={(value) => {
            setSpu(value);
          }} required />
        <FormItem
          label="型号"
          name="skuName"
          skuname={spu && sku && `${sku} / ${spu}`}
          component={SysField.SkuName}
          model={(value) => {
            setSku(value);
          }} required />
        <FormItem
          label="编码"
          skuId={value.skuId}
          name="standard"
          component={SysField.Coding} />
        <FormItem
          label="规格"
          skuId={value.skuId}
          name="specifications"
          component={SysField.Specifications} />
        <FormItem
          label="备注"
          name="remarks"
          component={SysField.Note} />
      </Form>
    </div>
  );
};

export default React.forwardRef(SkuEdit);
