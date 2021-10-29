/**
 * 出库单编辑页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {outstockOrderDetail, outstockOrderAdd, outstockOrderEdit} from '../outstockOrderUrl';
import * as SysField from '../outstockOrderField';
import {FormEffectHooks, FormPath, InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';
import SpuList from '@/pages/Erp/instock/components/SpuList';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {request} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outstockOrderEdit
};

const {onFieldValueChange$} = FormEffectHooks;

const OutstockOrderEdit = ({...props}) => {


  const formRef = useRef();


  return (
    <div style={{padding: 24}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="outstockOrderId"
        effects={({setFieldState}) => {
          onFieldValueChange$('applyDetails.*.spuId').subscribe(async (value) => {
            if (value.value) {
              const data = await request({
                ...spuDetail,
                data: {
                  spuId: value.value
                }
              });

              setFieldState(
                FormPath.transform(value.name, /\d/, $1 => {
                  return `applyDetails.${$1}.skuId`;
                }),
                state => {
                  if (value.active) {
                    state.props.select = value;
                  }
                  state.props.sku = data.sku;
                }
              );
            }

          });
        }}
      >

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
                      <SpuList
                        style={{width: '25%', display: 'inline-block'}}
                        spuName={`applyDetails.${index}.spuId`}
                        skusName={`applyDetails.${index}.skuId`}
                        spuLabel="产品"
                        skuLabel="规格" />
                      <div style={{display:'inline-block',width:'25%'}}>
                        <FormItem
                          label="品牌"
                          name={`applyDetails.${index}.brandId`}
                          component={SysField.BrandId}
                          required
                        />
                      </div>
                      <div style={{display:'inline-block',width:'17%'}}>
                        <FormItem
                          label="数量"
                          name={`applyDetails.${index}.number`}
                          component={SysField.Number}
                          required
                        />
                      </div>
                      <Button
                        type="link"
                        style={{display: state.value.length === 1 ? 'none' : 'inline-block', float: 'right'}}
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

      </Form>
    </div>

  );
};

export default OutstockOrderEdit;
