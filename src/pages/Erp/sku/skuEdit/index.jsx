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
import {createAsyncFormActions, createFormActions, FormEffectHooks} from '@formily/antd';
import {notification} from 'antd';
import {request, useRequest} from '@/util/Request';
import {rulesRelationList} from '@/pages/BaseSystem/codingRules/components/rulesRelation/rulesRelationUrl';
import {codingRulesList} from '@/pages/Erp/tool/toolUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import {Batch} from '../skuField';

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

  const [details,setDetails] = useState();

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

  const {loading, data} = useRequest(codingRulesList, {
    defaultParams: {
      data: {
        module: 0,
        state: 1
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  return (
    <div style={{padding: 16}}>
      <Form
        value={value.skuId || false}
        ref={formRef}
        defaultValue={{
          'spuClassificationId': value.spuResult && value.spuResult.spuClassificationId,
          'unitId': value.spuResult && value.spuResult.unitId,
          'spu': value.spuResult,
          'skuName': value.skuName,
          'standard': value.standard,
          'specifications': value.specifications,
          'remarks': value.remarks
        }}
        api={ApiConfig}
        NoButton={false}
        fieldKey="skuId"
        details={(res)=>{
          setDetails(res);
        }}
        onError={() => {
          openNotificationWithIcon('error');
        }}
        onSuccess={(res) => {
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

              setFieldState(
                'spuClassificationId',
                state => {
                  state.value = spu.spuClassificationId;
                }
              );

            }

          });

        }}
      >
        <FormItem
          label="编码"
          name="standard"
          component={SysField.Codings}
          codingId={data}
          module={0}
          rules={[{required: true, message: data && data.length > 0 ? '请输入编码' : '请先设置编码！'}]}
        />
        <FormItem
          label="物料名称"
          skuId={value.skuId}
          name="spu"
          component={SysField.SpuId}
          model={(value) => {
            setSpu(value);
          }} required />
        <FormItem
          label="分类"
          name="spuClassificationId"
          component={SysField.SpuClass}
          required />
        <FormItem
          label="型号(零件号)"
          name="skuName"
          skuname={spu && sku && `${sku} / ${spu}`}
          component={SysField.SkuName}
          model={(value) => {
            setSku(value);
          }} required />
        <FormItem
          label="单位"
          name="unitId"
          component={SysField.UnitId}
          required />
        <FormItem
          label="批量"
          name="batch"
          component={SysField.Batch}
          required
        />
        <FormItem
          label="规格配置"
          skuId={value.skuId}
          name="sku"
          value={value && value.skuJsons.map((items) => {
            return {
              label: items.attribute.attribute,
              value: items.values.attributeValues,
              disabled:true,
            };
          })}
          details={details && details.sku}
          component={SysField.Specifications}
        />
        <FormItem
          label="备注"
          name="remarks"
          component={SysField.Note} />
        <FormItem
          label="附件"
          name="fileId"
          component={SysField.FileId} />
      </Form>
    </div>
  );
};

export default React.forwardRef(SkuEdit);
