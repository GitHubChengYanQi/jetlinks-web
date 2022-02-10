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
import {partsDetail, partsAdd} from '../PartsUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsAdd
};

const PartsEdit = ({...props}, ref) => {

  const {spuId, type: bomType,value,onSuccess} = props;

  const formRef = useRef(null);

  const [skuId, setSkuId] = useState();

  const [action, setAction] = useState((bomType === 2 && !value) ? 'researchBom' : 'productionBom');
  console.log(action);

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  const [type, setType] = useState(1);

  return (
    <>
      <div style={{padding: 16}}>
        <Form
          value={value}
          ref={formRef}
          NoButton={false}
          api={ApiConfig}
          fieldKey="partsId"
          onError={() => {
          }}
          onSuccess={() => {
            onSuccess();
          }}
          onSubmit={(value) => {
            return {skuId, ...value, type: bomType};
          }}
          effects={() => {
            const {setFieldState} = createFormActions();

            FormEffectHooks.onFieldValueChange$('item').subscribe(({value}) => {
              setFieldState(
                'skuRequests',
                state => {
                  if (value && value.spuId) {
                    state.props.spuId = value && value.spuId;
                  }
                }
              );
            });
          }
          }
        >
          <ProCard
            className="h2Card"
            headerBordered
            title="基本信息"
          >
            <FormItem label="名称" name="partName" component={SysField.PartName} required />
            {bomType === 2 && !value && <FormItem label="操作类型" name="action" component={SysField.Action} value={action} onChange={setAction} />}
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
                        disabled={spuId}
                        options={[{label: '型号', value: 0}, {label: '物料', value: 1}]}
                        onChange={(value) => {
                          setType(value);
                        }}
                      />
                    }
                    name="item"
                    type={type}
                    spuId={spuId}
                    component={type ? SysField.Sku : SysField.Spu}
                    required
                  />

                  {!type && <>
                    <FormItem label="配置" name="skuRequests" component={SysField.Attributes} required />
                    <FormItem label="编码" name="standard" component={SysField.Standard} required />
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
                              labelCol={7}
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
  )
    ;
};

export default React.forwardRef(PartsEdit);
