/**
 * sku表编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import {createFormActions, FormEffectHooks} from '@formily/antd';
import {notification} from 'antd';
import Form from '@/components/Form';
import {skuDetail, skuAdd, skuEdit} from '../skuUrl';
import * as SysField from '../skuField';
import {request} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import BrandIds from '@/pages/Erp/brand/components/BrandIds';

const {FormItem} = Form;

const formActionsPublic = createFormActions();

const SkuEdit = ({...props}, ref) => {

  const {value, addUrl, ...other} = props;

  const ApiConfig = {
    view: skuDetail,
    add: addUrl || skuAdd,
    save: skuEdit
  };

  const formRef = useRef();

  const [details, setDetails] = useState();

  const [next, setNext] = useState();

  const openNotificationWithIcon = type => {
    notification[type]({
      message: type === 'success' ? '保存成功！' : '保存失败!',
    });
  };

  const nextAdd = async (next) => {
    await setNext(next);
    await formRef.current.submit();
  };

  useImperativeHandle(ref, () => ({
    nextAdd
  }));


  return (
    <div style={{padding: 16}}>
      <Form
        {...other}
        value={value.skuId || false}
        ref={formRef}
        formActions={formActionsPublic}
        defaultValue={{
          'unitId': value.spuResult && value.spuResult.unitId,
          'spu': value.spuResult,
          'standard': value.standard,
          'specifications': value.specifications,
          'remarks': value.remarks
        }}
        api={ApiConfig}
        NoButton={false}
        fieldKey="skuId"
        details={(res) => {
          setDetails(res);
        }}
        onError={() => {
          openNotificationWithIcon('error');
        }}
        onSuccess={(res) => {
          openNotificationWithIcon('success');
          if (!next) {
            props.onSuccess(res.data);
          } else {
            formRef.current.reset();
          }
        }}
        onSubmit={(value) => {
          return {...value, type: 0, isHidden: true};
        }}
        effects={async () => {

          const {setFieldState} = createFormActions();

          FormEffectHooks.onFieldValueChange$('spu').subscribe(async ({value}) => {
            if (value && value.spuId) {

              const spu = await request({...spuDetail, data: {spuId: value.spuId}});

              setFieldState(
                'unitId',
                state => {
                  state.value = spu.unitId;
                }
              );
            }
          });


          FormEffectHooks.onFieldValueChange$('spuClass').subscribe(({value}) => {
            if (value) {
              setFieldState(
                'spu',
                state => {
                  state.props.classId = value;
                }
              );
            }

          });

        }}
      >
        <FormItem
          label="物料编码"
          name="standard"
          placeholder="请输入自定义物料编码"
          component={SysField.Codings}
          module={0}
          required
        />
        <FormItem
          label="物料分类"
          name="spuClass"
          placeholder="请选择所属分类"
          component={SysField.SpuClass}
          required />
        <FormItem
          label="产品名称"
          skuId={value.skuId}
          name="spu"
          component={SysField.SpuId}
          required />
        <FormItem
          label="型号"
          name="skuName"
          component={SysField.SkuName}
          required />
        <FormItem
          label="单位"
          name="unitId"
          component={SysField.UnitId}
          required />
        <FormItem
          label="二维码生成方式"
          name="batch"
          component={SysField.Batch}
          required
        />
        <FormItem
          label="规格"
          placeholder="无规格内容可填写“型号”"
          name="specifications"
          component={SysField.Specs}
        />
        <FormItem
          label="物料描述"
          skuId={value.skuId}
          name="sku"
          value={value && value.skuJsons && value.skuJsons.length > 0 ? value.skuJsons.map((items) => {
            return {
              label: items.attribute.attribute,
              value: items.values.attributeValues,
              disabled: true,
            };
          }) : []}
          details={details && details.skuTree}
          component={SysField.Specifications}
        />
        <FormItem
          label='品牌'
          name='brandIds'
          component={BrandIds}
        />
        <FormItem
          label="备注"
          name="remarks"
          component={SysField.Note} />
        <FormItem
          label="附件"
          name="fileId"
          component={SysField.FileId} />
        <FormItem
          label="物料图片"
          name="img"
          component={SysField.Img} />
        <FormItem
          label="关联图纸"
          name="bind"
          component={SysField.Bind} />
      </Form>
    </div>
  );
};

export default React.forwardRef(SkuEdit);
