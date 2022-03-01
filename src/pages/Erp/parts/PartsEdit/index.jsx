/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import {Button, Select} from 'antd';
import {createFormActions, FieldList, FormEffectHooks} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import * as SysField from '../PartsField';
import Form from '@/components/Form';
import {partsDetail, partsAdd, partsEdit} from '../PartsUrl';
import {Codings} from '@/pages/Erp/sku/skuField';
import {request} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import {categoryDetail} from '@/pages/Erp/category/categoryUrl';

const {FormItem} = Form;

const formActionsPublic = createFormActions();


const PartsEdit = ({...props}, ref) => {

  const {spuId, type: bomType, value, bom, onSuccess, sku, ...other} = props;

  const [bomAction, setBomAction] = useState(bom || {});

  const ApiConfig = {
    view: partsDetail,
    add: partsAdd,
    save: partsEdit
  };

  const formRef = useRef(null);

  const [skuId, setSkuId] = useState();

  const [action, setAction] = useState((bomType === 2 && !value) ? 'researchBom' : 'productionBom');

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  const [type, setType] = useState((!value && spuId) ? 0 : 1);

  return (
    <>
      <div style={{padding: 16}}>
        <Form
          {...other}
          value={value}
          ref={formRef}
          NoButton={false}
          api={ApiConfig}
          formActions={formActionsPublic}
          fieldKey="partsId"
          onError={() => {
          }}
          onSuccess={() => {
            onSuccess();
          }}
          effects={({setFieldState}) => {

            FormEffectHooks.onFieldValueChange$('parts').subscribe(({value}) => {
              const skuIds = [];
              value && value.map((item) => {
                if (item) {
                  skuIds.push(item.skuId);
                }
                return null;
              });

              setFieldState('parts.*.skuId', state => {
                state.props.skuIds = skuIds;
              });
            });

            FormEffectHooks.onFieldValueChange$('item').subscribe(async ({value}) => {
              if (value && value.skuId) {
                const res = await request({...skuDetail, data: {skuId: value.skuId}});
                const array = res && res.list && res.list.map((item) => {
                  return {
                    label: item.itemAttributeResult.attribute,
                    value: item.attributeValues
                  };
                });
                if (Array.isArray(array) && array.length > 0) {
                  setFieldState('showSku', state => {
                    state.value = array;
                    state.visible = value;
                  });
                }
              } else if (value && value.spuId) {
                const res = await request({...spuDetail, data: {spuId: value.spuId}});
                if (res && res.categoryId) {
                  const category = await request({...categoryDetail, data: {categoryId: res.categoryId}});
                  setFieldState('sku', state => {
                    state.props.category = category && category.categoryRequests;
                  });
                }
              }
            });
          }
          }
          initialValues={!bomAction.copy && {parts: [{}]}}
          onSubmit={(value) => {
            return {skuId, ...value, type: bomAction.type || bomType, batch: 0, status: 0};
          }}
        >
          <ProCard
            className="h2Card"
            headerBordered
            title="基本信息"
            extra={bomAction.type === 2 && <Button onClick={() => {
              setBomAction({...bomAction, copy: true});
              formRef.current.refresh();
            }}>拷贝</Button>}
          >
            {bomType === 2 && !value &&
            <FormItem label="操作类型" name="action" component={SysField.Action} value={action} onChange={setAction} />}
            {
              action === 'researchBom' ?
                <FormItem label="设计BOM" name="pid" component={SysField.Pid} required getSkuId={setSkuId} />
                :
                <>
                  <FormItem
                    label={
                      <Select
                        defaultValue={type}
                        bordered={false}
                        disabled={sku || value || spuId}
                        options={[{label: '产品', value: 0}, {label: '物料', value: 1}]}
                        onChange={(value) => {
                          setType(value);
                        }}
                      />
                    }
                    name="item"
                    type={type}
                    spuId={spuId}
                    disabled={sku || value || spuId}
                    component={type ? SysField.Sku : SysField.Spu}
                    required
                  />

                  <FormItem
                    visible={false}
                    label="物料描述"
                    name="showSku"
                    component={SysField.ShowSku}
                  />

                  {!type && <>
                    <FormItem label="编码" name="standard" module={0} component={Codings} required />
                    <FormItem
                      label="型号"
                      name="skuName"
                      component={SysField.SkuName}
                      required
                    />
                    <FormItem
                      label="配置"
                      name="sku"
                      title="配置项"
                      component={SysField.Attributes}
                      required
                    />
                    <FormItem
                      label="规格"
                      placeholder="无规格内容可填写“型号”"
                      name="specifications"
                      component={SysField.SkuName}
                    />
                    <FormItem label="备注" name="note" component={SysField.Note} />
                  </>}
                </>
            }
          </ProCard>

          <ProCard className="h2Card" headerBordered title="清单列表">
            <FieldList
              name="parts"
              initialValue={[{}]}
            >
              {({state, mutators}) => {
                const onAdd = () => {
                  mutators.push();
                };
                return (
                  <div>
                    {state.value.map((item, index) => {
                      const onRemove = index => mutators.remove(index);
                      return (
                        <div key={index}>
                          <div style={{display: 'inline-block', width: '45%'}}>
                            <FormItem
                              labelCol={7}
                              label="物料"
                              name={`parts.${index}.skuId`}
                              component={SysField.SkuId}
                              required
                            />
                          </div>
                          <div style={{display: 'inline-block', width: '20%'}}>
                            <FormItem
                              labelCol={9}
                              initialValue={1}
                              label="数量"
                              name={`parts.${index}.number`}
                              component={SysField.Number}
                              required
                            />
                          </div>
                          <div style={{display: 'inline-block', width: '30%'}}>
                            <FormItem
                              labelCol={7}
                              label="备注"
                              name={`parts.${index}.note`}
                              component={SysField.Name}
                            />
                          </div>
                          <Button
                            type="link"
                            disabled={state.value.length === 1}
                            style={{float: 'right'}}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              onRemove(index);
                            }}
                            danger
                          />
                        </div>
                      );
                    })}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={onAdd}>增加物料</Button>
                  </div>
                );
              }}
            </FieldList>
          </ProCard>
        </Form>
      </div>
    </>
  );
};

export default React.forwardRef(PartsEdit);
