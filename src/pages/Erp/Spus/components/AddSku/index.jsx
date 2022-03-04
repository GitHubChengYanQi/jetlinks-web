import React, {useImperativeHandle, useRef} from 'react';
import {createFormActions, FormEffectHooks} from '@formily/antd';
import Form from '@/components/Form';
import {request} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import {categoryDetail} from '@/pages/Erp/category/categoryUrl';
import * as SysField from '@/pages/Erp/parts/PartsField';
import {Codings} from '@/pages/Erp/sku/skuField';

const {FormItem} = Form;

const ApiConfig = {
  view: {},
  add: {
    url: '/sku/addSkuFromSpu',
    method: 'POST'
  },
  save: {}
};

const formActionsPublic = createFormActions();

const AddSku = ({spuId,...props}, ref) => {

  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  return <div style={{padding: 16}}>

    <Form
      {...props}
      ref={formRef}
      NoButton={false}
      api={ApiConfig}
      formActions={formActionsPublic}
      fieldKey="partsId"
      effects={({setFieldState}) => {

        FormEffectHooks.onFieldValueChange$('spuId').subscribe(async ({value}) => {
          if (value) {
            const res = await request({...spuDetail, data: {spuId: value}});
            if (res && res.categoryId) {
              const category = await request({...categoryDetail, data: {categoryId: res.categoryId}});
              setFieldState('sku', state => {
                state.props.category = category && category.categoryRequests;
              });
            }
          }

        });
      }}
      onSubmit={(value) => {
        return value;
      }}
    >

      <FormItem
        label="产品"
        disabled={spuId}
        value={spuId}
        name="spuId"
        component={SysField.SelectSpuId}
        required
      />

      <FormItem
        label="配置"
        name="sku"
        title="配置项"
        component={SysField.Attributes}
        required
      />

      <FormItem label="编码" name="standard" module={0} component={Codings} required />
      <FormItem
        label="型号"
        name="skuName"
        component={SysField.SkuName}
        required
      />
      <FormItem
        label="规格"
        placeholder="无规格内容可填写“型号”"
        name="specifications"
        component={SysField.SkuName}
      />
      <FormItem label="备注" name="note" component={SysField.Note} />
    </Form>
  </div>;
};

export default React.forwardRef(AddSku);
