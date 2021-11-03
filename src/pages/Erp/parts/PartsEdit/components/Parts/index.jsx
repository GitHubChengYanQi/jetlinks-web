/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {partsDetail, partsAdd, partsEdit} from '../../../PartsUrl';
import * as SysField from '../../../PartsField';
import {Button, Select} from 'antd';
import {createFormActions, FieldList, FormEffectHooks} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';

const {FormItem} = Form;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};


const Parts = ({...props}) => {

  const {spuId,...other} = props;

  const formRef = useRef(null);

  const [type, setType] = useState(other.value ? 1 : 0);

  return (
    <>
      <div style={{margin: '50px 150px'}}>
        <Form
          {...other}
          ref={formRef}
          api={ApiConfig}
          fieldKey="partsId"
          onSubmit={(value) => {
            return value;
          }}
          effect={() => {
            const {setFieldState} = createFormActions();

            FormEffectHooks.onFieldValueChange$('item').subscribe(({value}) => {
              setFieldState(
                'pSkuId',
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
          <ProCard className="h2Card" headerBordered title="基本信息">
            <FormItem label="清单" name="partName" component={SysField.PartName} required />
            <FormItem
              label={
                <Select
                  defaultValue={type}
                  bordered={false}
                  disabled={spuId}
                  options={[{label: '产品', value: 0}, {label: '物料', value: 1}]}
                  onChange={(value) => {
                    setType(value);
                  }}
                />
              }
              name="item"
              type={type}
              spuId={spuId}
              component={type ? SysField.Sku : SysField.Spu}
              required />

            {!type && <FormItem name="pSkuId" component={SysField.Attributes} required />}
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
                              label="产品"
                              name={`parts.${index}.skuId`}
                              component={SysField.SkuId}
                              required
                            />
                          </div>
                          <div style={{display: 'inline-block', width: '20%'}}>
                            <FormItem
                              labelCol={7}
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

export default Parts;
