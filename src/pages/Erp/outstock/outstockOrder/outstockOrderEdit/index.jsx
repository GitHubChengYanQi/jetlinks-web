/**
 * 出库单编辑页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef, useState} from 'react';
import {Avatar, Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {outstockOrderDetail, outstockOrderAdd, outstockOrderEdit} from '../outstockOrderUrl';
import * as SysField from '../outstockOrderField';
import {FormEffectHooks, FormPath, InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';
import SpuList from '@/pages/Erp/instock/components/SpuList';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {request, useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import ProCard from '@ant-design/pro-card';
import {codingRulesList} from '@/pages/Erp/tool/toolUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
import {config} from 'ice';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outstockOrderEdit
};

const {onFieldValueChange$} = FormEffectHooks;

const {code} = config;

const OutstockOrderEdit = ({...props}) => {


  const formRef = useRef();

  const {loading, data} = useRequest(codingRulesList, {
    defaultParams: {
      data: {
        module: 2,
        state: 1
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  return (
    <div style={{padding: 24}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="outstockOrderId"
        onSuccess={() => {
          props.onSuccess();
        }}
        onError={() => {

        }}
        onSubmit={(value)=>{
          return {...value,url:`${code}?id=codeId`};
        }}
        effects={({setFieldState,getFieldState}) => {

          onFieldValueChange$('storehouseId').subscribe(async ({value}) => {
            if (value) {

              const skuIds = await request({
                url:'/stockDetails/backSkuByStoreHouse',
                method:'GET',
                params:{
                  id:value
                }
              });


              setFieldState(
                'applyDetails.*.skuId',
                state => {
                  state.props.skuIds = skuIds;
                }
              );

              setFieldState(
                'applyDetails.*.number',
                state => {
                  state.props.storehouseId = value;
                }
              );
            }
          });

          onFieldValueChange$('applyDetails.*.skuId').subscribe(async ({name,value}) => {
            if (value && name) {
              setFieldState(
                FormPath.transform(name, /\d/, $1 => {
                  return `applyDetails.${$1}.number`;
                }),
                state => {
                  state.props.skuId = value;
                }
              );
            }
          })
          ;
          onFieldValueChange$('applyDetails.*.brandId').subscribe(async ({name,value}) => {
            if (value && name) {
              setFieldState(
                FormPath.transform(name, /\d/, $1 => {
                  return `applyDetails.${$1}.number`;
                }),
                state => {
                  state.props.brandId = value;
                }
              );
            }
          });
        }
        }
      >

        <ProCard title="出库信息" className="h2Card" headerBordered>
          <div style={{display: 'inline-block', width: '50%'}}>
            <FormItem label="编码" name="coding" codingId={data} component={SysField.Codings} required />
          </div>
          <div style={{display: 'inline-block', width: '50%'}}>
            <FormItem label="仓库" name="storehouseId" component={SysField.Storhouse} required />
          </div>
          <div style={{display: 'inline-block', width: '50%'}}>
            <FormItem label="负责人" name="userId" component={SysField.UserId} required />
          </div>
          <div style={{display: 'inline-block', width: '50%'}}>
            <FormItem
              label="备注"
              name="note"
              component={SysField.Note}
            />
          </div>
        </ProCard>

        <ProCard title="出库信息" className="h2Card" headerBordered>
          <FieldList
            name="applyDetails"
            initialValue={[
              {itemId: ''},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => mutators.remove(index);
                    return (
                      <div key={index}>
                        <Avatar size={24}>{`${index + 1}`}</Avatar>
                        <div style={{width: '30%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="物料"
                            name={`applyDetails.${index}.skuId`}
                            component={SysField.SkuId}
                            required
                          />
                        </div>
                        <div style={{display: 'inline-block', width: '30%'}}>
                          <FormItem
                            labelCol={10}
                            label="供应商 / 品牌"
                            name={`applyDetails.${index}.brandId`}
                            component={SysField.BrandId}
                            required
                          />
                        </div>
                        <div style={{display: 'inline-block', width: '30%'}}>
                          <FormItem
                            label="数量"
                            name={`applyDetails.${index}.number`}
                            component={SysField.Number}
                            rules={[{required:true,message:'必填项！'}]}
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
                    style={{marginTop: 8}}
                    icon={<PlusOutlined />}
                    onClick={onAdd}>增加产品</Button>
                </div>
              );
            }}
          </FieldList>
        </ProCard>

      </Form>
    </div>

  );
};

export default OutstockOrderEdit;
